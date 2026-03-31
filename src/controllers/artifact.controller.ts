
import {Request, Response} from 'express'
import {addArtifact, fetchArtifacts, modifyArtifactById, removeArtifact} from "../services/artifact.service";



export async function getArtifacts(req: Request, res: Response): Promise<void> {
    try{
        const artifacts = await fetchArtifacts()
        res.status(200).json(artifacts)

    }catch(err){
        res.status(500).send({error: err});
    }
}

export async function postArtifact(req: Request, res: Response): Promise<void> {
    try{
        const {name, description, owner} = req.body;
        const newArtifact = await addArtifact(name, description, owner);
        res.status(201).json({message: `Dodano nowy artefakt ${newArtifact}`});
    }catch(err){
        const errorMessage = err instanceof Error ? err.message : "Unknown error.";
        res.status(400).json({error: `Nie udało się dodać artefaktu ${errorMessage}`});
    }
}

export async function putArtifact(req: Request, res: Response): Promise<void> {
    try{
        const id = req.params.id as string;
        const updatedData = req.body;
        const updatedArtifact = await modifyArtifactById(id, updatedData);
        res.status(404).json({message: `Dodano nowe artefakt ${id}`});
    }catch(err){
        const errorMessage = err instanceof Error ? err.message : "Unknown error.";
        if(errorMessage === "Artifact not found"){
            res.status(400).json({error: errorMessage});
        }else{
            res.status(500).json({error: "Nie udało się z niewiadomych przyczyn"});
        }
    }

}

export async function deleteArtifact(req: Request, res: Response): Promise<void> {
    try{
        const id = req.params.id as string;
        const deletedCharacter = await removeArtifact(id)

        res.status(200).json({message: `usunięto artefakt`, task: deletedCharacter});

    }catch(err){
        const error = err instanceof Error ? err : new Error("Unknown error");

        if(error.message === "Task not found"){
            res.status(404).json({error: error.message});
        }else{
            res.status(500).json({error: "Nie udało się usunąć artefaktu"});
        }
    }
}