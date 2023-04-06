import express from "express"
import rateLimit from 'express-rate-limit'
import cors from "cors"
import readAndGenerate from "./js/writeFile.js"
import * as sheduler from "./js/sheduler.js"
import path from 'path'

const __dirname = path.resolve();
const PORT = 5000
const app = express()
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter)
//app.use(cors())
app.use(cors({
	credentials: true,
	origin: 'https://iamtester.ru'
}))
const mypath=path.join(__dirname,'../files')
console.log(mypath)
app.use('/', express.static(mypath))
app.get("/api", (req, res) => {
  try {
    const {fileType, size}=req.query
    console.log('filetype: ',fileType)
    const rng=readAndGenerate(fileType, size)
    return res.status(200).json(rng)

    
  } catch (err) {
    return res.status(500).json(err)
  }
})
sheduler.initScheduledJobs()
//app.listen(PORT, 'localhost', () => console.log("SERVER STARTED, PORT: " + PORT))
app.listen(PORT, () => console.log("SERVER STARTED, PORT: " + PORT))
