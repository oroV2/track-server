const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
var bodyParser = require('body-parser')

const router = express.Router();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post('/signup', urlencodedParser, jsonParser, async (req, res) => {
    console.log(req);
    const { email, password } = await req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        res.send('You send post request.');
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;