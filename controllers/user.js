const User = require("../models/User");
const jwt = require('jsonwebtoken');

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
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login = async (req, res) => {
    if (req.method == 'GET') {
        const { email, password } = req.query;
        try {
            const user = await User.login(email, password);
            if (user) {
                res.status(200).json({ user: user });
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
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({ user: user._id });
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
                await User.findOneAndRemove({ _id: id })
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
        const { _id } = req.body;
        console.log(_id);

        try {
            let user = await User.findOne({ id: _id })
            if (!user) {
                res.status(400).json({ 'data': 'Inexist User' });
            }
            else {
                await User.findByIdAndUpdate(_id, { ...req.body })
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