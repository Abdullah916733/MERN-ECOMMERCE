import express from "express";
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";

const app = express();

app.use(express.json());

//  Route Import
app.use("/api/v1", product);
app.use("/api/v1", user);

export default app;
