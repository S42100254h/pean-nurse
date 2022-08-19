import * as cdk from "@aws-cdk/core";
import { Vpc } from "./resource/vpc";

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc();
    vpc.createResources(this);
  }
}
