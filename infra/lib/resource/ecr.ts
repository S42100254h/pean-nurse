import * as cdk from "@aws-cdk/core";
import { CfnRepository } from "@aws-cdk/aws-ecr";
import { Resource } from "./abstract/resource";

interface ResourceInfo {
  readonly id: string;
}

export class Ecr extends Resource {
  public repository: CfnRepository;

  private readonly resourceInfo: ResourceInfo[] = [
    {
      id: "pean-nginx",
    },
    {
      id: "pean-rails",
    },
  ];

  constructor() {
    super();
  }

  createResources(scope: cdk.Construct) {
    for (const resourceInfo of this.resourceInfo) {
      const repo = this.createRepository(scope, resourceInfo);
    }
  }

  private createRepository(scope: cdk.Construct, resourceInfo: ResourceInfo): CfnRepository {
    const repo = new CfnRepository(scope, resourceInfo.id, {
      repositoryName: resourceInfo.id,
    });

    return repo;
  }
}
