import { Template } from "@aws-cdk/assertions";
import { App } from "@aws-cdk/core";
import { InfraStack } from "../../lib/infra-stack";

test("Subnet test", () => {
  const app = new App();
  const stack = new InfraStack(app, "InfraStack", {});
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::EC2::Subnet", 4);
  template.hasResourceProperties("AWS::EC2::Subnet", {
    CidrBlock: "10.0.0.0/24",
    AvailabilityZone: "ap-northeast-1a",
    Tags: [{ Key: "Name", Value: "undefined-undefined-subnet-public-1a" }],
  });
  template.hasResourceProperties("AWS::EC2::Subnet", {
    CidrBlock: "10.0.1.0/24",
    AvailabilityZone: "ap-northeast-1c",
    Tags: [{ Key: "Name", Value: "undefined-undefined-subnet-public-1c" }],
  });
  template.hasResourceProperties("AWS::EC2::Subnet", {
    CidrBlock: "10.0.10.0/24",
    AvailabilityZone: "ap-northeast-1a",
    Tags: [{ Key: "Name", Value: "undefined-undefined-subnet-private-1a" }],
  });
  template.hasResourceProperties("AWS::EC2::Subnet", {
    CidrBlock: "10.0.11.0/24",
    AvailabilityZone: "ap-northeast-1c",
    Tags: [{ Key: "Name", Value: "undefined-undefined-subnet-private-1c" }],
  });
});
