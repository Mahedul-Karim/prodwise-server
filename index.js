const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const { handleError } = require("./controller/error");
const { queryRoutes } = require("./routes/query");
require("dotenv").config({ path: "./.env.local" });

const app = express();

const PORT = 3000 || process.env.PORT;

connectDB();


app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://prodwise-client.vercel.app"],
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/query", queryRoutes);

app.use(handleError);

app.listen(PORT, () => console.log("Server is running!!"));
