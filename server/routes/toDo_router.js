const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET the current database
router.get('/', (req, res) => {
  console.log('in GET route');
  // pool is our DB connection
  pool
    .query(
      `
    -- selecting entire table
    SELECT * FROM "todo"
    ORDER BY "id" -- ordering by ID
  `
    )
    .then(function (dbRes) {
      console.log('dbRes rows is ', dbRes.rows);
      // send back DB results
      res.send(dbRes.rows);
    })
    .catch(function (error) {
      console.log('error getting DB table', error);
      res.sendStatus(500);
    });
});

// POST

// DELETE

module.exports = router;
