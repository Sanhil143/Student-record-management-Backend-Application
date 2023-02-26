const express = require('express')
const mongoose = require('mongoose')
const router = require('./routers/router')

mongoose.set('strictQuery',false)
const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://sanhil143:raisahab12345@sanhildb.kk3knyj.mongodb.net/Teachers-Management")
.then(() => console.log("MongoDb is connected"))
.catch((err) => console.error(err.message))

app.use('/', router)

app.listen(3000, () => {
      console.log("Express app running on port " + 3000);
})