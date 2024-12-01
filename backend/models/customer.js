const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    cluster: { type: String },
    street: { type: String },
    acConfigs: { type: [String] },
    history: [
        {
            date: String,
            type: String,
            description: String,
        },
    ],
});

module.exports = mongoose.model('Customer', CustomerSchema);
