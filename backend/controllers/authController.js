const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        // res.status(500).json({ message: 'Server error' });/
        res.status(500).json({ message: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ username, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    }
    catch (error) {
        // res.status(500).json({ message: 'Server error' });
        res.status(500).json({ message: error.message });
    }
}
