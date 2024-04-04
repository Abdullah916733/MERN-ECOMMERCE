import express from "express";
import product from "./routes/productRoute.js";

const app = express();

app.use(express.json());

// // Route Import
app.use("/api/v1", product);

export default app;
