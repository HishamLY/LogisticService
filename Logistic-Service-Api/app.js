const express = require('express');
const courierRouter = require('./courier');
const customerRouter = require('./customer');
const invoiceRouter = require('./invoice');
const warehouseRouter = require('./warehouse');
const requestRouter = require('./request');
const shippingRequestRouter = require('./shippingRequest');
const warehousingRequestRouter = require('./warehousingRequest')

const app = express();

const apiVersion = '/api/v1';

app.use(apiVersion + '/invoice', invoiceRouter);
app.use(apiVersion + '/courier', courierRouter);
app.use(apiVersion + '/customer', customerRouter);
app.use(apiVersion + '/warehouse', warehouseRouter);
app.use(apiVersion + '/request', requestRouter);
app.use(apiVersion + '/shipping-request', shippingRequestRouter);
app.use(apiVersion + '/warehousing-request', warehousingRequestRouter);

module.exports = app