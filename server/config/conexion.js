const sql = require('mssql/msnodesqlv8')
require('dotenv').config()
var config = {
    server: process.env.HOST,
    driver: 'msnodesqlv8',
    database: process.env.DATABASE,
    debug: true,
    options: {
        trustedConnection: true
    }
};

async function Open(query) {

    await sql.connect(config)
  const result = await sql.query(query)
  return result.recordset
}
exports.Open = Open;