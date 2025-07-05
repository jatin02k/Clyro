import express from 'express';
import {getTask, createTask, getTaskById, updateTask, deleteTask} from '../controllers/taskController.js'
<<<<<<< HEAD
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
=======
import { isLoggedIn } from '../../middlewares/isLoggedIn.js';
>>>>>>> 92a5e80fda19eba95b7eec5bc3ca412243c1203f

const router = express.Router();

// create CRUD operation routes
router.get('/',isLoggedIn,getTask);
router.post('/',isLoggedIn,createTask);
router.get('/:id',isLoggedIn, getTaskById);
router.put('/:id',isLoggedIn,updateTask);
router.delete('/:id',isLoggedIn,deleteTask);

export default router;