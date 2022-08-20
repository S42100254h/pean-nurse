import * as cdk from "@aws-cdk/core";
import { CfnDBSubnetGroup, CfnDBParameterGroup, CfnDBInstance } from "@aws-cdk/aws-rds";
import { CfnSubnet, CfnSecurityGroup } from "@aws-cdk/aws-ec2";
import { CfnSecret } from "@aws-cdk/aws-secretsmanager";
import { Resource } from "./abstract/resource";
import { SecretsManager, OSecretKey } from "./secretsManager";

interface InstanceInfo {
  readonly id: string;
  readonly availabilityZone: string;
  readonly preferredMaintenanceWindow: string;
  readonly resourceName: string;
  readonly assign: (instance: CfnDBInstance) => void;
}

export class Rds extends Resource {
  public dbInstance1a: CfnDBInstance;
  public dbInstance1c: CfnDBInstance;

  private static readonly engine = "mysql";
  private static readonly dbInstanceClass = "db.t2.micro";
  private static readonly databaseName = "PeanDB";
  private readonly subnetDb1a: CfnSubnet;
  private readonly subnetDb1c: CfnSubnet;
  private readonly securityGroupRds: CfnSecurityGroup;
  private readonly secretRdsCluster: CfnSecret;
  private readonly instances: InstanceInfo[] = [
    {
      id: "RdsDbInstance1a",
      availabilityZone: "ap-northeast-1a",
      preferredMaintenanceWindow: "sun:20:00-sun:20:30",
      resourceName: "rds-instance-1a",
      assign: (instance) => (this.dbInstance1a = instance),
    },
    // {
    //   id: "RdsDbInstance1c",
    //   availabilityZone: "ap-northeast-1c",
    //   preferredMaintenanceWindow: "sun:20:30-sun:21:00",
    //   resourceName: "rds-instance-1c",
    //   assign: (instance) => (this.dbInstance1c = instance),
    // },
  ];

  constructor(
    subnetDb1a: CfnSubnet,
    subnetDb1c: CfnSubnet,
    securityGroupRds: CfnSecurityGroup,
    secretRdsCluster: CfnSecret,
  ) {
    super();
    this.subnetDb1a = subnetDb1a;
    this.subnetDb1c = subnetDb1c;
    this.securityGroupRds = securityGroupRds;
    this.secretRdsCluster = secretRdsCluster;
  }

  createResources(scope: cdk.Construct) {
    const subnetGroup = this.createSubnetGroup(scope);
    const parameterGroup = this.createParameterGroup(scope);

    for (const instanceInfo of this.instances) {
      const instance = this.createInstance(scope, instanceInfo, subnetGroup, parameterGroup);
    }
  }

  private createSubnetGroup(scope: cdk.Construct): CfnDBSubnetGroup {
    const subnetGroup = new CfnDBSubnetGroup(scope, "RdsDbSubnetGroup", {
      dbSubnetGroupDescription: "Subnet Group for RDS",
      subnetIds: [this.subnetDb1a.ref, this.subnetDb1c.ref],
      dbSubnetGroupName: this.createResourceName(scope, "rds-sng"),
    });

    return subnetGroup;
  }

  private createParameterGroup(scope: cdk.Construct): CfnDBParameterGroup {
    const parameterGroup = new CfnDBParameterGroup(scope, "RdsDbParameterghGroup", {
      description: "Parameter Group for RDS",
      family: "mysql8.0",
    });

    return parameterGroup;
  }

  private createInstance(
    scope: cdk.Construct,
    instanceInfo: InstanceInfo,
    subnetGroup: CfnDBSubnetGroup,
    parameterGroup: CfnDBParameterGroup,
  ): CfnDBInstance {
    const instance = new CfnDBInstance(scope, instanceInfo.id, {
      dbName: Rds.databaseName,
      dbInstanceClass: Rds.dbInstanceClass,
      engine: Rds.engine,
      engineVersion: "8.0.28",
      allocatedStorage: "20",
      port: "3306",
      vpcSecurityGroups: [this.securityGroupRds.attrGroupId],
      autoMinorVersionUpgrade: false,
      availabilityZone: instanceInfo.availabilityZone,
      dbInstanceIdentifier: this.createResourceName(scope, instanceInfo.resourceName),
      dbParameterGroupName: parameterGroup.ref,
      dbSubnetGroupName: subnetGroup.ref,
      masterUserPassword: SecretsManager.getDynamicReference(this.secretRdsCluster, OSecretKey.MasterUserPassword),
      masterUsername: SecretsManager.getDynamicReference(this.secretRdsCluster, OSecretKey.MasterUsername),
      preferredMaintenanceWindow: instanceInfo.preferredMaintenanceWindow,
    });

    return instance;
  }
}
