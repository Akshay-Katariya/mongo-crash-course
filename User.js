const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: { type: Number, min: 19, max: 55 },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: (props) =>
        `Please enter correct email id ${props.value} is invalid email`,
    },
  },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
  bestFriend: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  hobbies: [String],
  address: addressSchema,
});

userSchema.methods.sayHi = function () {
  console.log(`My name is ${this.name}`);
};

userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

userSchema.virtual("nameEmail").get(function () {
  // does not save this property in DB but can be accessed all over application
  return `${this.name} <${this.email}>`;
});

// Middleware that run before save
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware that run after save
userSchema.post("save", function (doc, next) {
  doc.sayHi();
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
