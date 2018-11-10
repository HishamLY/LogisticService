const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mysqlConfig = require('./mysql-conf');

const connection = mysql.createConnection(mysqlConfig);
connection.connect();

// Parse incoming requests data
var courierRouter = express.Router();
courierRouter.use(bodyParser.json());
courierRouter.use(bodyParser.urlencoded({ extended: false }));

// Courier CRUD Operation

// Courier Schema
// id : string
// name : string
// courier_type : int

// GET Courier
courierRouter.get('/', function (req, res) {
  var query_stmt = "SELECT * FROM Courier";
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

// GET Courier /:id
courierRouter.get('/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "SELECT * FROM Courier WHERE id = " + connection.escape(id);
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
        message: 'Courier does not exist'
      });
    } else {
      return res.status(200).send({
        success: true,
        result: result
      });
    }
  });
});

// POST Courier
courierRouter.post('/', function (req, res) {
  var query_stmt = "INSERT INTO Courier SET id = ?, name = ?, courier_type = ?";
  var insert = [req.body.id, req.body.name, parseInt(req.body.courierType, 10)];
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

// PUT Courier
courierRouter.put('/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "SELECT * FROM Courier WHERE id = " + connection.escape(id);
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
        message: 'Courier does not exist'
      });
    }

    query_stmt = "UPDATE Courier SET name = ?, courier_type = ?";
    var insert = [req.body.name, parseInt(req.body.courierType, 10)];
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

// DELETE Courier
courierRouter.delete('/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "DELETE FROM Courier WHERE id = " + connection.escape(id);
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

module.exports = courierRouter;