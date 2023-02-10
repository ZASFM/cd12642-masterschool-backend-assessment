const express=require('express');
const router=express.Router();
const {register,login,getMe,logout}=require('../controllers/userController');
const verifyToken=require('../middleware/authMiddleware');

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/me').get(verifyToken,getMe)
router.route('/logout').post(logout)

module.exports=router;