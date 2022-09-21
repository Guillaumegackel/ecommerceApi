const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require ("./routes/users")

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("la DB est connectée !"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json())

app.use("/api/user", userRoutes)

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is OK");
});
