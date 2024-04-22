const connectToDB = require("./modules/connectToDB.сjs");
const { run: startHttpServer } = require("./modules/HttpServer.сjs");

const run = async () => {
  await connectToDB();
  startHttpServer();
};

run();
