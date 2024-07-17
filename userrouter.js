import express from 'express';
import { getuser, login, logout, register } from '../controllers/usercontrol.js';
import { authorised } from '../middlewares/auth.js';

const router=express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',authorised,logout);
router.get('/getuser',authorised,getuser);

export default router;