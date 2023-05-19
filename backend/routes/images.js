const express = require("express");

const isAuth = require("../middlewares/is-auth");
const userRole = require("../middlewares/user-role");
const imagesController = require("../controllers/images");
const upload = require("../utils/imageupload.util");

const router = express.Router();

router.post('/upload-image', isAuth, upload.single('imageUrl'), imagesController.postImage);

router.get('/get-images', imagesController.getAllImages );

router.get('/get-image/:imageId', imagesController.getImageById );

router.post('/like-image/:imageId', isAuth, imagesController.likeImage );

router.post('/post-comment/:imageId', isAuth, imagesController.postComment );

router.delete('/delete-comment/:commentId', isAuth, userRole.isAdminorModerator, imagesController.deleteComment );

router.delete('/delete-image/:imageId', isAuth, imagesController.deleteImage );

module.exports = router;