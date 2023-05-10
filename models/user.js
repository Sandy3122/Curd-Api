const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const userSchema = mongoose.Schema(
{

   id: {
    type: String,
    unique: true,
    default: uuidv4,
      },
  username: {
    type: String,
    required: [true, 'Please Enter The Name']
  },

  age:{
    type: Number,
    required:[true, 'Please Enter The Age']
  },

  hobbies:{
    type: [String],
    default: [],
    required: true
  },
});


const UserSchema = mongoose.model("USER", userSchema);
module.exports = UserSchema;