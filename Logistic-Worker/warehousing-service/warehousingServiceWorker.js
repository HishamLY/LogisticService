const { Variables } = require('camunda-external-task-client-js');
const request = require('request');

async function createWarehousingRequest({ task, taskService }) {
  let status = task.variables.get('status');
  let fee = task.variables.get('fee');
  let quantity = task.variables.get('quantity');
  let customerId = task.variables.get('customerId');
  let warehouseId = task.variables.get('warehouseId');
  let startDate = task.variables.get('startDate');
  let endDate = task.variables.get('endDate');

  let processVariables = new Variables();

  processVariables.set('status', status);
  processVariables.set('fee', fee);
  processVariables.set('quantity', quantity);
  processVariables.set('customerId', customerId);
  processVariables.set('warehouseId', warehouseId);
  processVariables.set('startDate', startDate);
  processVariables.set('endDate', endDate);

  const requestJSON = {
    status: status,
    fee: fee,
    quantity: quantity,
    customerId: customerId,
    warehouseId: warehouseId,
    startDate: startDate,
    endDate: endDate
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

    if (response.statusCode == 201) {
      console.log('Warehousing Request Created');
      var id = body.id;
      processVariables.set('requestId', id);
      console.log('Request Id = ' + id);
    } else {
      console.log('Warehousing Request Failed to Create');
    }
    taskService.complete(task, processVariables);
  });
}

async function bookWarehouse({ task, taskService }) {
  const warehouseId = task.variables.get('warehouseId');
  console.log(`Warehousing Request served at warehouse ${warehouseId}`)
  taskService.complete(task);
}

async function createWarehousingInvoices({ task, taskService }) {
  let amount = task.variables.get('fee');
  let requestId = task.variables.get('requestId');
  console.log(requestId);
  let customerId = task.variables.get('customerId');

  let processVariables = new Variables();

  processVariables.set('amount', amount);
  
  const requestJSON = {
    amount: amount,
    requestId: requestId,
    customerId: customerId,
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

    if (response.statusCode == 201) {
      console.log('Invoice Created');
      var id = body.id;
      processVariables.set('invoiceId', id);
      console.log('Invoice Id = ' + id);
    } else {
      console.log('Invoice Failed to Create');
    }
    // Send invoice via email to customer
    taskService.complete(task, processVariables);
  });
}

async function notifyPayment({ task, taskService }) {
  const invoiceId = task.variables.get('invoiceId');
  console.log(`Invoice with id ${invoice_id} is sent to customer`)
  // Notify payment via email to customer
  taskService.complete(task);
}

module.exports = {
  createWarehousingRequest,
  bookWarehouse,
  createWarehousingInvoices,
  notifyPayment
}