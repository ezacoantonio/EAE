require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/db");

// Importing routes
const clientRoutes = require("./routes/clientRoutes");
const featureRoutes = require("./routes/featureRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Use CORS to allow cross-origin requests
app.use(express.json()); // Parses incoming JSON requests and puts the parsed data in req.body

// Routes
app.use("/api/clients", clientRoutes);
app.use("/api/features", featureRoutes);
app.use("/api/projects", projectRoutes);

// Handling undefined routes
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
