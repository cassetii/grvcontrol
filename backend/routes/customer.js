const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
});

// Add a new customer
router.post('/', async (req, res) => {
    const { name, phone, cluster, street, acConfigs, history } = req.body;
    const customer = new Customer({ name, phone, cluster, street, acConfigs, history });
    await customer.save();
    res.json(customer);
});

// Update a customer's history
router.put('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
        customer.history.push(req.body);
        await customer.save();
        res.json(customer);
    } else {
        res.status(404).json({ message: 'Customer not found' });
    }
});

// Delete a customer
router.delete('/:id', async (req, res) => {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted' });
});

module.exports = router;
