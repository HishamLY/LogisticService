const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mysqlConfig = require('./mysql-conf');

const connection = mysql.createConnection(mysqlConfig);
connection.connect();

// Parse incoming requests data
var requestRouter = express.Router();
requestRouter.use(bodyParser.json());
requestRouter.use(bodyParser.urlencoded({ extended: false }));

// GET Request
requestRouter.get('/', function (req, res) {
  var query_stmt = "SELECT * FROM Request";
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

// Get Request type
requestRouter.get('/:id/type', function(req, res) {
  var id = req.params.id;
  var query_stmt = "SELECT * FROM Request WHERE id = " + connection.escape(id);
  var query = connection.query(query_stmt, function(error, result, fields) {
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
        message: 'Request does not exist'
      });
    } else {
      var type = '';
      switch (result[0]['type']) {
        case 0:
          type = 'shipping';
          break;
        case 1:
          type = 'warehousing'
          break;
      }
      return res.status(200).send({
        success: true,
        result: {
          'type': type
        }
      });
    }
  });
});

// PUT Create Insurance
requestRouter.put('/insurance/:id', function (req, res) {
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

module.exports = requestRouter;