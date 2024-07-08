import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import { v2 } from "cloudinary";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import route from "./routes/routes.js";
import connectDB from "./db/connectMongoDB.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(cookieParser());

connectDB(); // Connect to MongoDB

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); // Cloudinary config

// route
app.use("/api", route);

const indexPath = path.join(__dirname, "../public", "index.html");
app.get("*", (req, res) => {
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
