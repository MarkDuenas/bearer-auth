'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { toJSON: {virtuals: true} } );

UserSchema.virtual('token').get(function() {
  let tokenObject = {
    username: this.username,
  }
  return jwt.sign(tokenObject, process.env.SECRET, { expiresIn: '30 days' });
});

UserSchema.pre('save', async function(){
  this.password = await bcrypt.hash(this.password, 5);
});

UserSchema.statics.authenticateBasic = async function(username, password) {
  const user = await this.findOne({ username:username });
  const valid = await bcrypt.compare(password, user.password);
  if(valid) {return user;};
  throw new Error({message: "Invalid User", status: 403});
};

UserSchema.statics.authenticateToken = async function(token) {
  try {
    const parsed = await jwt.verify(token, process.env.SECRET);
    const user = await this.findOne({ username: parsed.username });

    if(user) { return user; }

    throw new Error('User Not Found');
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = mongoose.model('users', UserSchema);