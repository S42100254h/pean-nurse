import * as cdk from "@aws-cdk/core";
import { CfnRepository } from "@aws-cdk/aws-ecr";
import { Resource } from "./abstract/resource";

interface ResourceInfo {
  readonly id: string;
  readonly assign: (repo: CfnRepository) => void;
}

export class Ecr extends Resource {
  public repositoryNginx: CfnRepository;
  public repositoryRails: CfnRepository;

  private readonly resourceInfo: ResourceInfo[] = [
    {
      id: "pean-nginx",
      assign: (repo) => (this.repositoryNginx = repo),
    },
    {
      id: "pean-rails",
      assign: (repo) => (this.repositoryRails = repo),
    },
  ];

  constructor() {
    super();
  }

  createResources(scope: cdk.Construct) {
    for (const resourceInfo of this.resourceInfo) {
      const repo = this.createRepository(scope, resourceInfo);
      resourceInfo.assign(repo);
    }
  }

  private createRepository(scope: cdk.Construct, resourceInfo: ResourceInfo): CfnRepository {
    const repo = new CfnRepository(scope, resourceInfo.id, {
      repositoryName: resourceInfo.id,
    });

    return repo;
  }
}
