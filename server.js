// require("dotenv").config();

// console.log(process.env.port);

const http = require("node:http");
const fs = require("node:fs");

http
  .createServer((req, res) => {
    console.log(req.url);
  })
  .listen(8080, () => {
    console.log("the server is processing on http://localhost:8080");
  });
