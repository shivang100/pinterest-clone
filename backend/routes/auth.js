const express = require("express");

const isAuth = require("../middlewares/is-auth");
const userRole = require("../middlewares/user-role");
const authController = require("../controllers/auth");
const upload = require("../utils/imageupload.util");

const router = express.Router();

router.put('/signup', upload.single('avatar') , authController.signup );

router.post('/login', authController.login );

router.get('/get-users', isAuth, userRole.isAdminorModerator, authController.getAllUsers );

router.get('/get-moderators', isAuth, userRole.isAdmin, authController.getAllModerators );

router.delete('/delete-user/:userId', isAuth, userRole.isAdmin, authController.deleteUser );

router.post('/block-user/:userId', isAuth, userRole.isAdmin, authController.blockUser );

router.post('/unblock-user/:userId', isAuth, userRole.isAdmin, authController.UnblockUser );

router.post('/add-moderator/:userId', isAuth, userRole.isAdmin, authController.addModerator );

router.post('/remove-moderator/:userId', isAuth, userRole.isAdmin, authController.removeModerator );

router.get('/get-role', isAuth, authController.getRole);
router.post('/reset-password', authController.postReset);
router.post('/new-password', authController.postNewPassword );

module.exports = router;