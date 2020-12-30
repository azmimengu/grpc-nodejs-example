const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/hello.proto';
const PORT = 50051;
const SERVER_URI = `0.0.0.0:${PORT}`;

const packageDef = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const helloServiceProto = grpc.loadPackageDefinition(packageDef).HelloService;

const grpcServer = new grpc.Server();
grpcServer.addService(helloServiceProto.service, {
    sayHello: hello,
});
grpcServer.bindAsync(SERVER_URI, grpc.ServerCredentials.createInsecure(), () => {
    grpcServer.start();
    console.log(`gRPC server is running on port ${PORT}`);
});

function hello(call, callback) {
    
    let to = 'world';

    if (call.request && call.request.yourName) {
        to = call.request.yourName;
    }

    callback(null, {
        message: `Hello, ${to}`
    });
}
