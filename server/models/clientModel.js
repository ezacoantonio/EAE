// /server/models/clientModel.js

const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    softwareName: {
      type: String,
      required: false, // Assuming not all users (like company users) will have this
    },
    address: {
      type: String,
      required: false, // Same as above
    },
    contactInfo: {
      type: String,
      required: false, // Same as above
    },
    role: {
      type: String,
      required: true,
      enum: ["client", "company"],
      default: "client",
    },
    // Assuming a simple email field for identification in this example
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // IMPORTANT: In a real application, ensure passwords are properly hashed
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
