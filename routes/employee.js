const router = require('express').Router();
const Employee = require('../models/user_employee');
const verifyToken = require('../middlewares/verify-token');
const jwt = require('jsonwebtoken');
const upload = require('../middlewares/upload-photo');

router.post('/auth/employee/signup', upload.single('photo'), async(req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({ success: false, message: 'Enter email or password' });
    } else {
        try {
            let newUser = new Employee();
            newUser.first_name = req.body.first_name;
            newUser.last_name = req.body.last_name;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.date_of_birth = req.body.date_of_birth;
            // newUser.avatar = req.file.location;

            await newUser.save();
            let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
                expiresIn: 604800, //1week
            });
            res.json({
                success: true,
                token: token,
                message: 'Created a new user!',
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }
});

// Profile route

router.get('/auth/employee/user', verifyToken, async(req, res) => {
    try {
        let foundUser = await (await Employee.findOne({ _id: req.decoded._id })).populate(
            'resume'
        );
        if (foundUser) {
            res.json({
                success: true,
                user: foundUser,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

// Update profile
router.put('/auth/employee/user', verifyToken, async(req, res) => {
    try {
        let foundUser = await Employee.findOne({ _id: req.decoded._id });
        if (foundUser) {
            if (req.body.first_name) foundUser.first_name = req.body.first_name;
            if (req.body.last_name) foundUser.last_name = req.body.last_name;
            if (req.body.email) foundUser.email = req.body.email;
            if (req.body.password) foundUser.password = req.body.password;
            if (req.body.date_of_birth) foundUser.date_of_birth = req.body.date_of_birth;
            if (req.body.avatar) foundUser.avatar = req.file.location;

            await foundUser.save();
            res.json({
                success: true,
                message: 'Successfully updated',
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

// Login ROute
router.post('/auth/login', async(req, res) => {
    try {
        let foundUser = await Employee.findOne({ email: req.body.email });
        if (!foundUser) {
            res.status(403).json({
                success: false,
                message: 'Auth failed, user not found',
            });
        } else {
            if (foundUser.comparePassword(req.body.password)) {
                let token = jwt.sign(foundUser.toJSON(), process.env.SECRET, {
                    expiresIn: 604800, // 1week
                });
                res.json({ success: true, token: token });
            } else {
                res.status(403).json({
                    success: false,
                    message: 'Authentication failed, Wrong password',
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "User doesn't exist",
        });
    }
});

module.exports = router;