import * as cdk from "@aws-cdk/core";
import { Vpc } from "./resource/vpc";
import { Subnet } from "./resource/subnet";
import { InternetGateway } from "./resource/internetGateway";
import { RouteTable } from "./resource/routeTable";
import { NetworkAcl } from "./resource/networkAcl";
import { SecurityGroup } from "./resource/securityGroup";
import { SecretsManager, OSecretKey } from "./resource/secretsManager";
import { Rds } from "./resource/rds";
import { Ecr } from "./resource/ecr";
import { CertificateManager } from "./resource/certificateManager";
import { Alb } from "./resource/alb";

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc();
    vpc.createResources(this);

    const subnet = new Subnet(vpc.vpc);
    subnet.createResources(this);

    const internetGateway = new InternetGateway(vpc.vpc);
    internetGateway.createResources(this);

    const routeTable = new RouteTable(vpc.vpc, subnet.public1a, subnet.public1c, internetGateway.igw);
    routeTable.createResources(this);

    const networkAcl = new NetworkAcl(vpc.vpc, subnet.public1a, subnet.public1c, subnet.private1a, subnet.private1c);
    networkAcl.createResources(this);

    const securityGroup = new SecurityGroup(vpc.vpc);
    securityGroup.createResources(this);

    const secretsManager = new SecretsManager();
    secretsManager.createResources(this);

    const masterUsername = SecretsManager.getDynamicReference(secretsManager.rdsCluster, OSecretKey.MasterUsername);
    const masterUserPassword = SecretsManager.getDynamicReference(
      secretsManager.rdsCluster,
      OSecretKey.MasterUserPassword,
    );

    const rds = new Rds(subnet.private1a, subnet.private1c, securityGroup.rds, masterUsername, masterUserPassword);
    rds.createResources(this);

    const ecr = new Ecr();
    ecr.createResources(this);

    const certificateManager = new CertificateManager();
    certificateManager.createResources(this);

    const alb = new Alb(vpc.vpc, subnet.public1a, subnet.public1c, securityGroup.alb, certificateManager.certificate);
    alb.createResources(this);
  }
}
