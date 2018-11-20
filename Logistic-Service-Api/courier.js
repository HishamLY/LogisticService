const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mysqlConfig = require('./mysql-conf');
const uuidv4 = require('uuid/v4');

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
        result: result[0]
      });
    }
  });
});

// POST Courier
courierRouter.post('/', function (req, res) {
  var id = uuidv4();
  var query_stmt = "INSERT INTO Courier SET id = ?, name = ?, courier_type = ?";
  var insert = [id, req.body.name, parseInt(req.body.courier_type, 10)];
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

    query_stmt = "UPDATE Courier SET name = ?, courier_type = ? WHERE id = ?";
    var insert = [req.body.name, parseInt(req.body.courier_type, 10), id];
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