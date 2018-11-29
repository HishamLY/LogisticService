const express = require('express');
const courierRouter = require('./routes/courierRouter');
const customerRouter = require('./routes/customerRouter');
const invoiceRouter = require('./routes/invoiceRouter');
const warehouseRouter = require('./routes/warehouseRouter');
const requestRouter = require('./routes/requestRouter');
const shippingRequestRouter = require('./routes/shippingRequestRouter');
const warehousingRequestRouter = require('./routes/warehousingRequestRouter')

const app = express();

const apiVersion = '/api/v1';

app.use(apiVersion + '/invoice', invoiceRouter);
app.use(apiVersion + '/customer', customerRouter);
app.use(apiVersion + '/courier', courierRouter);
app.use(apiVersion + '/warehouse', warehouseRouter);
app.use(apiVersion + '/request', requestRouter);
app.use(apiVersion + '/shipping-request', shippingRequestRouter);
app.use(apiVersion + '/warehousing-request', warehousingRequestRouter);

module.exports = app