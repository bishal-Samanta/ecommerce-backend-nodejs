const express = require('express');
const {  createUserController, loginUserController, getAllUser, getSingleUser, updateUser } = require('../controllers/user.controller');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');
const router = express.Router();


router.post("/register" , createUserController );
router.post("/login" , loginUserController);
router.get("/all" ,authMiddleware ,isAdmin  , getAllUser);
router.get("/:id", authMiddleware, getSingleUser);
router.put("/:id/edit" , authMiddleware , updateUser);

module.exports = router;

