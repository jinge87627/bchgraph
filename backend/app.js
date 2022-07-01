const express = require('express')
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('dotenv').config();

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGOOSE_URL)
    .then((x) => {
        console.log(`Connected to Mongo! Database name: ${x.connections[0].name}`);
    }).catch((err) => {
        console.error("Error connecting to mongo", err);
    });

require('./models/User');

// Create default user
var User = mongoose.model('User');
User.findOne({ email: "user@bchgraph.com" })
    .then((user) => {
        if (user === null) {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    console.error('There was an error', err);
                    res.sendStatus(403);
                } else {
                    bcrypt.hash("bchgraph", salt, (err, hash) => {
                        if (err) {
                            console.log(err);
                            res.status(200).json({ message: err });
                        } else {
                            var defaultUser = new User({ email: "user@bchgraph.com", password: hash });
                            defaultUser.save((err, user) => {
                                if (err) return console.error(err);
                                console.log("Default user was created: " + user.email);
                            });
                        }
                    });
                }
            });
        }
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(403);
    });

try {
    const server = app.listen(port, () => {
        console.log('TEST API Server is running...');
    });

    app.use(require('./routes'));

    app.use((err, req, res, next) => {
        console.log(err);
        next();
    });
} catch (error) {
    console.log(error);
}
