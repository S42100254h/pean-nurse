import * as cdk from "@aws-cdk/core";
import { Vpc } from "./resource/vpc";
import { Subnet } from "./resource/subnet";
import { InternetGateway } from "./resource/internetGateway";
import { RouteTable } from "./resource/routeTable";

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
  }
}
