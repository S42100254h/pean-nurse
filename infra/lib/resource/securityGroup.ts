import * as cdk from "@aws-cdk/core";
import { CfnSecurityGroup, CfnSecurityGroupIngress, CfnSecurityGroupIngressProps, CfnVPC } from "@aws-cdk/aws-ec2";
import { Resource } from "./abstract/resource";

interface IngressInfo {
  readonly id: string;
  readonly securityGroupIngressProps: CfnSecurityGroupIngressProps;
  readonly groupId: () => string;
  readonly sourceSecurityGroupId?: () => string;
}

interface ResourceInfo {
  readonly id: string;
  readonly groupDescription: string;
  readonly ingresses: IngressInfo[];
  readonly resourceName: string;
  readonly assign: (securityGroup: CfnSecurityGroup) => void;
}

export class SecurityGroup extends Resource {
  public alb: CfnSecurityGroup;
  public ecs: CfnSecurityGroup;
  public rds: CfnSecurityGroup;

  private readonly vpc: CfnVPC;
  private readonly resources: ResourceInfo[] = [
    {
      id: "SecurityGroupAlb",
      groupDescription: "for ALB",
      ingresses: [
        {
          id: "SecurityGroupIngressAlb",
          securityGroupIngressProps: {
            ipProtocol: "tcp",
            cidrIp: "0.0.0.0/0",
            fromPort: 443,
            toPort: 443,
          },
          groupId: () => this.alb.attrGroupId,
        },
      ],
      resourceName: "sg-alb",
      assign: (securityGroup) => (this.alb = securityGroup),
    },
    {
      id: "SecurityGroupESC",
      groupDescription: "for ECS",
      ingresses: [
        {
          id: "SecurityGroupIngressECS",
          securityGroupIngressProps: {
            ipProtocol: "tcp",
            fromPort: 80,
            toPort: 80,
          },
          groupId: () => this.ecs.attrGroupId,
          sourceSecurityGroupId: () => this.alb.attrGroupId,
        },
      ],
      resourceName: "sg-ecs",
      assign: (securityGroup) => (this.ecs = securityGroup),
    },
    {
      id: "SecurityGroupRds",
      groupDescription: "for RDS",
      ingresses: [
        {
          id: "SecurityGroupIngressRds",
          securityGroupIngressProps: {
            ipProtocol: "tcp",
            fromPort: 3306,
            toPort: 3306,
          },
          groupId: () => this.rds.attrGroupId,
          sourceSecurityGroupId: () => this.ecs.attrGroupId,
        },
      ],
      resourceName: "sg-rds",
      assign: (securityGroup) => (this.rds = securityGroup),
    },
  ];

  constructor(vpc: CfnVPC) {
    super();
    this.vpc = vpc;
  }

  createResources(scope: cdk.Construct) {
    for (const resourceInfo of this.resources) {
      const securityGroup = this.createSecurityGroup(scope, resourceInfo);
      resourceInfo.assign(securityGroup);

      this.createSecurityGroupIngress(scope, resourceInfo);
    }
  }

  private createSecurityGroup(scope: cdk.Construct, resourceInfo: ResourceInfo): CfnSecurityGroup {
    const resourceName = this.createResourceName(scope, resourceInfo.resourceName);
    const securityGroup = new CfnSecurityGroup(scope, resourceInfo.id, {
      groupDescription: resourceInfo.groupDescription,
      groupName: resourceName,
      vpcId: this.vpc.ref,
      tags: [
        {
          key: "Name",
          value: resourceName,
        },
      ],
    });

    return securityGroup;
  }

  private createSecurityGroupIngress(scope: cdk.Construct, resourceInfo: ResourceInfo) {
    for (const ingress of resourceInfo.ingresses) {
      const securityGroupIngress = new CfnSecurityGroupIngress(scope, ingress.id, ingress.securityGroupIngressProps);
      securityGroupIngress.groupId = ingress.groupId();

      if (ingress.sourceSecurityGroupId) {
        securityGroupIngress.sourceSecurityGroupId = ingress.sourceSecurityGroupId();
      }
    }
  }
}
