const express = require('express');
const bodyParser = require('body-parser');
const { Request } = require('../sequelize');

var requestRouter = express.Router();
requestRouter.use(bodyParser.json());
requestRouter.use(bodyParser.urlencoded({ extended: false }));

// GET Request
requestRouter.get('/', function (req, res) {
  Request.findAll().then(requests => {
    var msg = 'Success';
    return res.status(200).send({
      success: true,
      result: requests,
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

// Get Request type
requestRouter.get('/:id/type', function (req, res) {
  Request.findById(req.params.id).then(request => {
    var msg = '';
    var type = 'undefined';
    if (request == null) {
      msg = 'Request does not exist';
    } else {
      msg = 'Success';
      switch (request.type) {
        case 0:
          type = 'shipping';
          break;
        case 1:
          type = 'warehousing';
          break;
      }
    }
    return res.status(200).send({
      success: true,
      type: type,
      message: msg
    });
  }).catch(err => {
    return res.status(400).send({
      success: false,
      type: 'undefined',
      message: 'Error happened'
    });
  });
});

// PUT Create Insurance
requestRouter.put('/insurance/:id', function (req, res) {
  Request.findById(req.params.id).then(request => {
    if (request == null) {
      var msg = 'Request does not exist';
      return res.status(200).send({
        success: true,
        result: [],
        message: msg
      });
    } else {
      if (request.insuranceType == 1) {
        var msg = 'Request already have insurance';
        return res.status(204).send({
          success: true,
          result: [],
          message: msg
        });
      }
    }
    
    Request.update(
      { insuranceType: 1 },
      { where: { id: req.params.id } }
    ).then(() => {
      var msg = 'Insurance successfully added on request';
      return res.status(200).send({
        success: true,
        result: [],
        message: msg
      });
    })
  });
});

module.exports = requestRouter;