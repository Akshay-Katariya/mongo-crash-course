const mongoose = require("mongoose");

const User = require("./User");

mongoose.connect("mongodb://localhost:27017/testdb");

run();
async function run() {
  try {
    // const user = await User.findByName("akshay");

    // const user = await User.where().byName("akshay");

    const user = await User.findOne({ name: "Akshay" });

    // const user = await User.where("name")
    //   .equals("Koyal")
    //   .where("age")
    //   .gte("22")
    //   .populate("bestFriend");

    // const user = await User.create({
    //   name: "Akshay",
    //   age: 30,
    //   email: "akshay.katariya1@gmail.com",
    //   hobbies: ["Music", "Travelling"],
    //   address: {
    //     street: "Dhankawadi",
    //     city: "Pune",
    //   },
    //   bestFriend: "6560b93e7a808ac59a3e2e78",
    // });
    console.log(user);
    await user.save();
    console.log(user.nameEmail);
  } catch (error) {
    console.log(error.message);
  }
}
