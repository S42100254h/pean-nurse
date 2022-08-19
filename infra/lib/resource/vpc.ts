import * as cdk from "@aws-cdk/core";
import { CfnVPC } from "@aws-cdk/aws-ec2";
import { Resource } from "./abstract/resource";

export class Vpc extends Resource {
  public vpc: CfnVPC;

  constructor() {
    super();
  }

  createResources(scope: cdk.Construct) {
    const systemName = scope.node.tryGetContext("systemName");
    const envType = scope.node.tryGetContext("envType");

    this.vpc = new CfnVPC(scope, "Vpc", {
      cidrBlock: "10.0.0.0/16",
      tags: [{ key: "Name", value: this.createResourceName(scope, "vpc") }],
    });
  }
}
