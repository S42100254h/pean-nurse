import { Template, Match } from "@aws-cdk/assertions";
import { App } from "@aws-cdk/core";
import { InfraStack } from "../../lib/infra-stack";

test("Rds test", () => {
  const app = new App();
  const stack = new InfraStack(app, "InfraStack", {});
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::RDS::DBSubnetGroup", 1);
  template.hasResourceProperties("AWS::RDS::DBSubnetGroup", {
    DBSubnetGroupDescription: "Subnet Group for RDS",
    SubnetIds: Match.anyValue(),
    DBSubnetGroupName: "undefined-undefined-rds-sng",
  });

  template.resourceCountIs("AWS::RDS::DBParameterGroup", 1);
  template.hasResourceProperties("AWS::RDS::DBParameterGroup", {
    Description: "Parameter Group for RDS",
    Family: "mysql8.0",
  });

  template.resourceCountIs("AWS::RDS::DBInstance", 1);
  template.hasResourceProperties("AWS::RDS::DBInstance", {
    DBInstanceClass: "db.t2.micro",
    AllocatedStorage: "20",
    AutoMinorVersionUpgrade: false,
    AvailabilityZone: "ap-northeast-1a",
    DBInstanceIdentifier: "undefined-undefined-rds-instance-1a",
    DBName: "PeanDB",
    DBParameterGroupName: Match.anyValue(),
    DBSubnetGroupName: Match.anyValue(),
    Engine: "mysql",
    EngineVersion: "8.0.28",
    MasterUsername: Match.anyValue(),
    MasterUserPassword: Match.anyValue(),
    Port: "3306",
    PreferredMaintenanceWindow: "sun:20:00-sun:20:30",
    VPCSecurityGroups: Match.anyValue(),
  });
});
