import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { router as gptRoute } from './routes/gpt.routes.js'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")

    next()
})

app.use('/chat', gptRoute)

app.listen(process.env.PORT, () => {
  console.log("started");
});
