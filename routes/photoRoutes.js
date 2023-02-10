const express=require('express');
const router=express.Router();
const {
   getPhoto,
   getPhotos,
   getUserPhotos}=require('../controllers/photoController');

router.route('/').get(getPhotos);
router.route('/:id').get(getPhoto);
router.route('/user/:username').get(getUserPhotos);

module.exports=router;