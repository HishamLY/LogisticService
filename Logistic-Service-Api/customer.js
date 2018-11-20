const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mysqlConfig = require('./mysql-conf');
const uuidv4 = require('uuid/v4');

const connection = mysql.createConnection(mysqlConfig);
connection.connect();

// Parse incoming requests data
var customerRouter = express.Router();
customerRouter.use(bodyParser.json());
customerRouter.use(bodyParser.urlencoded({ extended: false }));

// Customer CRUD Operation

// Customer Schema
// id : string
// name : string
// customer_type : int
// address : string

// GET Customer
customerRouter.get('/', function (req, res) {
  var query_stmt = "SELECT * FROM Customer";
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

// GET Customer /:id
customerRouter.get('/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "SELECT * FROM Customer WHERE id = " + connection.escape(id);
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
        message: 'Customer does not exist'
      });
    } else {
      return res.status(200).send({
        success: true,
        result: result[0]
      });
    }
  });
});

// POST Customer
customerRouter.post('/', function (req, res) {
  const id = uuidv4();
  var query_stmt = "INSERT INTO Customer SET id = ?, name = ?, customer_type = ?, address = ?";
  var insert = [id, req.body.name, parseInt(req.body.customer_type, 10), req.body.address];
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

// PUT Customer
customerRouter.put('/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "SELECT * FROM Customer WHERE id = " + connection.escape(id);
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
        message: 'Customer does not exist'
      });
    }

    query_stmt = "UPDATE Customer SET name = ?, customer_type = ?, address = ? WHERE id = ?";
    var insert = [req.body.name, parseInt(req.body.customer_type, 10), req.body.address, id];
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

// DELETE Customer
customerRouter.delete('/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "DELETE FROM Customer WHERE id = " + connection.escape(id);
  var query = connection.query(query_stmt, function (error, result, fields) {
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

module.exports = customerRouter;