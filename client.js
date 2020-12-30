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

const grpcClient = new helloServiceProto(SERVER_URI, grpc.credentials.createInsecure());

grpcClient.sayHello({ yourName: 'edriyın' }, (err, { message }) => {
    if (err) {
        console.log(err);
    }

    console.log(message);
});
