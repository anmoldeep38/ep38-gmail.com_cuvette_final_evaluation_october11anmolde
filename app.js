import express from 'express'
//import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middlewares/error.middleware.js'
import cors from 'cors'
import { FRONTEND_URL } from './utils/constant.js'
//dotenv.config()

const app = express()
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



//import routes
import userRoutes from './routes/user.routes.js'
import quizRoutes from './routes/quiz.routes.js'


//routes config
app.use("/api/v1/account", userRoutes);
app.use("/api/v1/quiz", quizRoutes)


// app.all("*", (req, res) => {
//     res.status(404).json({
//         status: 404,
//         success: false,
//         message: "!Oops page not found"
//     })
// })

 app.get("/", (req, res) => {
     res.send("<h1>Welcome to Quizee web app</h1>");
});

app.use(errorMiddleware);

export default app;
