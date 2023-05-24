// Destructing the Schema and model
const { Schema, model } = require("mongoose");

// Create User Schema
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },

  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Create User Model
const UserModel = model("User", UserSchema);

module.exports = UserModel;
