const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        default: "sepia",
    },
    fontSize: {
        type: Number,
        default: 30,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    book: {
        type: String,
        default: "",
    },
    emailConformed: {
        type: Boolean,
        default: false,
    },
    page: {
        type: String,
    },
    flow: {
        type: String,
        default: "paginated",
    },
});

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
});

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("EmailPassInc");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("EmailPassInc");
    }

    return user;
};

UserSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ id: this._id.toString() }, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
};

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

UserSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
        next(new Error("EmailUsed"));
    } else {
        next(error);
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
