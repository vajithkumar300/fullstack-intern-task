// routes/templateRoutes.js
import express from "express";
import { listTemplates, getTemplate, createTemplate, updateTemplate, deleteTemplate } from "../controllers/templateController.js";
import upload from "../middlewares/upload.js";
import multer from 'multer';


const templateRoutes = express.Router();
const uploads = multer({ storage: multer.memoryStorage() });

templateRoutes.get("/", listTemplates);
templateRoutes.get("/:id", getTemplate);
templateRoutes.post("/", upload.single("thumbnail"), createTemplate); // ⬅ file upload



templateRoutes.put('/:id', uploads.single('thumbnail'), updateTemplate);

templateRoutes.delete('/:id', deleteTemplate)


export default templateRoutes;
