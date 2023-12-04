const sql = require('mssql');

// Postavite informacije o konekciji
const config = {
  server: 'SERVERERP\ERPSYSTEM',
  database: 'QPS',
  user: 'Anica',
  password: 'database123', // Ovo je samo primer, obavezno koristite bezbedan način čuvanja šifre u stvarnom projektu
  options: {
    encrypt: true,
    trustServerCertificate: true,
    authentication: {
      type: 'default',
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
  request.query('SELECT * FROM GP12Stanica', (err, result) => {
    if (err) {
      console.error('Greška pri izvršavanju upita:', err);
      sql.close();
      return;
    }

    console.log('Rezultat upita:', result.recordset);
    sql.close();
  });
});
