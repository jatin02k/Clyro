import express from 'express';
import {getTask, createTask, getTaskById, updateTask, deleteTask} from '../controllers/taskController.js'
import { isLoggedIn } from '../../middlewares/isLoggedIn.js';

const router = express.Router();

// create CRUD operation routes
router.get('/',isLoggedIn,getTask);
router.post('/',isLoggedIn,createTask);
router.get('/:id',isLoggedIn, getTaskById);
router.put('/:id',isLoggedIn,updateTask);
router.delete('/:id',isLoggedIn,deleteTask);

export default router;