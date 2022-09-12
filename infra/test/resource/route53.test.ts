import { Template, Match } from "@aws-cdk/assertions";
import { App } from "@aws-cdk/core";
import { InfraStack } from "../../lib/infra-stack";

test("Route53 test", () => {
  const app = new App();
  const stack = new InfraStack(app, "InfraStack", {});
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::Route53::HostedZone", 1);
  template.hasResourceProperties("AWS::Route53::HostedZone", {
    HostedZoneConfig: {
      Comment: "for PeAN",
    },
    Name: "pean-nurse.com.",
  });

  template.resourceCountIs("AWS::Route53::RecordSet", 2);
  template.hasResourceProperties("AWS::Route53::RecordSet", {
    Name: "pean-nurse.com",
    Type: "A",
    AliasTarget: {
      DNSName: Match.anyValue(),
      HostedZoneId: Match.anyValue(),
    },
    HostedZoneId: Match.anyValue(),
  });
  template.hasResourceProperties("AWS::Route53::RecordSet", {
    Name: "www.pean-nurse.com",
    Type: "A",
    AliasTarget: {
      DNSName: Match.anyValue(),
      HostedZoneId: Match.anyValue(),
    },
    HostedZoneId: Match.anyValue(),
  });
});
