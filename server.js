if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

//middleware set up
app.use(cors());
app.use(express.json());

// connection to mongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

//Routes and APIetup
const productsRouter = require("./routes/products");
app.use("/products", productsRouter);

app.get("/ok", (req, res) => {
  res.status(200).send("ok");
});

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "/frontend/build")));
}

// The catch handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

// Heroku dynamically set a PORT, therefore always use process.env.PORT by default
const server = app.listen(process.env.PORT || 5000, () => {
  console.log("env", process.env.NODE_ENV);
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

//Exports server for testing
module.exports = server;
