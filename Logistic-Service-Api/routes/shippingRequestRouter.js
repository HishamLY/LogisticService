const express = require('express');
const bodyParser = require('body-parser');
const { Request, ShippingRequest } = require('../sequelize');

var shippingRequestRouter = express.Router();
shippingRequestRouter.use(bodyParser.json());
shippingRequestRouter.use(bodyParser.urlencoded({ extended: false }));

// GET Shipping Request /:id
shippingRequestRouter.get('/:id', function (req, res) {
  ShippingRequest.findById(req.params.id).then(shippingRequest => {
    var msg = '';
    if (shippingRequest == null) {
      msg = 'Request does not exist';
      
      return res.status(200).send({
        success: true,
        result: shippingRequest,
        message: msg
      });
    } else {
      var result = {};
      result.id = shippingRequest.id;
      result.location = shippingRequest.location;
      result.weight = shippingRequest.weight;
      result.destinationAddress = shippingRequest.destinationAddress;
      result.courierId = shippingRequest.courierId;
      Request.findById(req.params.id).then(request => {
        result.status = request.status;
        result.fee = request.fee;
        result.quantity = request.quantity;
        result.customerId = request.customerId;
        result.insuranceType = request.insuranceType;
        result.type = request.type;
        msg = 'Success';
        return res.status(200).send({
          success: true,
          result: result,
          message: msg
        });
      });
    }
  }).catch(err => {
    return res.status(400).send({
      success: false,
      result: {},
      message: 'Error happened'
    });
  });
});

// GET Shipping Request Tracking
shippingRequestRouter.get('/tracking/:id', function (req, res) {
  ShippingRequest.findById(req.params.id).then(shippingRequest => {
    msg = 'Success';
    return res.status(200).send({
      success: true,
      result: shippingRequest,
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

// POST Shipping Request
shippingRequestRouter.post('/', function (req, res) {
  Request.create({
    id: req.body.id,
    status: req.body.status,
    fee: req.body.fee,
    quantity: req.body.quantity,
    customerId: req.body.customerId,
    type: 0
  }).then(request => {
    ShippingRequest.create({
      id: request.id,
      location: req.body.location,
      weight: req.body.weight,
      destinationAddress: req.body.destinationAddress,
      courierId: req.body.courierId
    }).then(shippingRequest => {
      return res.status(201).send({
        success: true,
        id: shippingRequest.id,
        message: 'Success'
      })
    }).catch(err => {
      return res.status(400).send({
        success: false,
        id: -1,
        message: 'Error happened'
      });
    });
  }).catch(err => {
    return res.status(400).send({
      success: false,
      id: -1,
      message: 'Error happened'
    });
  });
});

// PUT Shipping Request
shippingRequestRouter.put('/:id', function (req, res) {
  Request.update({
    status: req.body.status,
    fee: req.body.fee,
    quantity: req.body.quantity,
    customerId: req.body.customerId,
  }, {
    where: { id: req.params.id }
  }).then(affectedRows => {
    ShippingRequest.update({
      location: req.body.location,
      weight: req.body.weight,
      destinationAddress: req.body.destinationAddress,
      courierId: req.body.courierId
    }, {
      where: { id: req.params.id }
    }).then(affectedRows => {
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
  }).catch(err => {
    return res.status(400).send({
      success: false,
      result: [],
      message: 'Error happened'
    });
  });
});

// DELETE Shipping Request
shippingRequestRouter.delete('/:id', function (req, res) {
  Request.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    return ShippingRequest.destroy({
      where: {
        id: req.params.id
      }
    })
  }).then(affectedRows => {
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

module.exports = shippingRequestRouter;