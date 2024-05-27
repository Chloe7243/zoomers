require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const feedRoutes = require("./routes/feed");
const userRoutes = require("./routes/user");

const upload = require("./middlewares/multer");
const isAuth = require("./middlewares/isAuth");
const { errorHandler } = require("./middlewares/errorHandler");

const PORT = 5000;
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});
app.use(upload.single("media"));

// ROUTES
app.use("/feed", isAuth, feedRoutes);
app.use("/user", isAuth, userRoutes);
app.use("/auth", authRoutes);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
