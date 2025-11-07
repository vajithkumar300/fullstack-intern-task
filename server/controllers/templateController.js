import { Template } from "../models/Template.js";
import { v2 as cloudinary } from "cloudinary";

export const listTemplates = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const templates = await Template.find(filter).sort({ createdAt: -1 });
    res.json(templates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTemplate = async (req, res) => {
  try {
    const t = await Template.findById(req.params.id);
    if (!t) return res.status(404).json({ message: 'Template not found' });
    res.json(t);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const createTemplate = async (req, res) => {
  try {
    const { name, description, category } = req.body
    if (!name) return res.status(422).json({ message: 'Template name required' })

    const thumbnail_url = req.file?.path || ''
    const template = await Template.create({ name, description, category, thumbnail_url })

    res.status(201).json(template)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Admin: delete or update could be added similarly
export const updateTemplate = async (req, res) => {
  try {
    

    const { name, description, category } = req.body;
    let thumbnail_url = req.body.thumbnail_url;

    // ✅ If a new image file is uploaded, upload to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "templates" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary upload failed:", error);
            return res.status(500).json({ message: "Image upload failed" });
          }

          thumbnail_url = result.secure_url;

          const updated = await Template.findByIdAndUpdate(
            req.params.id,
            { name, description, category, thumbnail_url },
            { new: true }
          );

          if (!updated) {
            return res.status(404).json({ message: "Template not found" });
          }

          return res.json(updated);
        }
      );

      // ⚠️ Write file buffer to Cloudinary stream
      result.end(req.file.buffer);
      return; // Stop further execution
    }

    // ✅ No new image, just update text fields
    const updated = await Template.findByIdAndUpdate(
      req.params.id,
      { name, description, category, thumbnail_url },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteTemplate = async (req, res) => {
  try {
    const deleted = await Template.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Template not found' })
    res.json({ message: 'Template deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}
