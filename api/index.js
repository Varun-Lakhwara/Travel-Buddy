const express = require("express");
const mongo = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.route.js");
const authRoutes = require("./routes/auth.route.js");
const postRoutes = require("./routes/post.route.js");
const commentRoutes = require("./routes/comment.route.js");
const contactRoutes = require("./routes/contact.route.js");
const cookieParser = require("cookie-parser");

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
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/contact", contactRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error.';
    res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    });
});
