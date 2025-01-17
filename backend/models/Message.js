const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: { type: String, required: true },  // Cambiado a String
    receiver: { type: String, required: true },  // Cambiado a String
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('Message', MessageSchema);
