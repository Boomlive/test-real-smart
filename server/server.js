const express = require("express");
const { readdirSync } = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./Config/db");

const app = express();

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

readdirSync("./Routes").map((r) => app.use("/api", require("./Routes/" + r)));

app.listen(process.env.port, () =>
  console.log(`Server Running on port ${process.env.port}`)
);
