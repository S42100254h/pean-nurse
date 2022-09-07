import * as cdk from "@aws-cdk/core";
import { CfnSubnet, CfnSecurityGroup, CfnVPC } from "@aws-cdk/aws-ec2";
import { CfnTaskDefinition, CfnService, CfnCluster } from "@aws-cdk/aws-ecs";
import { CfnLoadBalancer, CfnTargetGroup } from "@aws-cdk/aws-elasticloadbalancingv2";
import { CfnRepository } from "@aws-cdk/aws-ecr";
import { CfnDBInstance } from "@aws-cdk/aws-rds";
import { Resource } from "./abstract/resource";

interface ResourceInfo {
  readonly id: string;
  readonly family: string;
  readonly cpu: string;
  readonly memory: string;
  readonly executionRoleArn: string;
  readonly taskRoleArn: string;
  readonly containerName: string;
  readonly password: string;
  readonly resourceName: string;
  readonly assign: (service: CfnService) => void;
}

export class Ecs extends Resource {
  public service: CfnService;

  private readonly vpc: CfnVPC;
  private readonly subnetEcs1a: CfnSubnet;
  private readonly subnetEcs1c: CfnSubnet;
  private readonly securityGroupEcs: CfnSecurityGroup;
  private readonly alb: CfnLoadBalancer;
  private readonly repositoryNginx: CfnRepository;
  private readonly repositoryRails: CfnRepository;
  private readonly password: string;
  private readonly targetGroup: CfnTargetGroup;
  private readonly dbInstance: CfnDBInstance;
  private readonly resources: ResourceInfo[] = [
    {
      id: "Fargate",
      family: "peanTask",
      cpu: "512",
      memory: "1024",
      taskRoleArn: "ecsTaskExecutionRole",
      executionRoleArn: "ecsTaskExecutionRole",
      containerName: "pean-nginx",
      password: "a8810097",
      resourceName: "peanCluster",
      assign: (service) => (this.service = service),
    },
  ];

  constructor(
    vpc: CfnVPC,
    subnetEcs1a: CfnSubnet,
    subnetEcs1c: CfnSubnet,
    securityGroupEcs: CfnSecurityGroup,
    alb: CfnLoadBalancer,
    repositoryNginx: CfnRepository,
    repositoryRails: CfnRepository,
    password: string,
    targetGroup: CfnTargetGroup,
    dbInstance: CfnDBInstance,
  ) {
    super();
    this.vpc = vpc;
    this.subnetEcs1a = subnetEcs1a;
    this.subnetEcs1c = subnetEcs1c;
    this.securityGroupEcs = securityGroupEcs;
    this.alb = alb;
    this.repositoryNginx = repositoryNginx;
    this.repositoryRails = repositoryRails;
    this.password = password;
    this.targetGroup = targetGroup;
    this.dbInstance = dbInstance;
  }

  createResources(scope: cdk.Construct) {
    for (const resourceInfo of this.resources) {
      const cluster = this.createCluster(scope);
      const taskDefinition = this.createTaskDefinition(scope, resourceInfo);
      this.createService(scope, cluster, taskDefinition, resourceInfo);
    }
  }

  private createCluster(scope: cdk.Construct): CfnCluster {
    const fargateCluster = new CfnCluster(scope, "PeanCluster", {
      clusterName: "PeanCluster",
    });

    return fargateCluster;
  }

  private createTaskDefinition(scope: cdk.Construct, resourceInfo: ResourceInfo): CfnTaskDefinition {
    const fargateTaskDefinition = new CfnTaskDefinition(scope, "FargateTaskDefinition", {
      family: resourceInfo.family,
      cpu: resourceInfo.cpu,
      memory: resourceInfo.memory,
      executionRoleArn: resourceInfo.executionRoleArn,
      taskRoleArn: resourceInfo.taskRoleArn,
      containerDefinitions: [
        {
          logConfiguration: {
            logDriver: "awslogs",
            options: {
              "awslogs-group": "/ecs/PeAN-task",
              "awslogs-region": "ap-northeast-1",
              "awslogs-create-group": "true",
              "awslogs-stream-prefix": "ecs",
            },
          },
          environment: [
            {
              name: "DB_PASSWORD",
              value: this.password,
            },
            {
              name: "DB_HOST",
              value: this.dbInstance.attrEndpointAddress,
            },
            {
              name: "DB_NAME",
              value: this.dbInstance.dbInstanceIdentifier,
            },
            {
              name: "DB_PORT",
              value: this.dbInstance.port,
            },
            {
              name: "DB_USERNAME",
              value: this.dbInstance.masterUsername,
            },
            {
              name: "API_DOMAIN",
              value: process.env.API_DOMAIN,
            },
            {
              name: "AWS_DEFAULT_REGION",
              value: process.env.AWS_DEFAULT_REGION,
            },
            {
              name: "AWS_S3_BUCKET_NAME",
              value: process.env.AWS_S3_BUCKET_NAME,
            },
            {
              name: "FROM_MAIL_ADDRESS",
              value: process.env.FROM_MAIL_ADDRESS,
            },
            {
              name: "MAILER_PASS",
              value: process.env.MAILER_PASS,
            },
            {
              name: "PUBLIC_URL",
              value: process.env.PUBLIC_URL,
            },
            {
              name: "RAILS_ENV",
              value: process.env.RAILS_ENV,
            },
            {
              name: "REGISTER_MAIL_ADDRESS",
              value: process.env.REGISTER_MAIL_ADDRESS,
            },
            {
              name: "RESET_PASSWORD_URL",
              value: process.env.RESET_PASSWORD_URL,
            },
            {
              name: "TO_MAIL_ADDRESS",
              value: process.env.TO_MAIL_ADDRESS,
            },
            {
              name: "AWS_S3_ACCESS_KEY_ID",
              value: process.env.AWS_S3_ACCESS_KEY_ID,
            },
            {
              name: "AWS_S3_SECRET_ACCESS_KEY",
              value: process.env.AWS_S3_SECRET_ACCESS_KEY,
            },
            {
              name: "RAILS_MASTER_KEY",
              value: process.env.RAILS_MASTER_KEY,
            },
          ],
          portMappings: [
            {
              hostPort: 3000,
              protocol: "tcp",
              containerPort: 3000,
            },
          ],
          mountPoints: [
            {
              containerPath: "/myapp/tmp",
              sourceVolume: "volume",
            },
          ],
          // image: this.repositoryRails.ref,
          image: this.repositoryRails.attrRepositoryUri,
          essential: true,
          name: "pean-rails",
        },
        {
          logConfiguration: {
            logDriver: "awslogs",
            options: {
              "awslogs-group": "/ecs/PeAN-task",
              "awslogs-region": "ap-northeast-1",
              "awslogs-create-group": "true",
              "awslogs-stream-prefix": "ecs",
            },
          },
          environment: [
            {
              name: "CHOKIDAR_USEPOLLING",
              value: process.env.CHOKIDAR_USEPOLLING,
            },
            {
              name: "REACT_APP_API_URL",
              value: process.env.REACT_APP_API_URL,
            },
            {
              name: "REACT_APP_PUBLIC_URL",
              value: process.env.REACT_APP_PUBLIC_URL,
            },
          ],
          portMappings: [
            {
              hostPort: 80,
              protocol: "tcp",
              containerPort: 80,
            },
          ],
          volumesFrom: [
            {
              sourceContainer: "pean-rails",
            },
          ],
          image: this.repositoryNginx.attrRepositoryUri,
          essential: true,
          name: "pean-nginx",
        },
      ],
      requiresCompatibilities: ["FARGATE"],
      networkMode: "awsvpc",
      runtimePlatform: {
        operatingSystemFamily: "LINUX",
        cpuArchitecture: "ARM64",
      },
      volumes: [
        {
          name: "volume",
        },
      ],
    });

    return fargateTaskDefinition;
  }

  private createService(
    scope: cdk.Construct,
    cluster: CfnCluster,
    taskDefinition: CfnTaskDefinition,
    resourceInfo: ResourceInfo,
  ): CfnService {
    const fargateService = new CfnService(scope, "FargateService", {
      launchType: "FARGATE",
      taskDefinition: taskDefinition.ref,
      cluster: cluster.clusterName,
      serviceName: "FargateService",
      desiredCount: 1,
      deploymentConfiguration: {
        deploymentCircuitBreaker: {
          enable: false,
          rollback: false,
        },
        maximumPercent: 200,
        minimumHealthyPercent: 100,
      },
      networkConfiguration: {
        awsvpcConfiguration: {
          subnets: [this.subnetEcs1a.ref, this.subnetEcs1c.ref],
          securityGroups: [this.securityGroupEcs.ref],
          assignPublicIp: "ENABLED",
        },
      },
      loadBalancers: [
        {
          containerPort: 80,
          containerName: resourceInfo.containerName,
          // loadBalancerName: this.alb.name,
          targetGroupArn: this.targetGroup.ref,
        },
      ],
    });

    return fargateService;
  }
}
