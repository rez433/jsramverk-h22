const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { errHandler } = require('./middleWare/errHandler')
const cnctDB = require('./dbOps/db');
const port = process.env.PORT || 1337;


cnctDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));   
app.use('/api/docs', require('./routes/routes.js'));
app.use(errHandler);


app.listen(port, () => console.log(`server is running on port: ${port}`))
