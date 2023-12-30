require('./models/User');
const express = require('express')
const mongooes = require('mongoose');
const router = require('./routes/authRoutes')

const mongodbUri = 'mongodb+srv://onkarpawar7598:onkarpawar7598@cluster0.aejqt5f.mongodb.net/?retryWrites=true&w=majority'

const app = express();

app.use(router);

mongooes.connect(mongodbUri, {
})

mongooes.connection.on('connected', () => {
    console.log('connected to mongodb');
})

mongooes.connection.on('error', () => {
    console.log('error connecting to mongodb');
})

app.get('/', (req, res) => {
    res.send('Hi there!');
});

app.listen(3000, () => {
    console.log('listening on port 300');
});