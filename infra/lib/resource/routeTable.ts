import * as cdk from "@aws-cdk/core";
import {
  CfnRouteTable,
  CfnRoute,
  CfnSubnetRouteTableAssociation,
  CfnVPC,
  CfnSubnet,
  CfnInternetGateway,
} from "@aws-cdk/aws-ec2";
import { Resource } from "./abstract/resource";

interface RouteInfo {
  readonly id: string;
  readonly destinationCidrBlock: string;
  readonly gatewayId: () => string;
}

interface AssociationInfo {
  readonly id: string;
  readonly subnetId: () => string;
}

interface ResourceInfo {
  readonly id: string;
  readonly resourceName: string;
  readonly routes: RouteInfo[];
  readonly associations: AssociationInfo[];
  readonly assign: (routeTable: CfnRouteTable) => void;
}

export class RouteTable extends Resource {
  public public: CfnRouteTable;

  private readonly vpc: CfnVPC;
  private readonly public1a: CfnSubnet;
  private readonly public1c: CfnSubnet;
  private readonly internetGateway: CfnInternetGateway;
  private readonly resources: ResourceInfo[] = [
    {
      id: "RouteTablePublic",
      resourceName: "rtb-public",
      routes: [
        {
          id: "RoutePublic",
          destinationCidrBlock: "0.0.0.0/0",
          gatewayId: () => this.internetGateway.ref,
        },
      ],
      associations: [
        {
          id: "AssociationPublic1a",
          subnetId: () => this.public1a.ref,
        },
        {
          id: "AssociationPublic1c",
          subnetId: () => this.public1c.ref,
        },
      ],
      assign: (routeTable) => (this.public = routeTable),
    },
  ];

  constructor(vpc: CfnVPC, public1a: CfnSubnet, public1c: CfnSubnet, internetGateway: CfnInternetGateway) {
    super();
    this.vpc = vpc;
    this.public1a = public1a;
    this.public1c = public1c;
    this.internetGateway = internetGateway;
  }

  createResources(scope: cdk.Construct) {
    for (const resourceInfo of this.resources) {
      const routeTable = this.createRouteTable(scope, resourceInfo);
      resourceInfo.assign(routeTable);
    }
  }

  private createRouteTable(scope: cdk.Construct, resourceInfo: ResourceInfo): CfnRouteTable {
    const routeTable = new CfnRouteTable(scope, resourceInfo.id, {
      vpcId: this.vpc.ref,
      tags: [
        {
          key: "Name",
          value: this.createResourceName(scope, resourceInfo.resourceName),
        },
      ],
    });

    for (const routeInfo of resourceInfo.routes) {
      this.createRoute(scope, routeInfo, routeTable);
    }

    for (const associationInfo of resourceInfo.associations) {
      this.createAssociation(scope, associationInfo, routeTable);
    }

    return routeTable;
  }

  private createRoute(scope: cdk.Construct, routeInfo: RouteInfo, routeTable: CfnRouteTable) {
    const route = new CfnRoute(scope, routeInfo.id, {
      routeTableId: routeTable.ref,
      destinationCidrBlock: routeInfo.destinationCidrBlock,
      gatewayId: routeInfo.gatewayId(),
    });
  }

  private createAssociation(scope: cdk.Construct, associationInfo: AssociationInfo, routeTable: CfnRouteTable) {
    new CfnSubnetRouteTableAssociation(scope, associationInfo.id, {
      routeTableId: routeTable.ref,
      subnetId: associationInfo.subnetId(),
    });
  }
}
