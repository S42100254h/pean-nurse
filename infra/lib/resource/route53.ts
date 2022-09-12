import * as cdk from "@aws-cdk/core";
import { PublicHostedZone, CfnRecordSet } from "@aws-cdk/aws-route53";
import { CfnLoadBalancer } from "@aws-cdk/aws-elasticloadbalancingv2";
import { Resource } from "./abstract/resource";

interface ResourceInfo {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly assign: (record: CfnRecordSet) => void;
}

export class Route53 extends Resource {
  public hostedZone: PublicHostedZone;
  public mainDomainRecord: CfnRecordSet;
  public subDomainRecord: CfnRecordSet;

  private readonly alb: CfnLoadBalancer;
  private readonly resourceInfo: ResourceInfo[] = [
    {
      id: "PeanMainDomainRecord",
      name: "pean-nurse.com",
      type: "A",
      assign: (record) => (this.mainDomainRecord = record),
    },
    {
      id: "PeanSubDomainRecord",
      name: "www.pean-nurse.com",
      type: "A",
      assign: (record) => (this.subDomainRecord = record),
    },
  ];

  constructor(alb: CfnLoadBalancer) {
    super();
    this.alb = alb;
  }

  createResources(scope: cdk.Construct) {
    const hostedZone = this.createHostedZone(scope);
    for (const resourceInfo of this.resourceInfo) {
      const record = this.createARecord(scope, hostedZone, resourceInfo);
      resourceInfo.assign(record);
    }
  }

  private createHostedZone(scope: cdk.Construct): PublicHostedZone {
    const hostedZone = new PublicHostedZone(scope, "PeanHostedZone", {
      zoneName: "pean-nurse.com",
      comment: "for PeAN",
    });

    return hostedZone;
  }

  private createARecord(scope: cdk.Construct, hostedZone: PublicHostedZone, resourceInfo: ResourceInfo): CfnRecordSet {
    const record = new CfnRecordSet(scope, resourceInfo.id, {
      name: resourceInfo.name,
      type: resourceInfo.type,
      aliasTarget: {
        dnsName: this.alb.attrDnsName,
        hostedZoneId: this.alb.attrCanonicalHostedZoneId,
      },
      hostedZoneId: hostedZone.hostedZoneId,
    });

    return record;
  }
}
