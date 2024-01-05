This repo contains two application app1 and app2 hosted using expressjs where app1 makes reuqest to app2 to get data.

To create a docker build
```
docker build -t my-express-app .
```
To tun the image
```
docker run -p 3000:3000 my-express-app
```

Task definition in ecs for app-1 similarly create for app-2
```
{
    "taskDefinitionArn": "arn:aws:ecs:ap-northeast-1:Account-ID:task-definition/app1:3",
    "containerDefinitions": [
        {
            "name": "app-1",
            "image": "Account-ID.dkr.ecr.ap-northeast-1.amazonaws.com/app-1:latest",
            "cpu": 0,
            "portMappings": [
                {
                    "name": "app-1-3000-tcp",
                    "containerPort": 3000,
                    "hostPort": 3000,
                    "protocol": "tcp",
                    "appProtocol": "http"
                }
            ],
            "essential": true,
            "environment": [],
            "environmentFiles": [],
            "mountPoints": [],
            "volumesFrom": [],
            "ulimits": [],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-create-group": "true",
                    "awslogs-group": "/ecs/app1",
                    "awslogs-region": "ap-northeast-1",
                    "awslogs-stream-prefix": "ecs"
                },
                "secretOptions": []
            }
        },
        {
            "name": "xray-daemon",
            "image": "amazon/aws-xray-daemon:latest",
            "cpu": 0,
            "portMappings": [
                {
                    "name": "xray-daemon-2000-tcp",
                    "containerPort": 2000,
                    "hostPort": 2000,
                    "protocol": "tcp"
                }
            ],
            "essential": false,
            "environment": [
                {
                    "name": "AWS_XRAY_DAEMON_ADDRESS",
                    "value": "0.0.0.0:2000"
                }
            ],
            "environmentFiles": [],
            "mountPoints": [],
            "volumesFrom": [],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-create-group": "true",
                    "awslogs-group": "/ecs/app1",
                    "awslogs-region": "ap-northeast-1",
                    "awslogs-stream-prefix": "ecs"
                },
                "secretOptions": []
            }
        }
    ],
    "family": "app1",
    "taskRoleArn": "arn:aws:iam::Account-ID:role/ecsTaskExecutionRole",
    "executionRoleArn": "arn:aws:iam::Account-ID:role/ecsTaskExecutionRole",
    "networkMode": "awsvpc",
    "revision": 3,
    "volumes": [],
    "status": "ACTIVE",
    "requiresAttributes": [
        {
            "name": "com.amazonaws.ecs.capability.logging-driver.awslogs"
        },
        {
            "name": "ecs.capability.execution-role-awslogs"
        },
        {
            "name": "com.amazonaws.ecs.capability.ecr-auth"
        },
        {
            "name": "com.amazonaws.ecs.capability.docker-remote-api.1.19"
        },
        {
            "name": "com.amazonaws.ecs.capability.task-iam-role"
        },
        {
            "name": "ecs.capability.execution-role-ecr-pull"
        },
        {
            "name": "com.amazonaws.ecs.capability.docker-remote-api.1.18"
        },
        {
            "name": "ecs.capability.task-eni"
        },
        {
            "name": "com.amazonaws.ecs.capability.docker-remote-api.1.29"
        }
    ],
    "placementConstraints": [],
    "compatibilities": [
        "EC2",
        "FARGATE"
    ],
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "cpu": "1024",
    "memory": "3072",
    "runtimePlatform": {
        "cpuArchitecture": "X86_64",
        "operatingSystemFamily": "LINUX"
    },
    "registeredAt": "2024-01-05T17:54:44.062Z",
    "registeredBy": "arn:aws:sts::Account-ID:assumed-role/IibsAdminAccess-DO-NOT-DELETE/ConduitAccountService+Prod+Default+NA+Fleet+P-aditmohn",
    "tags": []
}```