const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true,  },
  role: { type: String, required: true, enum: ["admin", "mentor", "mentee"] },
  email:{type: String},
  blockedUsers: { 
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    default: [] // Default to an empty array
  },
 });

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
