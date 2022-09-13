import * as cdk from "@aws-cdk/core";
import { Bucket } from "@aws-cdk/aws-s3";
import { Resource } from "./abstract/resource";
import { BucketAccessControl, BlockPublicAccess } from "@aws-cdk/aws-s3";
import { ObjectOwnership } from "aws-cdk-lib/aws-s3";

export class S3 extends Resource {
  public bucket: Bucket;

  constructor() {
    super();
  }

  createResources(scope: cdk.Construct) {
    this.bucket = new Bucket(scope, "pean-bucket", {
      accessControl: BucketAccessControl.PRIVATE,
      bucketName: "pean-prod-bucket",
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
    });
  }
}
