import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import { DB_URI } from "./config/config.js";
import imageRoute from "./routes/image.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 100,
  message: "Too many requests from this IP, please try again after 10 minutes",
});

app.use((req, _, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.json());
app.use(fileUpload({ limits: { fileSize: "10*1024*1024" } }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);
app.use(helmet());
app.use("/api/images", imageRoute);
app.use("/api/auth", authRoute);
app.use(compression());

app.get("/", (req, res) => {
  res.status(200).json({ succuss: true, message: "Listening on port number 5000" });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
  if (err) console.log(err);
  else console.log(`Listening on port number ${PORT}`);
});
