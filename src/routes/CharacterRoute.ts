import express from "express";
import {deleteCharacter, getCharacters, postCharacter, putCharacter} from "../controllers/character.controller";

const characterRouter = express.Router();

characterRouter.get('/', getCharacters);

characterRouter.post('/', postCharacter);

characterRouter.put('/:id', putCharacter);

characterRouter.delete('/:id', deleteCharacter);

export default characterRouter;