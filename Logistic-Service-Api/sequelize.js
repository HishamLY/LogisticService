const Sequelize = require('sequelize');
const dbConfig = require('./config/dbConfig');
const CustomerModel = require('./models/customer');
const CourierModel = require('./models/courier');
const InvoiceModel = require('./models/invoice');
const WarehouseModel = require('./models/warehouse');
const RequestModel = require('./models/request');
const ShippingRequestModel = require('./models/shippingRequest');
const WarehousingRequestModel = require('./models/warehousingRequest');

const sequelize = new Sequelize(dbConfig.database,  dbConfig.username, dbConfig.password, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Customer = CustomerModel(sequelize, Sequelize);
const Courier = CourierModel(sequelize, Sequelize);
const Invoice = InvoiceModel(sequelize, Sequelize);
const Warehouse = WarehouseModel(sequelize, Sequelize);
const Request = RequestModel(sequelize, Sequelize);
const ShippingRequest = ShippingRequestModel(sequelize, Sequelize);
const WarehousingRequest = WarehousingRequestModel(sequelize, Sequelize);

module.exports = {
  Customer,
  Courier,
  Invoice,
  Warehouse,
  Request,
  ShippingRequest,
  WarehousingRequest
}