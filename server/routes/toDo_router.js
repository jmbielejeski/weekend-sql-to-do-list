const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET the current database
router.get('/', (req, res) => {
  // console.log('in GET route');
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
      // console.log('dbRes rows is ', dbRes.rows);
      // send back DB results
      res.send(dbRes.rows);
    })
    .catch(function (error) {
      // console.log('error getting DB table', error);
      res.sendStatus(500);
    });
});

// POST
router.post('/', (req, res) => {
  // console.log('in POST, req.body is', req.body);

  let sqlText = `
  INSERT INTO "todo"
    ("task")
    VALUES
    ($1); -- placeholder values to prevent SQL Injection
`;

  let queryArs = [req.body.task];

  pool
    .query(sqlText, queryArs)
    .then(function (dbRes) {
      // console.log('dbRes', dbRes);
      res.sendStatus(200);
    })
    .catch(function (error) {
      // console.log('error in POST', error);
      res.sendStatus(500);
    });
});

// DELETE
router.delete('/remove/:id', (req, res) => {
  // console.log('in DELETE');

  let taskId = req.params.id;

  let sqlText = `
    DELETE FROM "todo" WHERE "id"=$1;
  `;
  pool
    .query(sqlText, [taskId])
    .then((resDB) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      // console.log('error in deleting task', error);
      res.sendStatus(500);
    });
});

// PUT
router.put('/ready/:id', (req, res) => {
  // store id of what is changing into variable
  let completeId = req.params.id;
  let completed = req.body.transferBoolean;

  console.log(completed);

  let sqlText = `UPDATE "todo" SET "complete"=TRUE WHERE "id"=$1`;

  pool
    .query(sqlText, [completeId])
    .then((resDB) => {
      console.log('in PUT resDB is', resDB);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in PUT', error);
      res.sendStatus(500);
    });
});

module.exports = router;
