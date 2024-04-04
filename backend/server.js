import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";

// CONFIG
dotenv.config({ path: "backend/config/config.env" });

// CONNECTING DATABASE
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is RUNNING on http:localhost:${process.env.PORT}`);
});
