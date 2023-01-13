require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
require('dotenv').config();
const requireAuth = require('./middlewares/requireAuth');
const app = express();

const mongoUri = process.env.MONGO_URI;

const connect = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(mongoUri).then(() => {
        console.log("Connected to DB");
    }).catch((err) => {
        throw err;
    });
};

// another way to achieve the above:
// mongoose.connect(mongoUri);
// mongoose.connection.on('connected', () => {
//     console.log('Connected to DB');
// })
// mongoose.connection.on('error', (err) => {
//     console.error('Error connecting to mongo', err);
// })

app.use(bodyParser.json());

// routes
app.use(authRoutes);
app.use(trackRoutes);

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user}`);
});

app.listen(3000, () => {
    connect();
    console.log('Listening on port 3000');
})