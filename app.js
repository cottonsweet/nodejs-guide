import express from "express";

const app = express();

app.use("/", (req, res, next) => {
  console.log("first middleware");

  next();
});

app.use("/products", (req, res, next) => {
  console.log("second middleware");
  res.send("프로덕트 페이지");
});

app.use("/", (req, res, next) => {
  console.log("first middleware");
  res.send("루트 페이지");
});

app.listen(4000);
