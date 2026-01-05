import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

import express from "express";
import userRouter from "./routers/user";
import workerRouter from "./routers/worker";

console.log("DB URL =", process.env.DATABASE_URL);

const app = express();

app.use("/v1/user", userRouter);
app.use("/v1/worker", workerRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
