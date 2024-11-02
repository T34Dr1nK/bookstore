const http = require("http");
const app = require("./app.js");
const server = http.createServer(app);

const { PORT } = process.env;
const port = process.env.port || PORT;

server.listen(port, () => console.log(`Server is runninb on port ${port}`));