const express = require('express');
const router=express.Router()
const userController=require('../controllers/userController')

router.get('/',userController.view)

router.post('/',userController.find)
router.get('/addUser',userController.form)

// router.get('', (req, res) => res.render(('home')))
// route

module.exports=router