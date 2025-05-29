require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");

app.use(
   cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
   })
);

app.use(express.json());
app.use(cookieparser());

app.use("/api", router);
app.use(errorMiddleware);
const start = async () => {
   try {
      await mongoose.connect(process.env.DB_URL);
      app.listen(PORT, () =>
         console.log(`Сервер стартовал на порту = ${PORT}`)
      );
   } catch (e) {
      console.log(e);
   }
};

start();
