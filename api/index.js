let express = require("express");
let mongo = require("mongoose");
let dotenv = require("dotenv");
let userRouter = require ('./routes/user.route.js');
let authRouter = require ('./routes/auth.route.js');

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
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
