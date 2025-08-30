import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log("first middleware");
  next();
});

app.use((req, res, next) => {
  console.log("second middleware");
  res.send("he");
});

app.listen(4000);
