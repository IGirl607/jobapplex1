import express from 'express';
import { deleteapplication, employergetapplications, myapplication, postapplication } from '../controllers/applycontroller.js';
import { authorised } from '../middlewares/auth.js';

const router=express.Router();
router.get('/employerget',authorised,employergetapplications);
router.get('/jobseekerget',authorised,myapplication);
router.delete('/deleteapply/:id',authorised,deleteapplication);
router.post('/postapplication',authorised,postapplication);

export default router;