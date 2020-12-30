### Simple gRPC Node.js example

It can be used for testing AWS Application Load Balancer (gRPC) protocol. Please use `client.js` file to test your server. 

You can run this sample app as container with using Docker commands.


#### To start server
```bash
node server.js
```

#### To test client
```bash
node client.js
```

### Server Side (AWS Stack) ###
In this project, we used [AWS CDK](https://aws.amazon.com/tr/cdk/) to setup our AWS Stack. Please make sure to run your `cdk` scripts under `cdk-iac` directory.

First, you need to change account id definition with yours inside `cdk-iac.ts` file which is located under `bin` folder.

To synthesize (transforms TS to CFN)
```bash
cdk synth CdkGrpcStack
```

To deploy your stack
```bash
cdk deploy CdkGrpcStack
```

