const Post = require("../models/post");
const User = require("../models/user");

const cloudinary = require("cloudinary").v2;

exports.postImage = async (req, res, next) => {
    try{
        const { title } = req.body;
        const imageUrl = req.file;
        const user = await User.findById(req.userId);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        const post = new Post({
            title: title,
            imageUrl: imageUrl.path,
            creator: {
                id: req.userId,
                name: user.name
            }
        });
        await post.save();
        res.status(201).json({message: 'Image uploaded'});
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getAllImages = async (req, res, next) => {
    try{
        const images = await Post.find({});
        res.status(200).json({message: 'Images fetched', data: images});
    }
    catch{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getImageById = async (req, res, next) => {
    try{
        const imageId = req.params.imageId;
        const image = await Post.findById(imageId);
        console.log(image);
        if(!image){
            const error = new Error('Image not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: 'Image fetched', data: image});
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.likeImage = async (req, res, next) => {
    try{
        const imageId = req.params.imageId;
        const user = await User.findById(req.userId);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        const image = await Post.findById(imageId);
        if(!image){
            const error = new Error('Image not found');
            error.statusCode = 404;
            throw error;
        }
        const index = image.likedBy.indexOf(user._id);
        if(index == -1){
            image.likes = image.likes + 1;
            image.likedBy.push(req.userId);
            await image.save();
            res.status(200).json({message: 'Image liked'});
        }
        else{
            res.status(201).json({message: 'Image already liked'});
        }
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.postComment = async (req, res, next) => {
    try {
        const imageId = req.params.imageId;
        const { comment } = req.body;
        const user = await User.findById(req.userId);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        const image = await Post.findById(imageId);
        if(!image){
            const error = new Error('Image not found');
            error.statusCode = 404;
            throw error;
        }
        const newComment = {
            comment: comment,
            commenter: {
                id: user._id,
                name: user.name
            }
        };
        image.comments.push(newComment);
        await image.save();
        res.status(200).json({message: 'Comment posted'}); 
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const image = await Post.findOne({'comments._id': commentId});
        const user = await User.findById(req.userId);
        if(!image){
            const error = new Error('Comment not found');
            error.statusCode = 404;
            throw error;
        }
        if(image.creator.id.toString() === req.userId.toString() || user.role === 'moderator' || user.role === 'admin'){
            image.comments.pull(commentId);
            await image.save();
            res.status(200).json({message: 'Comment Deleted'});
        }
        else{
            res.status(200).json({message: 'Permission denied for user'});
        }
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteImage = async (req, res, next) => {
    try {
        const imageId = req.params.imageId;
        const image = await Post.findById(imageId);
        if(!image){
            const error = new Error('Image not found');
            error.statusCode = 404;
            throw error;
        }
        const user = await User.findById(req.userId);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        if(image.creator.id.toString() === req.userId.toString() || user.role === 'admin' || user.role === 'moderator'){
            await clearImage(image.imageUrl);
            const result = await Post.deleteOne({_id: imageId});
            res.status(200).json({message: 'Image deleted', result: result});
        }
        else{
            const error = new Error('Permission denied for user');
            error.statusCode = 403;
            throw error;
        }
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

async function clearImage(imageUrl) {
    let publicId;
    try {
        publicId = imageUrl.match(/\/([^/]+)\.[^.]+$/)[1];
        console.log(publicId);
        const result = await cloudinary.uploader.destroy(`posts/${publicId}`);
        console.log(result);
    }
    catch (err) {
        console.log(`Error deleting image ${publicId}: ${err.message}`);
    }
}

