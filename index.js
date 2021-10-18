const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/routes")
require("dotenv").config()
const app = express()

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URL);

const con = mongoose.connection
con.on("error",(err) => console.log(err))
con.once("open",() => console.log("Connected to db"))

app.use(express.json())

app.use("/notes", router)

app.listen(PORT,() => console.log(`App listening in port ${PORT}`)
)