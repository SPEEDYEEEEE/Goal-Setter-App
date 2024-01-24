const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// desc    Register User
// route   POST/api/users
// access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ error: 'Please fill all fields' });
        return;
    }

    // check if user exists
    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400).json({ error: 'User already exists' });
        return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        const token = generateToken(user._id);
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token,
        });
    } else {
        res.status(400).json({ error: 'Invalid user data' });
    }
});

// desc    Authenticate User
// route   POST/api/users/login
// access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log('Login Request Body:', req.body);
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id);
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token,
        });
    } else {
        res.status(400).json({ error: 'Invalid credentials' });
    }
});

// desc    Get User Data
// route   GET/api/users/me
// access  Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email,
    })
    // res.json({message: 'displayed'})
});

// Generate a JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = { registerUser, loginUser, getMe };
