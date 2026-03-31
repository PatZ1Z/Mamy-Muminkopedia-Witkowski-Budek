import ArtifactModel, {Artifact} from "../models/Artifact";

export async function getAllArtifacts(): Promise<Artifact[]> {
    return ArtifactModel.find()
}

export async function createArtifact(name: string, description:string, owner:string): Promise<Artifact> {
    const newArtifact = new ArtifactModel({name, description, owner});
    return newArtifact.save();
}

export async function updateArtifactById(id: string, updateData: Partial<Artifact>): Promise<Artifact | null> {
    return ArtifactModel.findByIdAndUpdate(id, updateData, {returnDocument: "after"})

}

export async function deleteArtifactById(id: string): Promise<Artifact | null> {
    return ArtifactModel.findByIdAndDelete(id)
}