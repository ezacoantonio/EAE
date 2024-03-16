// /server/controllers/featureController.js
const Feature = require("../models/featureModel");

exports.createFeature = async (req, res) => {
  try {
    const newFeature = new Feature(req.body);
    await newFeature.save();
    res.status(201).json(newFeature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find().populate("projectId", "name");
    res.status(200).json(features);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getFeatureById = async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id).populate(
      "projectId",
      "name"
    );
    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }
    res.status(200).json(feature);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }
    res.status(200).json(feature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndDelete(req.params.id);
    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }
    res.status(200).json({ message: "Feature successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFeaturesByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;
    const features = await Feature.find({ projectId }).populate(
      "projectId",
      "title"
    );
    if (features.length === 0) {
      return res
        .status(404)
        .json({ message: "No features found for this project" });
    }
    res.status(200).json(features);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchFeatures = async (req, res) => {
  const searchTerm = req.query.term;
  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required" });
  }

  try {
    const regex = new RegExp(searchTerm, "i"); // 'i' for case-insensitive
    const features = await Feature.find({
      $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
    });
    res.status(200).json(features);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
