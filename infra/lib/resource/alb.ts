import * as cdk from "@aws-cdk/core";
import { CfnLoadBalancer, CfnTargetGroup, CfnListener } from "@aws-cdk/aws-elasticloadbalancingv2";
import { CfnVPC, CfnSubnet, CfnSecurityGroup } from "@aws-cdk/aws-ec2";
import { Resource } from "./abstract/resource";

export class Alb extends Resource {
  public loadBalancer: CfnLoadBalancer;
  public targetGroup: CfnTargetGroup;

  private readonly vpc: CfnVPC;
  private readonly subnetPublic1a: CfnSubnet;
  private readonly subnetPublic1c: CfnSubnet;
  private readonly securityGroupAlb: CfnSecurityGroup;

  constructor(vpc: CfnVPC, subnetPublic1a: CfnSubnet, subnetPublic1c: CfnSubnet, securityGroupAlb: CfnSecurityGroup) {
    super();
    this.vpc = vpc;
    this.subnetPublic1a = subnetPublic1a;
    this.subnetPublic1c = subnetPublic1c;
    this.securityGroupAlb = securityGroupAlb;
  }

  createResources(scope: cdk.Construct) {
    this.loadBalancer = this.createLoadBalancer(scope);
    this.targetGroup = this.createTargetGroup(scope);
    this.createListener(scope, this.loadBalancer, this.targetGroup);
  }

  private createLoadBalancer(scope: cdk.Construct): CfnLoadBalancer {
    const loadBalancer = new CfnLoadBalancer(scope, "Alb", {
      ipAddressType: "ipv4",
      name: this.createResourceName(scope, "alb"),
      scheme: "internet-facing",
      securityGroups: [this.securityGroupAlb.attrGroupId],
      subnets: [this.subnetPublic1a.ref, this.subnetPublic1c.ref],
      type: "application",
    });

    return loadBalancer;
  }

  private createTargetGroup(scope: cdk.Construct): CfnTargetGroup {
    const targetGroup = new CfnTargetGroup(scope, "AlbTargetGroup", {
      name: this.createResourceName(scope, "tg"),
      port: 80,
      protocol: "HTTP",
      targetType: "ip",
      vpcId: this.vpc.ref,
    });

    return targetGroup;
  }

  private createListener(scope: cdk.Construct, loadBalancer: CfnLoadBalancer, targetGroup: CfnTargetGroup) {
    new CfnListener(scope, "AlbListener", {
      defaultActions: [
        {
          type: "forward",
          forwardConfig: {
            targetGroups: [
              {
                targetGroupArn: targetGroup.ref,
                weight: 1,
              },
            ],
          },
        },
      ],
      loadBalancerArn: loadBalancer.ref,
      certificates: [
        {
          certificateArn: process.env.CERTIFICATE_ARN,
        },
      ],
      port: 443,
      protocol: "HTTPS",
    });
  }
}
