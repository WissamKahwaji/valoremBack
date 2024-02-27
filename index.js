import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/auth_routes.js";
import contactRouter from "./routes/contact_routes.js";
import logoRouter from "./routes/logo_routes.js";
import homeRouter from "./routes/home_routes.js";
import colorsRouter from "./routes/colors_routes.js";
import propertyRouter from "./routes/property_routes.js";
import aboutUsRouter from "./routes/about_routes.js";
import statisticsRouter from "./routes/statistics_routes.js";
import teamRouter from "./routes/our_team_routes.js";
import serviceRouter from "./routes/service_routes.js";
import ourAgentsRouter from "./routes/our_agents_routes.js";
import reviewsRouter from "./routes/review_routes.js";
import achievementsRouter from "./routes/achievements_routes.js";
import brandsRouter from "./routes/brand_routes.js";
import offersRouter from "./routes/offer_routes.js";
import propertyInterRouter from "./routes/property_inter-routes.js";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    const filename = `${file.originalname.split(".")[0]}-${Date.now()}${ext}`;

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
    { name: "img", maxCount: 10 },
    { name: "coverImg", maxCount: 1 },
    { name: "intercoverImg", maxCount: 1 },
    { name: "profile", maxCount: 1 },
    { name: "imgs", maxCount: 15 },
    { name: "imgs[1]", maxCount: 15 },
    { name: "imgs[0]", maxCount: 15 },
    { name: "landingImg", maxCount: 1 },
    { name: "logoImg", maxCount: 1 },
    { name: "mainLogoImg", maxCount: 1 },
    { name: "imgHeading", maxCount: 1 },
  ])
);

app.use("/auth", authRouter);
app.use("/contact", contactRouter);
app.use("/logo", logoRouter);
app.use("/home", homeRouter);
app.use("/colors", colorsRouter);
app.use("/property", propertyRouter);
app.use("/propertyInter", propertyInterRouter);
app.use("/about-us", aboutUsRouter);
app.use("/statistics", statisticsRouter);
app.use("/our-team", teamRouter);
app.use("/services", serviceRouter);
app.use("/our-agents", ourAgentsRouter);
app.use("/reviews", reviewsRouter);
app.use("/achievements", achievementsRouter);
app.use("/brands", brandsRouter);
app.use("/offers", offersRouter);

app.get("/", (req, res) => res.send("Server is Ready"));

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server Running on ${PORT}`);
    })
  )
  .catch(error => console.log(error.message));

mongoose.set("strictQuery", true);
