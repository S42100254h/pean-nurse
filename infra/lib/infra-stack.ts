import * as cdk from "@aws-cdk/core";
import { Vpc } from "./resource/vpc";
import { Subnet } from "./resource/subnet";

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc();
    vpc.createResources(this);

    const subnet = new Subnet(vpc.vpc);
    subnet.createResources(this);
  }
}
