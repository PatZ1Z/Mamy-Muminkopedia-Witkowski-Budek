
import {Request, Response} from 'express'
import {addCharacter, fetchCharacters, modifyCharacterById, removeCharacter} from "../services/character.service";



export async function getTasks(req: Request, res: Response): Promise<void> {
    try{
        const tasks = await fetchCharacters()
        res.status(200).json(tasks)

    }catch(err){
        res.status(500).send({error: err});
    }
}

export async function postTask(req: Request, res: Response): Promise<void> {
    try{
        const {name, description, species, status, friends} = req.body;
        const newCharacter = await addCharacter(name, description, species, status, friends);
        res.status(201).json({message: `Dodano nową postać ${newCharacter}`});
    }catch(err){
        const errorMessage = err instanceof Error ? err.message : "Unknown error.";
        res.status(400).json({error: `Nie udało się dodać zadania ${errorMessage}`});
    }
}

export async function putTask(req: Request, res: Response): Promise<void> {
    try{
        const id = req.params.id as string;
        const updatedData = req.body;
        const updatedTask = await modifyCharacterById(id, updatedData);
        res.status(404).json({message: `Dodano nowe zadanie ${id}`});
    }catch(err){
        const errorMessage = err instanceof Error ? err.message : "Unknown error.";
        if(errorMessage === "Task not found"){
            res.status(400).json({error: errorMessage});
        }else{
            res.status(500).json({error: "Nie udało się z niewiadomych przyczyn"});
        }
    }

}

export async function deleteTask(req: Request, res: Response): Promise<void> {
    try{
        const id = req.params.id as string;
        const deletedTask = await removeCharacter(id)

        res.status(200).json({message: `usunięto zadanie`, task: deletedTask});

    }catch(err){
        const error = err instanceof Error ? err : new Error("Unknown error");

        if(error.message === "Task not found"){
            res.status(404).json({error: error.message});
        }else{
            res.status(500).json({error: "Nie udało się usunąć zadania"});
        }
    }
}