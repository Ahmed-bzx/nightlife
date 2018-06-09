const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  google: {
    id: String,
    name: String,
    image: String,
  },
  goingList: []
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
