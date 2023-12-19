const sql = require('mssql');

/*const conn_config = {
  server: 'DESKTOP-JUV4PVS\\SQLEXPRESS',
  database: 'HR',
  user: 'jevrem',
  password: 'jevrem123',
  options: {
    encrypt: true,
    trustServerCertificate: true
  },
};*/
const conn_config = {
  server: 'DESKTOP-M7QDFHB\\MSSQLSERVER01',
  database: 'HR',
  user: 'sqluser',
  password: 'database123',
  options: {
    encrypt: true,
    trustServerCertificate: true
  },
};


const config = {
    port:3000,
    secret: "ShenChiCompany"
}

const pool = new sql.ConnectionPool(conn_config);
const poolConnect = pool.connect();

module.exports = {poolConnect,pool,config};
