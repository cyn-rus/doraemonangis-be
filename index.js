const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection
connection.once('open', () => {
  console.log("MongoDB database connection established successfully")
})

const dorayakiRouter = require('./controllers/dorayaki')
const storeRouter = require('./controllers/store')
const ownRouter = require('./controllers/own')

app.use('/dorayaki', dorayakiRouter)
app.use('/store', storeRouter)
app.use('/own', ownRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})