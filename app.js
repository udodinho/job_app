require('dotenv').config()
require("express-async-errors")
const errorHandlerMiddleware = require("./middleware/error-handler")
const notFound = require("./middleware/not-found")
const authRouter = require("./routes/auth")
const jobsRouter = require("./routes/jobs")
const express = require("express")
const app = express()
const connectDB = require("./db/connectdb")

app.use(express.json())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", jobsRouter)


// Error handler
app.use(notFound)
app.use(errorHandlerMiddleware)



const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
