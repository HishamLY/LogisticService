const { 
        createShipment,
        createShippingInvoices,
        notifyPayment,
        sendToDestination
      } = require('./shipping-service/shippingServiceWorker');

const {
        createWarehousingRequest,
        bookWarehouse,
        createWarehousingInvoices,
      } = require('./warehousing-service/warehousingServiceWorker');

const {
        createInsurance,
        checkWarehouse,
        continueShipping
      } = require('./insurance-service/insuranceServiceWorker');

const { Client, logger } = require('camunda-external-task-client-js');
const config = { baseUrl: 'http://localhost:8080/engine-rest' };
const client = new Client(config);

// Shipping Service

client.subscribe('create_shipment', createShipment);
client.subscribe('create_shipping_invoices', createShippingInvoices);
client.subscribe('notify_shipping_payment', notifyPayment);
client.subscribe('send_to_destination', sendToDestination);

// Warehousing Service

client.subscribe('create_warehousing_request', createWarehousingRequest);
client.subscribe('book_warehouse', bookWarehouse);
client.subscribe('notify_payment', notifyPayment);
client.subscribe('create_warehousing_invoices', createWarehousingInvoices);

// Insurance Service

client.subscribe('create_insurance', createInsurance);
client.subscribe('check_warehouse', checkWarehouse);
client.subscribe('continue_shipping', continueShipping);