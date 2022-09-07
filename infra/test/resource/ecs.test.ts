import { Template, Match } from "@aws-cdk/assertions";
import { App } from "@aws-cdk/core";
import { InfraStack } from "../../lib/infra-stack";

test("Ecs test", () => {
  const app = new App();
  const stack = new InfraStack(app, "InfraStack", {});
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::ECS::Cluster", 1);
  template.hasResourceProperties("AWS::ECS::Cluster", {
    ClusterName: "PeanCluster",
  });

  template.resourceCountIs("AWS::ECS::TaskDefinition", 1);
  template.hasResourceProperties("AWS::ECS::TaskDefinition", {
    ContainerDefinitions: [
      {
        Environment: Match.anyValue(),
        Essential: true,
        Image: Match.anyValue(),
        LogConfiguration: {
          LogDriver: "awslogs",
          Options: {
            "awslogs-group": "/ecs/PeAN-task",
            "awslogs-region": "ap-northeast-1",
            "awslogs-create-group": "true",
            "awslogs-stream-prefix": "ecs",
          },
        },
        MountPoints: [
          {
            ContainerPath: "/myapp/tmp",
            SourceVolume: "volume",
          },
        ],
        Name: "pean-rails",
        PortMappings: [
          {
            ContainerPort: 3000,
            HostPort: 3000,
            Protocol: "tcp",
          },
        ],
      },
      {
        Environment: Match.anyValue(),
        Essential: true,
        Image: Match.anyValue(),
        LogConfiguration: {
          LogDriver: "awslogs",
          Options: {
            "awslogs-group": "/ecs/PeAN-task",
            "awslogs-region": "ap-northeast-1",
            "awslogs-create-group": "true",
            "awslogs-stream-prefix": "ecs",
          },
        },
        Name: "pean-nginx",
        PortMappings: [
          {
            ContainerPort: 80,
            HostPort: 80,
            Protocol: "tcp",
          },
        ],
        VolumesFrom: [
          {
            SourceContainer: "pean-rails",
          },
        ],
      },
    ],
    Cpu: "512",
    ExecutionRoleArn: "ecsTaskExecutionRole",
    Family: "peanTask",
    Memory: "1024",
    NetworkMode: "awsvpc",
    RequiresCompatibilities: ["FARGATE"],
    RuntimePlatform: {
      CpuArchitecture: "ARM64",
      OperatingSystemFamily: "LINUX",
    },
    TaskRoleArn: "ecsTaskExecutionRole",
    Volumes: [
      {
        Name: "volume",
      },
    ],
  });

  template.resourceCountIs("AWS::ECS::Service", 1);
  template.hasResourceProperties("AWS::ECS::Service", {
    Cluster: "PeanCluster",
    DeploymentConfiguration: {
      DeploymentCircuitBreaker: {
        Enable: false,
        Rollback: false,
      },
      MaximumPercent: 200,
      MinimumHealthyPercent: 100,
    },
    DesiredCount: 1,
    LaunchType: "FARGATE",
    LoadBalancers: [
      {
        ContainerName: "pean-nginx",
        ContainerPort: 80,
        TargetGroupArn: Match.anyValue(),
      },
    ],
    NetworkConfiguration: {
      AwsvpcConfiguration: {
        AssignPublicIp: "ENABLED",
        SecurityGroups: Match.anyValue(),
        Subnets: Match.anyValue(),
      },
    },
    ServiceName: "FargateService",
    TaskDefinition: {
      Ref: "FargateTaskDefinition",
    },
  });
});
