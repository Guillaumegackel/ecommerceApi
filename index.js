const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require ("./routes/users")
const authRoutes = require ("./routes/auth")
const productRoutes = require ("./routes/product")
const orderRoutes = require ("./routes/order")
const cartRoutes = require ("./routes/cart")

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("la DB est connectée !"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes)
app.use("/api/orders", orderRoutes)

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is OK");
});
