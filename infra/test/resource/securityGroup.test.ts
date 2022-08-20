import { Template, Match } from "@aws-cdk/assertions";
import { App } from "@aws-cdk/core";
import { InfraStack } from "../../lib/infra-stack";

test("SecurityGroup test", () => {
  const app = new App();
  const stack = new InfraStack(app, "InfraStack", {});
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::EC2::SecurityGroup", 3);
  template.hasResourceProperties("AWS::EC2::SecurityGroup", {
    GroupDescription: "for ALB",
    GroupName: "undefined-undefined-sg-alb",
    VpcId: Match.anyValue(),
    Tags: [{ Key: "Name", Value: "undefined-undefined-sg-alb" }],
  });
  template.hasResourceProperties("AWS::EC2::SecurityGroup", {
    GroupDescription: "for ECS",
    GroupName: "undefined-undefined-sg-ecs",
    VpcId: Match.anyValue(),
    Tags: [{ Key: "Name", Value: "undefined-undefined-sg-ecs" }],
  });
  template.hasResourceProperties("AWS::EC2::SecurityGroup", {
    GroupDescription: "for RDS",
    GroupName: "undefined-undefined-sg-rds",
    VpcId: Match.anyValue(),
    Tags: [{ Key: "Name", Value: "undefined-undefined-sg-rds" }],
  });

  template.resourceCountIs("AWS::EC2::SecurityGroupIngress", 3);
  template.hasResourceProperties("AWS::EC2::SecurityGroupIngress", {
    IpProtocol: "tcp",
    CidrIp: "0.0.0.0/0",
    FromPort: 443,
    ToPort: 443,
    GroupId: Match.anyValue(),
  });
  template.hasResourceProperties("AWS::EC2::SecurityGroupIngress", {
    IpProtocol: "tcp",
    FromPort: 80,
    ToPort: 80,
    GroupId: Match.anyValue(),
  });
  template.hasResourceProperties("AWS::EC2::SecurityGroupIngress", {
    IpProtocol: "tcp",
    FromPort: 3306,
    ToPort: 3306,
    GroupId: Match.anyValue(),
  });
});
