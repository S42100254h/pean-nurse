import { Template } from "@aws-cdk/assertions";
import { App } from "@aws-cdk/core";
import { InfraStack } from "../../lib/infra-stack";

test("Ecr test", () => {
  const app = new App();
  const stack = new InfraStack(app, "InfraStack", {});
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::ECR::Repository", 2);
  template.hasResourceProperties("AWS::ECR::Repository", {
    RepositoryName: "pean-nginx",
  });
  template.hasResourceProperties("AWS::ECR::Repository", {
    RepositoryName: "pean-nginx",
  });
});
