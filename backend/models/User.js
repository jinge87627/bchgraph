var mongoose = require('mongoose');

var User = new mongoose.Schema({
    email: { type: String, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'] },
    password: { type: String },
}, { timestamps: true });

mongoose.model('User', User);