const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mysqlConfig = require('./mysql-conf');
const uuidv4 = require('uuid/v4');

const connection = mysql.createConnection(mysqlConfig);
connection.connect();

var shippingRequestRouter = express.Router();
shippingRequestRouter.use(bodyParser.json());
shippingRequestRouter.use(bodyParser.urlencoded({ extended: false }));

// GET Shipping Request /:id
shippingRequestRouter.get('/:id', function (req, res) {
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
        message: 'Shipping Request does not exist'
      });
    } else {
      var request_result = result[0];
      query_stmt = "SELECT * FROM Shipping_Request WHERE id = " + connection.escape(id);
      query = connection.query(query_stmt, function (error, result, fields) {
        if (error) {
          error_msg = error.sqlMessage;
          return res.status(400).send({
            error: error_msg
          });
        }

        request_result['location'] = result['location'];
        request_result['weight'] = result['weight'];
        request_result['destination_address'] = result['destination_address'];
        request_result['courier_id'] = result['courier_id']
        
        return res.status(200).send({
          success: true,
          result: request_result
        });
      });
    }
  });
});

// GET Shipping Request Tracking
shippingRequestRouter.get('/tracking/:id', function (req, res) {
  const id = connection.escape(req.params.id);
  var query_stmt = "SELECT status, customer_id FROM Request WHERE id = " + id;
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
        message: 'Shipping Request does not exist'
      });
    } else {
      var request_result = result[0];
      query_stmt = "SELECT location, destination_address FROM Shipping_Request WHERE id = " + id;
      query = connection.query(query_stmt, function (error, result, fields) {
        if (error) {
          error_msg = error.sqlMessage;
          return res.status(400).send({
            error: error_msg
          });
        }
        request_result['location'] = result['location'];
        request_result['destination_address'] = result['destination_address'];

        return res.status(200).send({
          success: true,
          result: request_result
        });
      });
    }
  });
});

// POST Shipping Request
shippingRequestRouter.post('/', function (req, res) {
  var id = uuidv4();
  var query_stmt = "INSERT INTO Request SET id = ?, status = ?, fee = ?, quantity = ?, customer_id = ?, request_type = ?";
  var insert = [
    id,
    parseInt(req.body.status, 10),
    parseInt(req.body.fee, 10),
    parseInt(req.body.quantity, 10),
    req.body.customer_id,
    0];
  query_stmt = mysql.format(query_stmt, insert);
  var query = connection.query(query_stmt, function (error, result, fields) {
    if (error) {
      error_msg = error.sqlMessage;
      return res.status(400).send({
        error: error_msg
      });
    }

    query_stmt = "INSERT INTO Shipping_Request SET id = ?, location = ?, weight = ?, destination_address = ?, courier_id = ?";
    insert = [
      id,
      req.body.location,
      parseFloat(req.body.weight),
      req.body.destination_address,
      req.body.courier_id,
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

// PUT Shipping Request
shippingRequestRouter.put('/:id', function (req, res) {
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
        message: 'Shipping Request does not exist'
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

      query_stmt = "UPDATE Shipping_Request SET location = ?, weight = ?, destination_address = ?, courier_id = ? WHERE id = ?";
      insert = [
        req.body.location,
        parseFloat(req.body.weight),
        req.body.destination_address,
        req.body.courier_id,
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
shippingRequestRouter.put('/insurance/:id', function (req, res) {
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
        message: 'Shipping_Request does not exist'
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

// DELETE Shipping Request
shippingRequestRouter.delete('/:id', function (req, res) {
  const id = req.params.id;
  var query_stmt = "DELETE FROM Shipping_Request WHERE id = " + connection.escape(id);
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

module.exports = shippingRequestRouter;