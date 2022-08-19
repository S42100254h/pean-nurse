import * as cdk from "@aws-cdk/core";
import { CfnSubnet, CfnVPC } from "@aws-cdk/aws-ec2";
import { Resource } from "./abstract/resource";

interface ResourceInfo {
  readonly id: string;
  readonly cidrBlock: string;
  readonly availabilityZone: string;
  readonly resourceName: string;
  readonly assign: (subnet: CfnSubnet) => void;
}

export class Subnet extends Resource {
  public public1a: CfnSubnet;
  public public1c: CfnSubnet;
  public private1a: CfnSubnet;
  public private1c: CfnSubnet;

  private readonly vpc: CfnVPC;
  private readonly resourceInfo: ResourceInfo[] = [
    {
      id: "SubnetPublic1a",
      cidrBlock: "10.0.0.0/24",
      availabilityZone: "ap-northeast-1a",
      resourceName: "subnet-public-1a",
      assign: (subnet) => (this.public1a = subnet),
    },
    {
      id: "SubnetPublic1c",
      cidrBlock: "10.0.1.0/24",
      availabilityZone: "ap-northeast-1c",
      resourceName: "subnet-public-1c",
      assign: (subnet) => (this.public1c = subnet),
    },
    {
      id: "SubnetPrivate1a",
      cidrBlock: "10.0.10.0/24",
      availabilityZone: "ap-northeast-1a",
      resourceName: "subnet-private-1a",
      assign: (subnet) => (this.private1a = subnet),
    },
    {
      id: "SubnetPrivate1c",
      cidrBlock: "10.0.11.0/24",
      availabilityZone: "ap-northeast-1c",
      resourceName: "subnet-private-1c",
      assign: (subnet) => (this.private1c = subnet),
    },
  ];

  constructor(vpc: CfnVPC) {
    super();
    this.vpc = vpc;
  }

  createResources(scope: cdk.Construct) {
    for (const resourceInfo of this.resourceInfo) {
      const subnet = this.createSubnet(scope, resourceInfo);
      resourceInfo.assign(subnet);
    }
  }

  private createSubnet(scope: cdk.Construct, resourceInfo: ResourceInfo): CfnSubnet {
    const subnet = new CfnSubnet(scope, resourceInfo.id, {
      cidrBlock: resourceInfo.cidrBlock,
      vpcId: this.vpc.ref,
      availabilityZone: resourceInfo.availabilityZone,
      tags: [
        {
          key: "Name",
          value: this.createResourceName(scope, resourceInfo.resourceName),
        },
      ],
    });

    return subnet;
  }
}
