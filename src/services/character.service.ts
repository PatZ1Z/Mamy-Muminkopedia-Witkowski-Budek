import {Character} from "../models/Character";
import {
    createCharacter,
    deleteCharacterById,
    getAllCharacters,
    getOneCharacter,
    updateCharacterById
} from "../repositories/character.repo";


export async function fetchCharacters(): Promise<Character[]> {
    return await getAllCharacters()
}

export async function fetchOneCharacter(id:string): Promise<Character | null> {
    return await getOneCharacter(id)
}

export async function addCharacter(name: string, description:string, species:string, status: string, friends: string[]):Promise<Character> {
    if(!name || !description){
        throw new Error("title and description are required");
    }
    return await createCharacter(name, description,species, status, friends );
}

export async function modifyCharacterById(id: string, updatedData: Partial<Character>): Promise<Character> {
    const updatedCharacter = await updateCharacterById(id, updatedData);
    if(!updatedCharacter){
        throw new Error("Task not found");
    }
    return updatedCharacter;
}

export async function removeCharacter(id: string): Promise<Character> {
    const deletedCharacter: Character | null = await deleteCharacterById(id);

    if(!deletedCharacter){
        throw new Error("Task not found");
    }
    return deletedCharacter;

}