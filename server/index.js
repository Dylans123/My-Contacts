const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const contactRouter = require('./routes/contact-router');

const app = express()
const apiPort = 3000 || process.env.PORT

app.use(cors())
app.use(express.json())

const uri = process.env.MONGO_URI;

mongoose
    .connect('mongodb+srv://Admin:6W9WCGUrTcWhOEVt@my-contacts-jvurw.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

db.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use('/api', contactRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))