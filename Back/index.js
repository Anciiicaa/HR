const sql = require('mssql');

// Postavite informacije o konekciji
const config = {
  server: 'DESKTOP-M7QDFHBMSSQLSERVER01',
  database: 'HR',
  options: {
    encrypt: true,
    trustServerCertificate: true,
    authentication: {
      type: 'Windows',
    },
  },
};

  

// Napravite konekciju
sql.connect(config, (err) => {
  if (err) {
    console.error('Greška pri povezivanju:', err);
    return;
  }

  // Ovde možete izvršiti SQL upite
  // Na primer:
  const request = new sql.Request();
  request.query('SELECT * FROM Employee', (err, result) => {
    if (err) {
      console.error('Greška pri izvršavanju upita:', err);
      sql.close();
      return;
    }

    console.log('Rezultat upita:', result.recordset);
    sql.close();
  });
});
