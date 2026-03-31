import {Artifact} from "../models/Artifact";
import {createArtifact, deleteArtifactById, getAllArtifacts, updateArtifactById} from "../repositories/artifact.repo";


export async function fetchArtifacts(): Promise<Artifact[]> {
    return await getAllArtifacts()
}

export async function addArtifact(name: string, description:string, owner: string):Promise<Artifact> {
    if(!name || !description){
        throw new Error("title and description are required");
    }
    return await createArtifact(name, description, owner );
}

export async function modifyArtifactById(id: string, updatedData: Partial<Artifact>): Promise<Artifact> {
    const updatedArtifact = await updateArtifactById(id, updatedData);
    if(!updatedArtifact){
        throw new Error("Task not found");
    }
    return updatedArtifact;
}

export async function removeArtifact(id: string): Promise<Artifact> {
    const deletedArtifact: Artifact | null = await deleteArtifactById(id);

    if(!deletedArtifact){
        throw new Error("Task not found");
    }
    return deletedArtifact;

}