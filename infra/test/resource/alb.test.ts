import { Template, Match } from "@aws-cdk/assertions";
import { App } from "@aws-cdk/core";
import { InfraStack } from "../../lib/infra-stack";

test("Alb test", () => {
  const app = new App();
  const stack = new InfraStack(app, "InfraStack", {});
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::ElasticLoadBalancingV2::LoadBalancer", 1);
  template.hasResourceProperties("AWS::ElasticLoadBalancingV2::LoadBalancer", {
    IpAddressType: "ipv4",
    Name: "undefined-undefined-alb",
    Scheme: "internet-facing",
    SecurityGroups: Match.anyValue(),
    Subnets: Match.anyValue(),
    Type: "application",
  });

  template.resourceCountIs("AWS::ElasticLoadBalancingV2::TargetGroup", 1);
  template.hasResourceProperties("AWS::ElasticLoadBalancingV2::TargetGroup", {
    Name: "undefined-undefined-tg",
    Port: 80,
    Protocol: "HTTP",
    TargetType: "ip",
    VpcId: Match.anyValue(),
  });

  template.resourceCountIs("AWS::ElasticLoadBalancingV2::Listener", 1);
  template.hasResourceProperties("AWS::ElasticLoadBalancingV2::Listener", {
    DefaultActions: [
      {
        Type: "forward",
        ForwardConfig: {
          TargetGroups: [
            {
              TargetGroupArn: Match.anyValue(),
              Weight: 1,
            },
          ],
        },
      },
    ],
    LoadBalancerArn: Match.anyValue(),
    Certificates: Match.anyValue(),
    Port: 443,
    Protocol: "HTTPS",
  });
});
