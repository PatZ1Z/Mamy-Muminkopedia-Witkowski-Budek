import express from "express";
import {getTasks, postTask, putTask, deleteTask} from "../controllers/character.controller";

const router = express.Router();

router.get('/', getTasks);

router.post('/', postTask);

router.put('/:id', putTask);

router.delete('/:id', deleteTask);

export default router;