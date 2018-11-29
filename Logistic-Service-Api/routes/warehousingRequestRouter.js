const express = require('express');
const bodyParser = require('body-parser');
const { Request, WarehousingRequest } = require('../sequelize');

var warehousingRequestRouter = express.Router();
warehousingRequestRouter.use(bodyParser.json());
warehousingRequestRouter.use(bodyParser.urlencoded({ extended: false }));

// GET Warehousing Request /:id
warehousingRequestRouter.get('/:id', function (req, res) {
  WarehousingRequest.findById(req.params.id).then(warehousingRequest => {
    var msg = '';
    if (warehousingRequest == null) {
      msg = 'Request does not exist';

      return res.status(200).send({
        success: true,
        result: warehousingRequest,
        message: msg
      });
    } else {
      var result = {};
      result.id = warehousingRequest.id;
      result.warehouseId = warehousingRequest.warehouseId;
      result.startDate = warehousingRequest.startDate;
      result.endDate = warehousingRequest.endDate;
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
      result: [],
      message: 'Error happened'
    });
  });
});

// POST Warehousing Request
warehousingRequestRouter.post('/', function (req, res) {
  Request.create({
    id: req.body.id,
    status: req.body.status,
    fee: req.body.fee,
    quantity: req.body.quantity,
    customerId: req.body.customerId,
    type: 1
  }).then(request => {
    WarehousingRequest.create({
      id: request.id,
      warehouseId: req.body.warehouseId,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    }).then(warehousingRequest => {
      return res.status(201).send({
        success: true,
        id: warehousingRequest.id,
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

// PUT Warehousing Request
warehousingRequestRouter.put('/:id', function (req, res) {
  Request.create({
    status: req.body.status,
    fee: req.body.fee,
    quantity: req.body.quantity,
    customerId: req.body.customerId,
  }, {
    where: { id: req.params.id }
  }).then(affectedRows => {
    WarehousingRequest.create({
      warehouseId: req.body.warehouseId,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    }, {
      where: { id: req.params.id }
    }).then(warehousingRequest => {
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

// DELETE Warehousing Request
warehousingRequestRouter.delete('/:id', function (req, res) {
  Request.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    return WarehousingRequest.destroy({
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

module.exports = warehousingRequestRouter;