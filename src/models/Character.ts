import mongoose, { Document } from "mongoose";
import Character from "./Character";

export interface Character extends Document {
    name: string;
    description: string;
    species: string;
    status: string;
    friends: string[];
}

const CharacterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    species: {type: String, required: true},
    status: {type: String, required: true},
    friends: {type: Array, default: []},
})

export default mongoose.model<Character>('Character', CharacterSchema);