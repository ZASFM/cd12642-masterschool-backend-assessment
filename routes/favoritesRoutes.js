const express=require('express');
const router=express.Router();
const {getPhotos,postPhoto,deletePhoto,editPhoto}=require('../controllers/favoritesController');
const verifyToken=require('../middleware/authMiddleware');

router.route('/').post(verifyToken,postPhoto).get(verifyToken,getPhotos);
router.route('/:id').put(verifyToken,editPhoto).delete(verifyToken,deletePhoto);

module.exports=router;