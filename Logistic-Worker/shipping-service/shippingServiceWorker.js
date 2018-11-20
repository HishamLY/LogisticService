const { Client, logger, Variables } = require('camunda-external-task-client-js');
const request = require('request');

const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };

const client = new Client(config);

client.subscribe('create_shipment', async function ({ task, taskService }) {
  let status = task.variables.get('status');
  let fee = task.variables.get('fee');
  let quantity = task.variables.get('quantity');
  let customer_id = task.variables.get('customer_id');
  let location = task.variables.get('location');
  let weight = task.variables.get('weight');
  let destination_address = task.variables.get('destination_address');
  let courier_id = task.variables.get('courier_id');

  let processVariables = new Variables();

  processVariables.set('status', status);
  processVariables.set('fee', fee);
  processVariables.set('quantity', quantity);
  processVariables.set('customer_id', customer_id);
  processVariables.set('location', location);
  processVariables.set('weight', weight);
  processVariables.set('destination_address', destination_address);
  processVariables.set('courier_id', courier_id);

  const requestJSON = {
    status: status,
    fee: fee,
    quantity: quantity,
    customer_id: customer_id,
    request_id: request_id,
    location: location,
    weight: weight,
    destination_address: destination_address,
    courier_id: courier_id
  }

  const headers = {
    'Content-Type': 'application/json'
  }

  const options = {
    url: 'http://127.0.0.1:3000/api/v1/shipping-request/',
    method: 'POST',
    headers: headers,
    json: requestJSON
  }

  request.post(options, function (error, response, body) {
    if (error) return error;

    if (response.statusCode == 200) {
      console.log('Shipping Request Created');
      var id = body.id;
      processVariables.set('request_id', id);
      console.log('Request Id = ' + id);
    } else {
      console.log('Shipping Request Failed to Create');
    }
  });
  taskService.complete(task, processVariables);
});

client.subscribe('create_shipping_invoices', async function ({ task, taskService }) {
  let fee = task.variables.get('fee');
  let request_id = task.variables.get('request_id');
  let customer_id = task.variables.get('customer_id');

  let processVariables = new Variables();

  processVariables.set('fee', fee);
  processVariables.set('request_id', request_id);
  processVariables.set('customer_id', customer_id);
  
  const requestJSON = {
    fee: fee,
    request_id: request_id,
    customer_id: customer_id,
  }

  const headers = {
   'Content-Type': 'application/json'
  }

  const options = {
    url: 'http://127.0.0.1:3000/api/v1/invoice/',
    method: 'POST',
    headers: headers,
    json: requestJSON
  }

  request.post(options, function (error, response, body) {
    if (error) return error;

    if (response.statusCode == 200) {
      console.log('Invoice Created');
      var id = body.id;
      processVariables.set('invoice_id', id);
      console.log('Invoice Id = ' + id);
    } else {
      console.log('Invoice Failed to Create');
    }
  });

  taskService.complete(task, processVariables);
});

client.subscribe('notify_payment', async function ({ task, taskService }) {
  const invoice_id = task.variables.get('invoice_id');
  console.log(`Invoice with id ${invoice_id} is sent to customer`)
  taskService.complete(task);
});

client.subscribe('send_to_destination', async function ({task, taskService}) {
  console.log(`Shipping with id ${request_id} is sent to destination`)
});