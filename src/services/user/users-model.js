'use strict';

// users-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
const validator = require('validator');

const usersSchema = new Schema({
  email: { type: String, required: true, unique: true, validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email!' }},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  streamkey: { type: String},
  banned:    {type: Boolean, 'default': false},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

usersSchema.pre('save', function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});

usersSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;