import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.use(express.json())
app.use(cookieParser())

// require all the routes here 
import authRouter from './routes/auth.routes.js'

// using all the routes here
app.use("/api/auth", authRouter)

export default app


