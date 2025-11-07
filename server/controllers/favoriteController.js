import { Template } from "../models/Template.js";
import { User } from "../models/User.js";


export const addFavorite = async (req, res) => {
  try {
    const templateId = req.params.templateId;
    const template = await Template.findById(templateId);
    if (!template) return res.status(404).json({ message: 'Template not found' });

    const user = await User.findById(req.user._id);
    const already = user.favorites.some(f => f.toString() === templateId);
    if (already) return res.status(400).json({ message: 'Already favorited' });

    user.favorites.push(templateId);
    await user.save();

    res.status(200).json({ message: 'Added to favorites' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const templateId = req.params.templateId;
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(f => f.toString() !== templateId);
    await user.save();
    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
