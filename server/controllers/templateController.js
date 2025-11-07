import { Template } from "../models/Template.js";

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
    console.log("check", req.body, req.params.id);
    
    const { name, description, category, thumbnail_url } = req.body
    const updated = await Template.findByIdAndUpdate(
      req.params.id,
      { name, description, category, thumbnail_url },
      { new: true }
    )
    // console.log(updated, name);
    
    if (!updated) return res.status(404).json({ message: 'Template not found' })
    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

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
