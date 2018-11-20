const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mysqlConfig = require('./mysql-conf');
const uuidv4 = require('uuid/v4');

const connection = mysql.createConnection(mysqlConfig);
connection.connect();

// Parse incoming requests data
var invoiceRouter = express.Router();
invoiceRouter.use(bodyParser.json());
invoiceRouter.use(bodyParser.urlencoded({ extended: false }));

// Invoice CRUD Operation

// Invoice Schema
// id : string
// amount : int
// request_id : string
// customer_id : string

// GET Invoice
invoiceRouter.get('/', function (req, res) {
  var query_stmt = "SELECT * FROM Invoice";
  var query = connection.query(query_stmt, function (error, result, fields) {
    if (error) {
      error_msg = error.sqlMessage;
      return res.status(400).send({
        error: error_msg
      });
    }

    return res.status(200).send({
      success: true,
      result: result
    });
  });
});

// GET Invoice /:id
invoiceRouter.get('/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "SELECT * FROM Invoice WHERE id = " + connection.escape(id);
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
        message: 'Invoice does not exist'
      });
    } else {
      return res.status(200).send({
        success: true,
        result: result[0]
      });
    }
  });
});

// POST Invoice
invoiceRouter.post('/', function (req, res) {
  const id = uuidv4();
  var query_stmt = "INSERT INTO Invoice SET id = ?, amount = ?, request_id = ?, customer_id = ?";
  var insert = [id, parseInt(req.body.amount, 10), req.body.request_id, req.body.customer_id];
  query_stmt = mysql.format(query_stmt, insert);
  var query = connection.query(query_stmt, function (error, result, fields) {
    if (error) {
      error_msg = error.sqlMessage;
      return res.status(400).send({
        error: error_msg
      });
    }

    return res.status(200).send({
      success: true,
      id: id
    });
  });
});

// PUT Invoice
invoiceRouter.put('/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "SELECT * FROM Invoice WHERE id = " + connection.escape(id);
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
        message: 'Invoice does not exist'
      });
    }

    query_stmt = "UPDATE Invoice SET amount = ?, request_id = ?, customer_id = ? WHERE id = ?";
    var insert = [parseInt(req.body.amount, 10), req.body.request_id, req.body.customer_id, id];
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

// DELETE Invoice
// Invoice cannot be deleted

module.exports = invoiceRouter;