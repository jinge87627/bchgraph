const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var User = mongoose.model('User');

router.post('/login', async (req, res, next) => {
    User.findOne({ email: req.body.email.toLowerCase() })
        .then(function (user) {
            if (user && user.email !== null) {
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            res.status(200).json({
                                message: "Correct Password",
                                user: user
                            });
                        }
                        else {
                            res.send({ message: "Wrong password", data: user.email }).end();
                        }
                    });
            } else {
                res.status(200).json({
                    message: "User does not exist",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(403);
        });
});

router.post('/register', async (req, res, next) => {
    User.findOne({ email: req.body.email.toLowerCase() })
        .then((user) => {
            if (user !== null) {
                res.status(200).json({
                    message: "User already exist",
                });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        console.error('There was an error', err);
                        res.sendStatus(403);
                    } else {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) {
                                console.log(err);
                                res.status(200).json({ message: err });
                            } else {
                                User.create({ email: req.body.email.toLowerCase(), password: hash })
                                    .then(function (user) {
                                        res.status(200).json({ message: "User created successfully", data: user.email });
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        res.sendStatus(403);
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
});

router.post('/edit/:id', async (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(data => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    console.error('There was an error', err);
                    res.sendStatus(403);
                } else {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) {
                            console.log(err);
                            res.status(200).json({ message: err });
                        } else {
                            User.findOneAndUpdate({ _id: req.params.id }, { email: req.body.email.toLowerCase(), password: req.body.password })
                                .then(data => {
                                    res.status(200).json(data);
                                })
                                .catch(next)
                        }
                    });
                }
            });
        })
        .catch(next);
});

router.post('/delete/:id', async (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then((data) => {
            User.find({})
                .then(data => res.json(data))
                .catch(next);
        })
        .catch(next)
});

router.get('/list', async (req, res, next) => {
    User.find({})
        .then(data => res.json(data))
        .catch(next);
});

router.get('/list/:email', async (req, res, next) => {
    User.find({ email: req.params.email })
        .then(data => res.status(200).json(data))
        .catch(next);
});

module.exports = router;
