import express from 'express'

const app = express()

app.use(express.json())

// require all the routes here 
import authRouter from './routes/auth.routes.js'

// using all the routes here
app.use("/api/auth", authRouter)

export default app


