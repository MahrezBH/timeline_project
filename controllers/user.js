const User = require("../models/User");
const Token = require("../models/Token");
const jwt = require('jsonwebtoken');
const Joi = require("joi");
const crypto = require("crypto");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: 'zizo.bmwh@gmail.com',
            pass: 'akfdvhmabfzbnyvl',
        }
    });
// verify connection configuration
transporter.verify(
    function (error, success) {
        if (error) { console.log(error); }
        else { console.log("Server is ready to take our messages"); }
    });


const sendEmail = async (email, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });
        console.log("email sent sucessfully");
        return true;
    } catch (error) {
        console.log(error, "email not sent");
        return false;
    }
};

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }

    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'ChallengeTeamSecret', {
        expiresIn: maxAge
    });
};

module.exports.signup = async (req, res) => {
    let email, password, username, is_confirmed, userType;
    console.log(req.body);
    if (req.body.body) {
        email, password, username, is_confirmed, userType = req.body.body;
    }
    else {
        email = req.body.email;
        password = req.body.password;
        username = req.body.username;
        console.log("email");
        console.log(email);
    }

    if (is_confirmed == "") {
        is_confirmed = false;
    }

    try {
        const user = await User.create({
            email, password, username, is_confirmed, userType
        });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.list = async (req, res) => {
    if (req.method == 'GET') {
        try {
            let users;
            const userType = req.query.userType;
            if (!userType) {
                users = await User.find({});
            } else {
                users = await User.find({ userType: userType });
            }

            const userMap = [];
            users.forEach((user) => {
                let tmp = {};
                tmp['_id'] = user._id;
                tmp['userType'] = user.userType;
                tmp['email'] = user.email;
                tmp['username'] = user.username;
                tmp['is_confirmed'] = user.is_confirmed;
                tmp['created_at'] = user.created_at;

                userMap.push(tmp);
            });

            res.status(200).json({ users: userMap });

        }
        catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }
}

module.exports.login = async (req, res) => {
    if (req.method == 'GET') {
        const { email, password } = req.query;
        try {
            const user = await User.login(email, password);
            if (user) {
                res.status(200).json({
                    email: user.email,
                    userType: user.userType,
                    username: user.username,
                    is_confirmed: user.is_confirmed
                });
            }
        }
        catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }
    if (req.method == 'POST') {
        const { email, password } = req.body;

        try {
            const user = await User.login(email, password);
            const token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: true,
                maxAge: maxAge * 1000
            });
            res.status(200).json({ user: user._id, jwt: token, is_confirmed: user.is_confirmed });
        }
        catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }
}

module.exports.delete = async (req, res) => {
    if (req.method == 'DELETE') {
        const { id } = req.body;

        try {
            let user = await User.findOne({ _id: id })
            if (!user) {
                res.status(400).json({ 'data': 'Inexist User' });
            }
            else {
                await User.findByIdAndDelete({ _id: id })
                    .then(doc => {
                        return res.status(200).json({ 'data': 'Deleted with success' });
                    })
            }

        }
        catch (err) {
            res.status(400).json({ 'data': 'Deleted with fail' });
        }
    }
}


module.exports.update = async (req, res) => {
    if (req.method == 'PUT') {

        const id = req.body.body.id;


        try {
            let user = await User.findOne({ _id: id })
            if (!user) {
                res.status(400).json({ 'data': 'Inexist User' });
            }
            else {
                await User.findByIdAndUpdate(id, { ...req.body.body })
                    .then(doc => {
                        return res.status(200).json({ 'data': 'Updated with success' });
                    })
            }

        }
        catch (err) {
            res.status(400).json({ 'data': 'Updated with fail' });
        }
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

module.exports.sendEmail = (req, res) => {
    try {
        const { to, subject, text } = req.body;
        const status = sendEmail(to, subject, text);
        if (status == false) {
            console.log(error);
            return res.status(400).json()
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json()
    }
};

module.exports.sendCodeEmail = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    try {
        const user = await User.login(email, password);
        console.log(user.email);
        console.log(user.code);
        if (user) {
            const link = `http://localhost:4200/#/confirm/${user._id}/${user.code}`;
            const status = sendEmail(
                user.email,
                "Account confirmation",
                "Hi " + user.username + "\n Please confirm your account by clicking in: \n" + link)
            res.status(200).json();
        }
    }
    catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};


module.exports.confirmCode = async (req, res) => {
    try {
        console.log(req.params.userId);
        const user = await User.findOne({ _id: req.params.userId });
        console.log(user);
        if (!user)
            return res.status(400).send("user with given code doesn't exist");
        if (user) {
            console.log(req.params.code);

            if (user.code == req.params.code) {
                user.is_confirmed = true
                user.save()
                return res.status(200).json("");
            }
        }
    }
    catch (err) {
        return res.status(400).json();
    }
    return res.status(400).json();
};

module.exports.passwordReset = async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `http://localhost:4000/users/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
};

module.exports.passwordRestLink = async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
};
