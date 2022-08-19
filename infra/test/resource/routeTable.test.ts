import { Template, Match } from "@aws-cdk/assertions";
import { App } from "@aws-cdk/core";
import { InfraStack } from "../../lib/infra-stack";

test("RouteTable test", () => {
  const app = new App();
  const stack = new InfraStack(app, "InfraStack", {});
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::EC2::RouteTable", 1);
  template.hasResourceProperties("AWS::EC2::RouteTable", {
    VpcId: Match.anyValue(),
    Tags: [{ Key: "Name", Value: "undefined-undefined-rtb-public" }],
  });

  template.resourceCountIs("AWS::EC2::Route", 1);
  template.hasResourceProperties("AWS::EC2::Route", {
    RouteTableId: Match.anyValue(),
    DestinationCidrBlock: "0.0.0.0/0",
  });

  template.resourceCountIs("AWS::EC2::SubnetRouteTableAssociation", 2);
  template.hasResourceProperties("AWS::EC2::SubnetRouteTableAssociation", {
    RouteTableId: Match.anyValue(),
    SubnetId: Match.anyValue(),
  });
});
