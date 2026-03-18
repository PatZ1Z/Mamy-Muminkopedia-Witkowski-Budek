import mongoose, { Document } from "mongoose";
import {Character} from "./Character";


export interface Artifact extends Document {
    name: string;
    description: string;
    owner: string;
}

const ArtifactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    owner: {type: String, required: true},
})

export default mongoose.model<Artifact>('Artifact', ArtifactSchema);