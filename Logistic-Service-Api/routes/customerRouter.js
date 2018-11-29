const express = require('express');
const bodyParser = require('body-parser');
const { Customer } = require('../sequelize');

var customerRouter = express.Router();
customerRouter.use(bodyParser.json());
customerRouter.use(bodyParser.urlencoded({ extended: false }));

// GET Customer
customerRouter.get('/', function(req, res) {
  Customer.findAll().then(customers => {
    var msg = 'Success';
    return res.status(200).send({
      success: true,
      result: customers,
      message: msg
    });
  }).catch(err => {
    return res.status(400).send({
      success: false,
      result: [],
      message: 'Error happened'
    });
  });
});

// GET Customer /:id
customerRouter.get('/:id', function(req, res) {
  Customer.findById(req.params.id).then(customer => {
    var msg = '';
    if (customer == null) {
      msg = 'Customer does not exist';
    } else {
      msg = 'Success';
    }
    return res.status(200).send({
      success: true,
      result: customer,
      message: msg
    });
  }).catch(err => {
    return res.status(400).send({
      success: false,
      result: [],
      message: 'Error happened'
    });
  });
});

// POST Customer
customerRouter.post('/', function(req, res) {
  Customer.create(req.body).then(customer => {
    return res.status(201).send({
      success: true,
      id: customer.id,
      message: 'Success'
    });
  }).catch(err => {
    return res.status(400).send({
      success: false,
      id: 0,
      message: 'Error happened'
    });
  });
});

// PUT Customer
customerRouter.put('/:id', function(req, res) {
  Customer.update(
    req.body,
    { where : { id: req.params.id } }
  ).then(affectedRows => {
    console.log(affectedRows);
    return res.status(200).send({
      success: true,
      result: [],
      message: 'Success'
    })
  }).catch(err => {
    return res.status(400).send({
      success: false,
      result: [],
      message: 'Error happened'
    });
  });
});

// DELETE Customer
customerRouter.delete('/:id', function (req, res) {
  Customer.destroy({
    where: {
      id: req.params.id
    }
  }).then(affectedRows => {
    console.log(affectedRows);
    return res.status(200).send({
      success: true,
      result: [],
      message: 'Success'
    });
  }).catch(err => {
    return res.status(400).send({
      success: false,
      result: [],
      message: 'Error happened'
    });
  });
});

module.exports = customerRouter;