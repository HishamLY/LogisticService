const express = require('express');
const bodyParser = require('body-parser');
const { Invoice } = require('../sequelize');

var invoiceRouter = express.Router();
invoiceRouter.use(bodyParser.json());
invoiceRouter.use(bodyParser.urlencoded({ extended: false }));

// GET Invoice
invoiceRouter.get('/', function (req, res) {
  Invoice.findAll().then(invoices => {
    var msg = 'Success';
    return res.status(200).send({
      success: true,
      result: invoices,
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

// GET Invoice /:id
invoiceRouter.get('/:id', function (req, res) {
  Invoice.findById(req.params.id).then(invoice => {
    var msg = '';
    if (invoice == null) {
      msg = 'Invoice does not exist';
    } else {
      msg = 'Success';
    }
    return res.status(200).send({
      success: true,
      result: invoice,
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

// POST Invoice
invoiceRouter.post('/', function (req, res) {
  Invoice.create(req.body).then(invoice => {
    return res.status(201).send({
      success: true,
      id: invoice.id,
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

// PUT Invoice
invoiceRouter.put('/:id', function (req, res) {
  Invoice.update(
    req.body,
    { where: { id: req.params.id } }
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

// DELETE Invoice
invoiceRouter.delete('/:id', function (req, res) {
  Invoice.destroy({
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

module.exports = invoiceRouter;