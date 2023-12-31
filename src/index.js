// require('./models/User');
require('./models/Track');
const express = require('express')
const mongooes = require('mongoose');
const router = require('./routes/authRoutes')
const requiredAuth = require('./middlewares/requireAuth')
const trackRouter = require('./routes/trackRoutes');

const mongodbUri = 'mongodb+srv://onkarpawar7598:onkarpawar7598@cluster0.aejqt5f.mongodb.net/?retryWrites=true&w=majority'

const app = express();

app.use(router);
app.use(trackRouter);

mongooes.connect(mongodbUri, {
})

mongooes.connection.on('connected', () => {
    console.log('connected to mongodb');
})

mongooes.connection.on('error', () => {
    console.log('error connecting to mongodb');
})

app.get('/', requiredAuth, (req, res) => {
    res.send(`Your mail: ${req.user.email}`);
});

app.listen(8080, () => {
    console.log('listening on port 8080');
});