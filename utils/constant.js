import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI
const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET
const PORT= process.env.PORT
const FRONTEND_URL= process.env.FRONTEND_URL

export {MONGO_URI,ACCESS_TOKEN_SECRET,PORT,FRONTEND_URL}