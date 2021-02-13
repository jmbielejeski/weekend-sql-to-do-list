const pg = require('pg');

// Create a connection to our database
const pool = new pg.Pool({
  // This option is required
  database: 'weekend-to-do-app',

  // These options are not required,
  // but you may see them around
  host: 'localhost',
  port: 5432,
});

// Share the DB connection!
module.exports = pool;
