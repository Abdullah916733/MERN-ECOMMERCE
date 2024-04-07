import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";

//  HANDLING UNCAUGHT EXCEPTION
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shuting down server due to unhandled promise rejection.`);

  process.exit(1);
});

// CONFIG
dotenv.config({ path: "backend/config/config.env" });

// CONNECTING DATABASE
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is RUNNING on http:localhost:${process.env.PORT}`);
});

//  UNHANDLED PROMISE REJECTION
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shuting down server due to unhandled promise rejection.`);

  server.close(() => {
    process.exit(1);
  });
});
