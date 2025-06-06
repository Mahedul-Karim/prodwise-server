const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const { handleError } = require("./controller/error");
require("dotenv").config({ path: "./.env.local" });

const app = express();

const PORT = 3000 || process.env.PORT;

connectDB();

console.log(process.env.MONGO_URL);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://prodwise-client.vercel.app"],
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(handleError);

app.listen(PORT, () => console.log("Server is running!!"));
