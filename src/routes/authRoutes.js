const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

const router = express.Router();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post('/signup', urlencodedParser, jsonParser, async (req, res) => {
    console.log(req.body)
    const { email, password } = await req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send(token);
    } catch (error) {
        res.send(error);
    }
})

router.post('/signin', urlencodedParser, jsonParser, async (req, res) => {
    const { email, password } = await req.body;
    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password' })
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ error: 'Email not found' })
    }
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token });
    } catch {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
})

module.exports = router;