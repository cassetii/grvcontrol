const express = require('express');
const mongoose = require('./config/db');
const customerRoutes = require('./routes/customers');

const app = express();

app.use(express.json());
app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
