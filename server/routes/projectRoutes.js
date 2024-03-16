// /server/routes/projectRoutes.js

const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.get("/all", projectController.getAllProjects);

// Create a new project
router.post("/", projectController.createProject);

// Get all projects for a specific client
router.get("/byClient/:clientId", projectController.getProjectsByClient);

// Get a single project by ID
router.get("/:id", projectController.getProjectById);

// Update a project by ID
router.put("/:id", projectController.updateProject);

// Delete a project by ID
router.delete("/:id", projectController.deleteProject);

module.exports = router;
