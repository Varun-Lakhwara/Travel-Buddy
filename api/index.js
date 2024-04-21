let express = require("express");
let mongo = require("mongoose");
let dotenv = require("dotenv");
let router = require ('./routes/user.route.js');

dotenv.config();

mongo
  .connect(process.env.MongoDb)
  .then(() => {
    console.log("MongoDb is connected.");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

app.use("/api/user", router);
