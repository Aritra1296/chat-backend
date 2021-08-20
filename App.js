const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv/config')
const Pusher = require('pusher')

//MIDDLEWARE
//COFIGURE CORS
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: [process.env.ALLOW_DOMAIN],
    credentials: true,
  })
)

//IMPORT ROUTER
app.use('/messages', require('./routes/Messages'))
app.use('/users', require('./routes/Users'))

//PUSHER
const pusher = new Pusher({
  appId: '1247307',
  key: '28527e97292ee45133a6',
  secret: '6165b8a0696e05d4b072',
  cluster: 'ap2',
  useTLS: true,
})

//CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  () => console.log('connected to db!!')
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error:'))
db.once('open', function () {
  console.log('Successfully connected to MongoDB!')
  //PUSHER TRIGGER
  const msgCollection = db.collection('messages')
  const changeStream = msgCollection.watch()
  changeStream.on('change', (change) => {
    //console.log('A change occured', change)

    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument
      pusher.trigger('messages', 'inserted', {
        message: messageDetails.message,
        receiverId: messageDetails.receiverId,
        senderId: messageDetails.senderId,
      })
    } else {
      console.log('Error triggerring pusher')
    }
  })
})

//HOW TO START LISTENING TO SERVER
app.listen(process.env.PORT, () =>
  console.log(`app started on port: ${process.env.PORT}`)
)
