import dotenv from "dotenv";
import app from "./app.js";
import connectDatabase from "./config/database.js";
import cloudinary from 'cloudinary';

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

// CLOUDINARY
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
   api_key:process.env.CLOUDINARY_API_KEY,
   api_secret:process.env.CLOUDINARY_API_SECRET,
})
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
