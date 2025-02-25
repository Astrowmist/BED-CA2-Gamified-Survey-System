const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mainRoutes = require('./routes/mainRoutes.js');

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use('/api', mainRoutes);


module.exports = app; 