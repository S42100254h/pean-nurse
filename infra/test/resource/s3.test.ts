import { Template, Match } from "@aws-cdk/assertions";
import { App } from "@aws-cdk/core";
import { InfraStack } from "../../lib/infra-stack";

test("S3 test", () => {
  const app = new App();
  const stack = new InfraStack(app, "InfraStack", {});
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::S3::Bucket", 1);
  template.hasResourceProperties("AWS::S3::Bucket", {
    AccessControl: "Private",
    BucketName: "pean-prod-bucket",
    OwnershipControls: {
      Rules: [
        {
          ObjectOwnership: "BucketOwnerEnforced",
        },
      ],
    },
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: true,
      BlockPublicPolicy: true,
      IgnorePublicAcls: true,
      RestrictPublicBuckets: true,
    },
  });
});
