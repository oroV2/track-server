const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/User');

module.exports = (req, res, next) => {
    console.log(req.headers)
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: 'You must be login.' });
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        if (err) {
            return res.send(err);
        }
        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();

    })

}