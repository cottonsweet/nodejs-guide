import http from "http";

import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log("first middleware");
  next();
});

app.use((req, res, next) => {
  console.log("second middleware");
});

const server = http.createServer(app);

server.listen(4000);
