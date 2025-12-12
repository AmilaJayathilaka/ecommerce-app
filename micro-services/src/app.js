import express from "express";
import routes from "./routes/index.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use("/api", routes);

app.use(errorHandler);

export default app;
