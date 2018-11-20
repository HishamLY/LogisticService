const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mysqlConfig = require('./mysql-conf');
const uuidv4 = require('uuid/v4');

const connection = mysql.createConnection(mysqlConfig);
connection.connect();

var warehousingRequestRouter = express.Router();
warehousingRequestRouter.use(bodyParser.json());
warehousingRequestRouter.use(bodyParser.urlencoded({ extended: false }));

// GET Warehousing Request /:id
warehousingRequestRouter.get('/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "SELECT * FROM Request WHERE id = " + connection.escape(id);
  var query = connection.query(query_stmt, function (error, result, fields) {
    if (error) {
      error_msg = error.sqlMessage;
      return res.status(400).send({
        error: error_msg
      });
    }

    if (result.length == 0) {
      return res.status(404).send({
        success: false,
        result: [],
        message: 'Warehousing Request does not exist'
      });
    } else {
      var request_result = result[0];
      query_stmt = "SELECT * FROM Warehousing_Request WHERE id = " + connection.escape(id);
      query = connection.query(query_stmt, function (error, result, fields) {
        if (error) {
          error_msg = error.sqlMessage;
          return res.status(400).send({
            error: error_msg
          });
        }
        request_result['warehouse_id'] = result['warehouse_id'];
        request_result['start_date'] = result['start_date'];
        request_result['end_date'] = result['end_date'];

        return res.status(200).send({
          success: true,
          result: request_result
        });
      });
    }
  });
});

// POST Warehousing Request
warehousingRequestRouter.post('/', function (req, res) {
  var id = uuidv4();
  var query_stmt = "INSERT INTO Request SET id = ?, status = ?, fee = ?, quantity = ?, customer_id = ?, request_type = ?";
  var insert = [
    id,
    parseInt(req.body.status, 10),
    parseInt(req.body.fee, 10),
    parseInt(req.body.quantity, 10),
    req.body.customer_id,
    1];
  query_stmt = mysql.format(query_stmt, insert);
  var query = connection.query(query_stmt, function (error, result, fields) {
    if (error) {
      error_msg = error.sqlMessage;
      return res.status(400).send({
        error: error_msg
      });
    }

    query_stmt = "INSERT INTO Warehousing_Request SET id = ?, warehouse_id = ?, start_date = ?, end_date = ?";
    insert = [
      id,
      req.body.warehouse_id,
      req.body.start_date,
      req.body.end_date,
    ];
    query_stmt = mysql.format(query_stmt, insert);
    query = connection.query(query_stmt, function (error, result, fields) {
      if (error) {
        error_msg = error.sqlMessage;
        return res.status(400).send({
          error: error_msg
        });
      }

      return res.status(200).send({
        success: true,
        id: id
      })
    });
  });
});

// PUT Warehousing Request
warehousingRequestRouter.put('/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "SELECT * FROM Request WHERE id = " + connection.escape(id);
  var query = connection.query(query_stmt, function (error, result, fields) {
    if (error) {
      error_msg = error.sqlMessage;
      return res.status(400).send({
        error: error_msg
      });
    }

    if (result.length == 0) {
      return res.status(404).send({
        success: false,
        message: 'Warehousing Request does not exist'
      });
    }

    query_stmt = "UPDATE Request SET status = ?, fee = ?, quantity = ?, customer_id = ? WHERE id = ?";
    insert = [
      parseInt(req.body.status, 10),
      parseInt(req.body.fee, 10),
      parseInt(req.body.quantity, 10),
      req.body.customer_id,
      id
    ];
    query_stmt = mysql.format(query_stmt, insert);
    query = connection.query(query_stmt, function (error, result, fields) {
      if (error) {
        error_msg = error.sqlMessage;
        return res.status(400).send({
          error: error_msg
        });
      }

      query_stmt = "UPDATE Warehousing_Request SET warehouse_id = ?, start_date = ?, end_date = ? WHERE id = ?";
      insert = [
        req.body.warehouse_id,
        req.body.start_date,
        req.body.end_date,
        id
      ];
      query_stmt = mysql.format(query_stmt, insert);
      query = connection.query(query_stmt, function (error, result, fields) {
        if (error) {
          error_msg = error.sqlMessage;
          return res.status(400).send({
            error: error_msg
          });
        }

        return res.status(200).send({
          success: true
        });
      });
    });
  });
});

// PUT Create Insurance
warehousingRequestRouter.put('/insurance/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "SELECT insurance_type FROM Request WHERE id = " + connection.escape(id);
  var query = connection.query(query_stmt, function (error, result, fields) {
    if (error) {
      error_msg = error.sqlMessage;
      return res.status(400).send({
        error: error_msg
      });
    }

    if (result.length == 0) {
      return res.status(404).send({
        success: false,
        message: 'Warehousing Request does not exist'
      });
    } else {
      if (result[0]['insurance_type'] == 1) {
        return res.status(201).send({
          success: true,
          message: 'Your request already have insurance'
        });
      }
    }

    query_stmt = "UPDATE Request SET insurance = 1 WHERE id = ?";
    query_stmt = mysql.format(query_stmt, insert);
    query = connection.query(query_stmt, function (error, result, fields) {
      if (error) {
        error_msg = error.sqlMessage;
        return res.status(400).send({
          error: error_msg
        });
      }

      return res.status(200).send({
        success: true,
        message: 'Insurance successfully created on request'
      });
    });
  });
});

// DELETE Warehousing Request
warehousingRequestRouter.delete('/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "DELETE FROM Warehousing_Request WHERE id = " + connection.escape(id);
  var query = connection.query(query_stmt, function (error, result, fields) {
    if (error) {
      error_msg = error.sqlMessage;
      return res.status(400).send({
        error: error_msg
      });
    }

    query_stmt = "DELETE FROM Request WHERE id = " + connection.escape(id);
    query = connection.query(query_stmt, function (error, result, fields) {
      if (error) {
        error_msg = error.sqlMessage;
        return res.status(400).send({
          error: error_msg
        });
      }

      return res.status(200).send({
        success: true
      });
    });
  });
});

module.exports = warehousingRequestRouter;