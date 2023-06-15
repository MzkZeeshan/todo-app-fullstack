const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((m) => {
    console.log("db connected");
  });

app.use("/todo",require("./routes/todo.js"))

app.listen(process.env.PORT || 9000, () =>
  console.log("Server is running at",process.env.PORT || 9000)
);
