import { Template } from "@aws-cdk/assertions";
import { App } from "@aws-cdk/core";
import { InfraStack } from "../../lib/infra-stack";

test("Igw test", () => {
  const app = new App();
  const stack = new InfraStack(app, "InfraStack", {});
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::EC2::InternetGateway", 1);
  template.hasResourceProperties("AWS::EC2::InternetGateway", {
    Tags: [{ Key: "Name", Value: "undefined-undefined-igw" }],
  });
  template.resourceCountIs("AWS::EC2::VPCGatewayAttachment", 1);
});
