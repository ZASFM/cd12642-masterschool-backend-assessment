const express=require('express');
const router=express.Router();
const {getPhoto,getPhotos}=require('../controllers/photoController');

router.route('/').get(getPhotos);
router.route('/:id').get(getPhoto);

module.exports=router;