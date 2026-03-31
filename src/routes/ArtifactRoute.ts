import express from "express";
import {deleteArtifact, getArtifacts, postArtifact, putArtifact} from "../controllers/artifact.controller";

const artifactRouter = express.Router();

artifactRouter.get('/', getArtifacts);

artifactRouter.post('/', postArtifact);

artifactRouter.put('/:id', putArtifact);

artifactRouter.delete('/:id', deleteArtifact);

export default artifactRouter;