const express = require('express');
const bodyParser = require('body-parser');
const { Warehouse } = require('../sequelize');

var warehouseRouter = express.Router();
warehouseRouter.use(bodyParser.json());
warehouseRouter.use(bodyParser.urlencoded({ extended: false }));

// GET Warehouse
warehouseRouter.get('/', function (req, res) {
  Warehouse.findAll().then(warehouses => {
    var msg = 'Success';
    return res.status(200).send({
      success: true,
      result: warehouses,
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

// GET Warehouse /:id
warehouseRouter.get('/:id', function (req, res) {
  Warehouse.findById(req.params.id).then(warehouse => {
    var msg = '';
    if (warehouse == null) {
      msg = 'Warehouse does not exist';
    } else {
      msg = 'Success';
    }
    return res.status(200).send({
      success: true,
      result: warehouse,
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

// POST Warehouse
warehouseRouter.post('/', function (req, res) {
  Warehouse.create(req.body).then(warehouse => {
    return res.status(201).send({
      success: true,
      id: warehouse.id,
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

// PUT Warehouse
warehouseRouter.put('/:id', function (req, res) {
  Warehouse.update(
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

// DELETE Warehouse
warehouseRouter.delete('/:id', function (req, res) {
  Warehouse.destroy({
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

module.exports = warehouseRouter;