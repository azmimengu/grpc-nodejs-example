#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkGrpcStack } from '../lib/cdk-iac-stack';

const franfurtEnv = { account: 'yourAccountId',  region: 'eu-central-1' };

const app = new cdk.App();
new CdkGrpcStack(app, 'CdkGrpcStack', { env: franfurtEnv });
