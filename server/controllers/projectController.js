// /server/controllers/projectController.js

const Project = require("../models/projectModel");
const Client = require("../models/clientModel");
const Feature = require("../models/featureModel");

exports.createProject = async (req, res) => {
  const { clientId, name, description } = req.body;
  try {
    // Validate the client ID
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const newProject = new Project({ clientId, name, description });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProjectsByClient = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    let projects = await Project.find({ clientId: clientId });

    // Fetch features for each project and add them to the project objects
    const projectsWithFeatures = await Promise.all(
      projects.map(async (project) => {
        const features = await Feature.find({ projectId: project._id });
        return { ...project.toObject(), features };
      })
    );

    res.status(200).json(projectsWithFeatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id).populate("clientId", "name");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClientsWithProjectsAndFeatures = async (req, res) => {
  try {
    // Retrieve all clients
    const clients = await Client.find();

    // Map through each client to attach projects and features
    const clientsWithProjects = await Promise.all(
      clients.map(async (client) => {
        // Find projects for this client
        const projects = await Project.find({ clientId: client._id });

        // Map through each project to attach features
        const projectsWithFeatures = await Promise.all(
          projects.map(async (project) => {
            const features = await Feature.find({ projectId: project._id });
            return {
              ...project.toObject(), // Convert to a plain JavaScript object
              features: features, // Attach features to the project object
            };
          })
        );

        return {
          ...client.toObject(), // Convert to a plain JavaScript object
          projects: projectsWithFeatures, // Attach projects with features to the client object
        };
      })
    );

    res.status(200).json(clientsWithProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("clientId", "name email");
    const projectsWithFeatures = await Promise.all(
      projects.map(async (project) => {
        const features = await Feature.find({ projectId: project._id });
        return { ...project.toObject(), features };
      })
    );
    res.status(200).json(projectsWithFeatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
