import * as cdk from "@aws-cdk/core";
import { CfnNetworkAcl, CfnNetworkAclEntry, CfnSubnetNetworkAclAssociation, CfnVPC, CfnSubnet } from "@aws-cdk/aws-ec2";
import { Resource } from "./abstract/resource";

interface AssociationInfo {
  readonly id: string;
  readonly subnetId: () => string;
}

interface ResourceInfo {
  readonly id: string;
  readonly resourceName: string;
  readonly entryIdInbound: string;
  readonly entryIdOutbound: string;
  readonly associations: AssociationInfo[];
  readonly assign: (networkAcl: CfnNetworkAcl) => void;
}

export class NetworkAcl extends Resource {
  public public: CfnNetworkAcl;
  public private: CfnNetworkAcl;

  private readonly vpc: CfnVPC;
  private readonly subnetPublic1a: CfnSubnet;
  private readonly subnetPublic1c: CfnSubnet;
  private readonly subnetPrivate1c: CfnSubnet;
  private readonly subnetPrivate1a: CfnSubnet;
  private readonly resources: ResourceInfo[] = [
    {
      id: "NetworkAclPublic",
      resourceName: "nacl-public",
      entryIdInbound: "NetworkAclEntryInboundPublic",
      entryIdOutbound: "NetworkAclEntryOutboundPublic",
      associations: [
        {
          id: "NetworkAclAssociationPublic1a",
          subnetId: () => this.subnetPublic1a.ref,
        },
        {
          id: "NetworkAclAssociationPublic1c",
          subnetId: () => this.subnetPublic1c.ref,
        },
      ],
      assign: (networkAcl) => (this.public = networkAcl),
    },
    {
      id: "NetworkAclPrivate",
      resourceName: "nacl-private",
      entryIdInbound: "NetworkAclEntryInboundPrivate",
      entryIdOutbound: "NetworkAclEntryOutboundPrivate",
      associations: [
        {
          id: "NetworkAclAssociationPrivate1a",
          subnetId: () => this.subnetPrivate1a.ref,
        },
        {
          id: "NetworkAclAssociationPrivate1c",
          subnetId: () => this.subnetPrivate1c.ref,
        },
      ],
      assign: (networkAcl) => (this.private = networkAcl),
    },
  ];

  constructor(
    vpc: CfnVPC,
    subnetPublic1a: CfnSubnet,
    subnetPublic1c: CfnSubnet,
    subnetPrivate1a: CfnSubnet,
    subnetPrivate1c: CfnSubnet,
  ) {
    super();
    this.vpc = vpc;
    this.subnetPublic1a = subnetPublic1a;
    this.subnetPublic1c = subnetPublic1c;
    this.subnetPrivate1a = subnetPrivate1a;
    this.subnetPrivate1c = subnetPrivate1c;
  }

  createResources(scope: cdk.Construct) {
    for (const resourceInfo of this.resources) {
      const networkAcl = this.createNetworkAcl(scope, resourceInfo);
      resourceInfo.assign(networkAcl);
    }
  }

  private createNetworkAcl(scope: cdk.Construct, resourceInfo: ResourceInfo): CfnNetworkAcl {
    const networkAcl = new CfnNetworkAcl(scope, resourceInfo.id, {
      vpcId: this.vpc.ref,
      tags: [
        {
          key: "Name",
          value: this.createResourceName(scope, resourceInfo.resourceName),
        },
      ],
    });

    this.createEntry(scope, resourceInfo.entryIdInbound, networkAcl, false);
    this.createEntry(scope, resourceInfo.entryIdOutbound, networkAcl, true);

    for (const associationInfo of resourceInfo.associations) {
      this.createAssociation(scope, associationInfo, networkAcl);
    }

    return networkAcl;
  }

  private createEntry(scope: cdk.Construct, id: string, networkAcl: CfnNetworkAcl, egress: boolean) {
    new CfnNetworkAclEntry(scope, id, {
      networkAclId: networkAcl.ref,
      protocol: -1,
      ruleAction: "allow",
      ruleNumber: 100,
      cidrBlock: "0.0.0.0/0",
      egress: egress,
    });
  }

  private createAssociation(scope: cdk.Construct, associationInfo: AssociationInfo, networkAcl: CfnNetworkAcl) {
    new CfnSubnetNetworkAclAssociation(scope, associationInfo.id, {
      networkAclId: networkAcl.ref,
      subnetId: associationInfo.subnetId(),
    });
  }
}
