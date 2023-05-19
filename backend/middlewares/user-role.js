const User = require("../models/user");

exports.isAdmin = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        if(user.role === 'admin'){
            next();
        }
        else{
            const error = new Error('Permission denied for user');
            error.statusCode = 403;
            throw error;
        }
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.isModerator = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        if(user.role === 'moderator'){
            next();
        }
        else{
            const error = new Error('Permission denied for user');
            error.statusCode = 403;
            throw error;
        }
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.isAdminorModerator = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        if(user.role === 'admin' || user.role === 'moderator'){
            next();
        }
        else{
            const error = new Error('Permission denied for user');
            error.statusCode = 403;
            throw error;
        }
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};