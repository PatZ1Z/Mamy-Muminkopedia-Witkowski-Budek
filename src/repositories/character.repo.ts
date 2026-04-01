import CharacterModel, {Character} from "../models/Character";

export async function getAllCharacters(): Promise<Character[]> {
    return CharacterModel.find()
}

export async function getOneCharacter(id: string): Promise<Character | null> {
    return CharacterModel.findById()
}

export async function createCharacter(name: string, description:string, species:string, status: string, friends: string[]): Promise<Character> {
    const newCharacter = new CharacterModel({name, description, species, status, friends});
    return newCharacter.save();
}

export async function updateCharacterById(id: string, updateData: Partial<Character>): Promise<Character | null> {
    return CharacterModel.findByIdAndUpdate(id, updateData, {returnDocument: "after"})

}

export async function deleteCharacterById(id: string): Promise<Character | null> {
    return CharacterModel.findByIdAndDelete(id)
}