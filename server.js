// const express = require("express");
// const app = express();
// const bodyparser = require("body-parser");
// const dotenv = require("dotenv");

// //Imported Routes
// const authRoutes = require("./routes/auth");
// const connectDB = require("./config/connectDB");
// const quizRoutes = require("./routes/quiz");

// dotenv.config();

// app.use(bodyparser.json());

// // Connect to Database
// connectDB();

// //rest api
// app.get("/", (req, res) => {
//     res.send("<h1>Welcome to Quizee web app</h1>");
//   });


// app.use("/api", authRoutes);
// app.use("/api", quizRoutes);

// app.post("/api/v1/hi", (req, res) => {
//     res.json({ message: "hi" });
// });
  
// //console.log(auth);

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



import app from "./app.js";
import { connectDb } from "./database/db.js";
import { PORT } from "./utils/constant.js";

 //rest api org
//  app.get("/", (req, res) => {
//      res.send("<h1>Welcome to Quizee web app</h1>");
// });

connectDb()
    .then(() => {
        app.listen(PORT || 5000, () => {
            console.log(`Server is running on http://localhost:${PORT || 5000}`)
        })
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error)
   })
