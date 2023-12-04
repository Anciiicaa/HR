const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
const port = 3000;

// Middleware za analizu JSON podataka iz zahteva
app.use(bodyParser.json());

// Postavite informacije o konekciji
const config = {
  server: 'DESKTOP-M7QDFHB\\MSSQLSERVER01',
  database: 'HR',
  user: 'sqluser',
  password: 'database123',
  options: {
    encrypt: true,
    trustServerCertificate: true,
    authentication: {
      type: 'default',
    },
  },
};

// Kreirajte bazen konekcija
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

// Endpoint za dohvatanje svih korisnika
app.get('/users', async (req, res) => {
  await poolConnect; // Čekajte dok se bazen konekcija ne uspostavi

  try {
    const request = pool.request();

    // Izvršavanje upita za dohvatanje svih korisnika
    const result = await request.query('SELECT * FROM users');

    // Slanje rezultata kao odgovor
    res.json(result.recordset);
  } catch (err) {
    console.error('Greška pri izvršavanju upita:', err);
    res.status(500).json({ error: 'Greška pri izvršavanju upita' });
  }
});

// Osnovna ruta za dobrodošlicu
app.get('/', (req, res) => {
  res.send('Dobrodošli na server!');
});

// Startujte server
app.listen(port, () => {
  console.log(`Server je pokrenut na http://localhost:${port}`);
});
