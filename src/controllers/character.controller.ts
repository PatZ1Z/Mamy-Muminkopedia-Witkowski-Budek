
import {Request, Response} from 'express'
import {
    addCharacter,
    fetchCharacters,
    fetchOneCharacter,
    modifyCharacterById,
    removeCharacter
} from "../services/character.service";
import {fetchArtifacts, removeArtifact} from "../services/artifact.service";
import {Character} from "../models/Character";
import { deleteArtifactsByOwner } from "../services/artifact.service";



export async function getCharacters(req: Request, res: Response): Promise<void> {
    try{
        const characters = await fetchCharacters()
        res.status(200).json(characters)

    }catch(err){
        res.status(500).send({error: err});
    }
}



export async function postCharacter(req: Request, res: Response): Promise<void> {
    try{
        const {name, description, species, status, friends} = req.body;
        const newCharacter = await addCharacter(name, description, species, status, friends);
        res.status(201).json({message: `Dodano nową postać ${newCharacter}`});
    }catch(err){
        const errorMessage = err instanceof Error ? err.message : "Unknown error.";
        res.status(400).json({error: `Nie udało się dodać postaci ${errorMessage}`});
    }
}

export async function putCharacter(req: Request, res: Response): Promise<void> {
    try{
        const id = req.params.id as string;
        const updatedData = req.body;
        const updatedCharacter = await modifyCharacterById(id, updatedData);
        res.status(404).json({message: `Zaktualizowano postać ${id}`});
    }catch(err){
        const errorMessage = err instanceof Error ? err.message : "Unknown error.";
        if(errorMessage === "Character not found"){
            res.status(400).json({error: errorMessage});
        }else{
            res.status(500).json({error: "Nie udało się z niewiadomych przyczyn"});
        }
    }

}

export async function deleteCharacter(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id as string;

        const deletedCharacter = await removeCharacter(id);

        const deletedCount = await deleteArtifactsByOwner(deletedCharacter.name);

        res.status(200).json({
            message: `Usunięto postać i jej ${deletedCount} artefaktów`,
            character: deletedCharacter
        });


    } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");

        if (error.message === "Character not found") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Nie udało się usunąć postaci" });
        }
    }
}