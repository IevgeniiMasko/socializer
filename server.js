import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import dotenv from "dotenv";

//db
import connectDB from "./config/dbConn.js";

//routes
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import refreshTokenRoute from "./routes/refreshTokenRoute.js";

//middleware
import verifyJWT from "./middleware/verifyJWT.js";

const app = express();

const port = process.env.PORT || 3500;
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Cross Origin Resource Sharing
const acceptedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://www.google.com",
];
const corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
// handle cookies
app.use(cookieParser());
// handle a text-only multipart form
app.use(multer().none());
app.use(bodyParser.json({ limit: "50mb" }));
// when formdata is submitted
app.use(express.urlencoded({ extended: false }));
// when json is submitted
app.use(express.json());

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/index.html"));
  next();
});
//Auth routes
app.use("/auth", authRoute);
app.use("/refreshToken", refreshTokenRoute);
//JWT routes
app.use(verifyJWT);
app.use("/account", userRoute);
app.use("/post", postRoute);

if (process.env.NODE_ENV === "production") {
  //server static files
  app.use(express.static(path.join(__dirname, "/public")));
}

(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
