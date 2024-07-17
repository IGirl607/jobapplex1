import express from 'express';
import { delete_job, fetchjobs, getSingleJob,  postjob, searchjobs, showmyjobs, update_job } from '../controllers/jobcontroller.js';
import { authorised } from '../middlewares/auth.js';

const router=express.Router();

router.get('/getjobs',fetchjobs);
router.post('/postjob',authorised,postjob);
router.get('/showmyjob',authorised,showmyjobs);

router.get('/searchjob',authorised,searchjobs);
router.put('/update/:id',authorised,update_job);

router.delete('/delete/:id',authorised,delete_job);

router.get('/:id',authorised,getSingleJob);

//router.get('/jobstatistics',authorised,jobstatistics);


export default router;