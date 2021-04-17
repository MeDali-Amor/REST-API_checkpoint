const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    age: Number,
    email: {
        type: String,
        unique: true,
        // validate: (value) => {
        //     return validator.isEmail(value);
        // },
    },
});

module.exports = mongoose.model("User", userSchema);
