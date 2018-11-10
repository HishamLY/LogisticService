const express = require('express');
const courierRouter = require('./courier');
const customerRouter = require('./customer');
const invoiceRouter = require('./invoice');
const warehouseRouter = require('./warehouse');

const app = express();

const apiVersion = '/api/v1';

app.use(apiVersion + '/invoice', invoiceRouter);
app.use(apiVersion + '/courier', courierRouter);
app.use(apiVersion + '/customer', customerRouter);
app.use(apiVersion + '/warehouse', warehouseRouter);

module.exports = app