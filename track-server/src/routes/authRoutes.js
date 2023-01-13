const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const router = express.Router();


router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
        res.send({ token });
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(422).send({ error: 'Must provide email and password'} )
    
    try {
        const user = await User.findOne({ email });
        if(!user) throw new Error();
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        res.send({ token });
    } catch (err) {
        console.log('rurs')
        return res.status(422).send({ error: 'Invalid password or email' });
    }
});

module.exports = router;