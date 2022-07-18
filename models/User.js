const mongoose = require('mongoose')
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const generateRandomString = (myLength) => {
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
};

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['employee', 'hr', 'admin'],
        default: 'employee'
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        minlength: [5, 'Minimum username length is 5 characters'],
    },
    code: {
        type: String
    },
    created_at: { type: Date, default: Date.now },
    is_confirmed: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {

        const salt = await bcrypt.genSalt();
        this.code = generateRandomString(8);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;