const { Client, logger, Variables } = require('camunda-external-task-client-js');
const request = require('request');

const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };

const client = new Client(config);

client.subscribe('create_warehousing_request', async function ({ task, taskService }) {
  let status = task.variables.get('status');
  let fee = task.variables.get('fee');
  let quantity = task.variables.get('quantity');
  let customer_id = task.variables.get('customer_id');
  let warehouse_id = task.variables.get('warehouse_id');
  let start_date = task.variables.get('start_date');
  let end_date = task.variables.get('end_date');

  let processVariables = new Variables();

  processVariables.set('status', status);
  processVariables.set('fee', fee);
  processVariables.set('quantity', quantity);
  processVariables.set('customer_id', customer_id);
  processVariables.set('warehouse_id', warehouse_id);
  processVariables.set('start_date', start_date);
  processVariables.set('end_date', end_date);

  const requestJSON = {
    status: status,
    fee: fee,
    quantity: quantity,
    customer_id: customer_id,
    warehouse_id: warehouse_id,
    start_date: start_date,
    end_date: end_date
  }

  const headers = {
    'Content-Type': 'application/json'
  }

  const options = {
    url: 'http://127.0.0.1:3000/api/v1/warehousing-request/',
    method: 'POST',
    headers: headers,
    json: requestJSON
  }

  request(options, function (error, response, body) {
    if (error) return error;

    if (response.statusCode == 200) {
      console.log('Warehousing Request Created');
      var id = body.id;
      processVariables.set('request_id', id);
      console.log('Request Id = ' + id);
    } else {
      console.log('Warehousing Request Failed to Create');
    }
    taskService.complete(task, processVariables);
  });
});

client.subscribe('book_warehouse', async function ({ task, taskService }) {
  const warehouse_id = task.variables.get('warehouse_id');
  console.log(`Warehousing Request served at warehouse ${warehouse_id}`)
  taskService.complete(task);
});

client.subscribe('create_warehousing_invoices', async function ({ task, taskService }) {
  let amount = task.variables.get('fee');
  let request_id = task.variables.get('request_id');
  console.log(request_id);
  let customer_id = task.variables.get('customer_id');

  let processVariables = new Variables();

  processVariables.set('amount', amount);
  // processVariables.set('request_id', request_id);
  // processVariables.set('customer_id', customer_id);
  
  const requestJSON = {
    amount: amount,
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

  request(options, function (error, response, body) {
    if (error) return error;

    if (response.statusCode == 200) {
      console.log('Invoice Created');
      var id = body.id;
      processVariables.set('invoice_id', id);
      console.log('Invoice Id = ' + id);
    } else {
      console.log('Invoice Failed to Create');
    }
    taskService.complete(task, processVariables);
  });
});

// client.subscribe('notify_payment', async function ({ task, taskService }) {
//   const invoice_id = task.variables.get('invoice_id');
//   console.log(`Invoice with id ${invoice_id} is sent to customer`)
//   taskService.complete(task);
// });