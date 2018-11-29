const express = require('express');
const bodyParser = require('body-parser');
const { Courier } = require('../sequelize');

var courierRouter = express.Router();
courierRouter.use(bodyParser.json());
courierRouter.use(bodyParser.urlencoded({ extended: false }));

// GET Courier
courierRouter.get('/', function (req, res) {
  Courier.findAll().then(couriers => {
    var msg = 'Success';
    return res.status(200).send({
      success: true,
      result: couriers,
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

// GET Courier /:id
courierRouter.get('/:id', function (req, res) {
  Courier.findById(req.params.id).then(courier => {
    var msg = '';
    if (courier == null) {
      msg = 'Courier does not exist';
    } else {
      msg = 'Success';
    }
    return res.status(200).send({
      success: true,
      result: courier,
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

// POST Courier
courierRouter.post('/', function (req, res) {
  Courier.create(req.body).then(courier => {
    return res.status(201).send({
      success: true,
      id: courier.id,
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

// PUT Courier
courierRouter.put('/:id', function (req, res) {
  Courier.update(
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

// DELETE Courier
courierRouter.delete('/:id', function (req, res) {
  Courier.destroy({
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

module.exports = courierRouter;