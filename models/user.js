const mongoose = require("mongoose");
const schema = mongoose.Schema;

const { default: passportLocalMongoose } = require("passport-local-mongoose");

const userSchema = new schema({
    email: {
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);