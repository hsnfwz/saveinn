require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const routes = require('./routes');

// app - server
const app = express();

// app - client
app.use(express.static(path.join(__dirname, '/app/build')));

// app - middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app - routes
app.use('/', routes);

// app - run
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));