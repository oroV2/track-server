const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const Track = mongoose.model('Track');
var bodyParser = require('body-parser');

const router = express.Router();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.use(requireAuth);

router.get('/tracks', urlencodedParser, jsonParser, async (req, res) => {
    const tracks = await Track.find({ userId: req.user._id });
    res.send(tracks);
})

router.post('/tracks', urlencodedParser, jsonParser, async (req, res) => {
    const { name, locations } = req.body;

    if (!name || !locations) {
        return res.status(422).send({ error: 'You must provide a name and locations' })
    }

    try {
        const track = new Track({ name, locations, userId: req.user._id });
        await track.save();
        res.send(track);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
})

module.exports = router;