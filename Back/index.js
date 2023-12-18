const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const {config} = require('./conn/config');

//Routes
const authRoutes = require('./routes/authRoutes');
const workerRoutes = require('./routes/workerRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/worker',workerRoutes);
app.use('/auth',authRoutes);

app.listen(config.port, () => {
  console.log(`Server je pokrenut na http://localhost:${config.port}`);
});
