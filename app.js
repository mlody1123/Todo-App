const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const todo = require('./routes/todo')
const auth = require('./routes/auth')
const config = require('./config/keys')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const db = config.MONGO_URI

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

require('./config/passport')(passport)
app.use(passport.initialize())

// Routes
app.use('/api/todo', todo)
app.use('/api/auth', auth)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running on port ${port} `))

// TODO: JWT BLACKLIST after LOGOUT  and BEFORE Expire
