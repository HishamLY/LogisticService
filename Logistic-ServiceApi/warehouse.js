const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mysqlConfig = require('./mysql-conf');

const connection = mysql.createConnection(mysqlConfig);
connection.connect();

// Parse incoming requests data
var warehouseRouter = express.Router();
warehouseRouter.use(bodyParser.json());
warehouseRouter.use(bodyParser.urlencoded({ extended: false }));

// Warehouse CRUD Operation

// Warehouse Schema
// id : string
// address : string
// capacity : int
// availability : int

// GET Warehouse
warehouseRouter.get('/', function (req, res) {
  var query_stmt = "SELECT * FROM Warehouse";
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

// GET Warehouse /:id
warehouseRouter.get('/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "SELECT * FROM Warehouse WHERE id = " + connection.escape(id);
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
        message: 'Warehouse does not exist'
      });
    } else {
      return res.status(200).send({
        success: true,
        result: result
      });
    }
  });
});

// POST Warehouse
warehouseRouter.post('/', function (req, res) {
  var query_stmt = "INSERT INTO Warehouse SET id = ?, address = ?, capacity = ?, availability = ?";
  var insert = [req.body.id, req.body.address, parseInt(req.body.capacity, 10), parseInt(req.body.availability, 10)];
  query_stmt = mysql.format(query_stmt, insert);
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

// PUT Warehouse
warehouseRouter.put('/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "SELECT * FROM Warehouse WHERE id = " + connection.escape(id);
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
        message: 'Warehouse does not exist'
      });
    }

    query_stmt = "UPDATE Warehouse SET address = ?, capacity = ?, availability = ?";
    var insert = [req.body.address, parseInt(req.body.capacity, 10), parseInt(req.body.availability, 10)];
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

// DELETE Warehouse
warehouseRouter.delete('/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "DELETE FROM Warehouse WHERE id = " + connection.escape(id);
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

module.exports = warehouseRouter;