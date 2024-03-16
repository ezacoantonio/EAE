const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const projectController = require("../controllers/projectController");

router.get(
  "/withProjectsAndFeatures",
  projectController.getClientsWithProjectsAndFeatures
);

// Route to create a new client
router.post("/", clientController.addClient);

// Route to get all clients
router.get("/", clientController.getAllClients);

// Route to get a single client by ID
router.get("/:id", clientController.getClientById);

// Route to update a client by ID
router.put("/:id", clientController.updateClient);

// Route to delete a client by ID
router.delete("/:id", clientController.deleteClient);

router.post("/signup", clientController.createAccount);
router.post("/login", clientController.login);

module.exports = router;
