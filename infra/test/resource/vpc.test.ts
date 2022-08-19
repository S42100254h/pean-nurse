import { Template } from "@aws-cdk/assertions";
import { App } from "@aws-cdk/core";
import { InfraStack } from "../../lib/infra-stack";

test("Vpc test", () => {
  const app = new App();
  const stack = new InfraStack(app, "CdkPeanStack", {});
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::EC2::VPC", 1);
  template.hasResourceProperties("AWS::EC2::VPC", {
    CidrBlock: "10.0.0.0/16",
    Tags: [{ Key: "Name", Value: "undefined-undefined-vpc" }],
  });
});
