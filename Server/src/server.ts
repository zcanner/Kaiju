import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import route from "./routes/auth.route";

import connectDB from "./db/connectMongoDB";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));
app.use(helmet());

app.use(cookieParser());
app.use(express.static("public"));

connectDB();

app.use("/api/auth", route);

const indexPath = path.join(__dirname, "../public/index.html");

app.get("*", (req, res) => {
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
