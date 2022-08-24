import { Template } from "@aws-cdk/assertions";
import { App } from "@aws-cdk/core";
import { InfraStack } from "../../lib/infra-stack";

test("certificate manager test", () => {
  const app = new App();
  const stack = new InfraStack(app, "InfraStack", {});
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::CertificateManager::Certificate", 1);
  template.hasResourceProperties("AWS::CertificateManager::Certificate", {
    DomainName: "pean-nurse.com",
    SubjectAlternativeNames: ["*.pean-nurse.com"],
  });
});
