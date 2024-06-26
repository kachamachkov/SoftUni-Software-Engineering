const User = require('../models/User');
const { SECRET } = require('../config');
const jwt = require('../lib/jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (regData) => {
    if (regData.password !== regData.rePassword) {
        throw new Error('Passwords do not match!');
    }

    const user = await User.findOne({ email: regData.email });
    if (user) {
        throw new Error('User with that email already exists!');
    }

    const createdUser = await User.create(regData);
    const token = generateToken(createdUser);
    console.log(token);
    return token;
};

exports.login = async (loginData) => {
    const user = await User.findOne({ email: loginData.email });
    if (!user) {
        throw new Error('Invalid email or password.');
    }

    const isValid = await bcrypt.compare(loginData.password, user.password);
    if (!isValid) {
        throw new Error('Invalid email or password.');
    }

    const token = await generateToken(user);
    return token;
};


async function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2h' });
    return token;
}