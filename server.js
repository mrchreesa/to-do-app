var express = require("express");
var app = express();
var router = express.Router();
const { json } = require("body-parser");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost");

const tasks = require("./Routes/Tasks");
const users = require("./Routes/Users");

var db = mongoose;
app.use(cookieParser());
app.use(json());

app.use("/tasks", tasks(db));

app.use("/users", users(db));

const port = 8080;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
