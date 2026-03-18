import mongoose, { Document } from "mongoose";
import {Status} from "./status";
import Character from "./Character";

export interface Character extends Document {
    name: string;
    description: string;
    species: string;
    status: Status;
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