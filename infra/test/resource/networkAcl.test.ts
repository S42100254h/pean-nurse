import { Template, Match } from "@aws-cdk/assertions";
import { App } from "@aws-cdk/core";
import { InfraStack } from "../../lib/infra-stack";

test("NetworkAcl test", () => {
  const app = new App();
  const stack = new InfraStack(app, "InfraStack", {});
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::EC2::NetworkAcl", 2);
  template.hasResourceProperties("AWS::EC2::NetworkAcl", {
    VpcId: Match.anyValue(),
    Tags: [
      {
        Key: "Name",
        Value: "undefined-undefined-nacl-public",
      },
    ],
  });

  template.resourceCountIs("AWS::EC2::NetworkAclEntry", 4);
  template.hasResourceProperties("AWS::EC2::NetworkAclEntry", {
    NetworkAclId: Match.anyValue(),
    Protocol: -1,
    RuleAction: "allow",
    RuleNumber: 100,
    CidrBlock: "0.0.0.0/0",
    Egress: true,
  });
  template.hasResourceProperties("AWS::EC2::NetworkAclEntry", {
    NetworkAclId: Match.anyValue(),
    Protocol: -1,
    RuleAction: "allow",
    RuleNumber: 100,
    CidrBlock: "0.0.0.0/0",
    Egress: false,
  });

  template.resourceCountIs("AWS::EC2::SubnetNetworkAclAssociation", 4);
  template.hasResourceProperties("AWS::EC2::SubnetNetworkAclAssociation", {
    NetworkAclId: Match.anyValue(),
    SubnetId: Match.anyValue(),
  });
});
