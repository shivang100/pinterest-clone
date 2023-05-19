const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res, next) => {
    const { email, password, username, name } = req.body;
    const avatar = req.file;
    try{
        const userPresent = await User.findOne({ 
            $or: [ { username }, { email } ], 
        });
        if(userPresent){
            const error = new Error('User already exist');
            error.statusCode = 403;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name: name,
            username: username,
            email: email,
            password: hashedPassword,
            avatar: avatar.path
        });
        await user.save();
        res.status(201).json({message: 'User created'});
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    let loadedUser;
    try{
        const user = await User.findOne({ username: username });
        if(!user) {
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        if(user.block === true){
            const error = new Error('User Blocked. Contact Admin!');
            error.statusCode = 403;
            throw error;
        }
        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            const error = new Error('Wrong password. Try again!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: loadedUser._id })
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find({ role: 'user'});
        res.status(200).json({message: 'Users fetched', data: users});
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getAllModerators = async (req, res, next) => {
    try{
        const moderators = await User.find({ role: 'moderator'});
        res.status(200).json({message: 'Users fetched', data: moderators});
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        const result = await User.deleteOne({_id: userId});
        res.status(200).json({message: 'User deleted', result: result});
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.blockUser = async (req, res, next) => {
    try{
        const userId = req.params.userId;
        console.log(userId);
        const user = await User.findById(userId);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        user.block = true;
        await user.save();
        res.status(200).json({message: 'User blocked'});
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.UnblockUser = async (req, res, next) => {
    try{
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        user.block = false;
        await user.save();
        res.status(200).json({message: 'User Unblocked'});
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.addModerator = async (req, res, next) => {
    try{
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        user.role = 'moderator';
        await user.save();
        res.status(200).json({message: 'User role updated'});
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.removeModerator = async (req, res, next) => {
    try{
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        user.role = 'user';
        await user.save();
        res.status(200).json({message: 'User role updated'});
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getRole = async (req, res, next) => {
    try{
        const userId = req.userId;
        const user = await User.findById(userId);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({message: 'Role fetched', role: user.role});
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.postReset = async (req, res, next) => {
    try{
        crypto.randomBytes(32, async (err, buffer) => {
            const token = buffer.toString('hex');
            const user = await User.findOne({email: req.body.email});
            if(!user){
                const error = new Error('User not found');
                error.statusCode = 401;
                throw error;
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            await user.save();
            transporter.sendMail({
                to: req.body.email,
                from: process.env.EMAIL,
                subject: 'Password reset',
                html: `
                    <p>You requested a password reset</p>
                    <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
                `
            });
            res.status(200).json({message: 'An email has been sent to registered email address'})
        });
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.postNewPassword = async (req, res, next) => {
    try{
        const newPassword = req.body.password;
        const confirmPassword =  req.body.confirmPassword;
        const passwordToken = req.body.passwordToken;
        const user = await User.findOne({
            resetToken: passwordToken, 
            resetTokenExpiration: {$gt: Date.now()},
        })
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        if(newPassword !== confirmPassword){
            const error = new Error('Password do not match');
            error.statusCode = 401;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiration = undefined;
        await user.save();
        res.status(200).json({message: 'Password reset successfull!'});
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};