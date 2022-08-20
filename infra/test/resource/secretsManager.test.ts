import { Template } from "@aws-cdk/assertions";
import { App } from "@aws-cdk/core";
import { InfraStack } from "../../lib/infra-stack";

test("SecretsManager test", () => {
  const app = new App();
  const stack = new InfraStack(app, "InfraStack", {});
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::SecretsManager::Secret", 1);
  template.hasResourceProperties("AWS::SecretsManager::Secret", {
    Description: "for RDS cluster",
    GenerateSecretString: {
      ExcludeCharacters: "\"@/\\'",
      GenerateStringKey: "MasterUserPassword",
      PasswordLength: 16,
      SecretStringTemplate: '{"MasterUsername": "admin"}',
    },
    Name: "undefined-undefined-secrets-rds-cluster",
  });
});
