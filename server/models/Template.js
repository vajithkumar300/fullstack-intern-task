import mongoose from "mongoose";


const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  thumbnail_url: { type: String, default: '' },
  category: { type: String, default: 'general' }
}, { timestamps: true });

export const Template = mongoose.model('Template', TemplateSchema);
