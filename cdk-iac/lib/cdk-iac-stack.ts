import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

export class CdkGrpcStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'test-vpc', {
      maxAzs: 2,
      cidr: '10.0.0.0/16',
      natGateways: 0,
      subnetConfiguration: [
          {
              name: 'public-subnet-test',
              cidrMask: 18,
              subnetType: ec2.SubnetType.PUBLIC,
          },
      ],
    });

    const securityGroup = new ec2.SecurityGroup(this, 'grpc-app-sg', {
      vpc: vpc,
      allowAllOutbound: true,
      securityGroupName: 'grpc-app-sg',
      description: 'grpc app security group',
    });

    // in addition of this ingrress rule;
    // add load balancer's security group as ingress rule after create it on AWS EC2 dashboard.
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'allow SSH from anywhere');

    const awsAMI = new ec2.AmazonLinuxImage({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
    });

    const instance = new ec2.Instance(this, 'grpc-app-instance', {
      vpc: vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: awsAMI,
      keyName: 'grpc-app-kp', // create this keypair via using EC2 dashboard before deploy this stack.
      securityGroup: securityGroup,
      instanceName: 'grpc-app-instance',
    });
    
    instance.role.addManagedPolicy({
      managedPolicyArn: 'arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess'
    });

    // we will create our load balancer on AWS Console. 
    // There is no support about gRPC load balancer creation with CDK or CloudFormation
    // You can follow this feature on https://github.com/aws-cloudformation/aws-cloudformation-coverage-roadmap/issues/713
    // after related support, some codes will be in here...
  }
}
