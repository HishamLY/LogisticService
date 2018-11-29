const { Variables } = require('camunda-external-task-client-js');
const request = require('request');

async function createShipment({ task, taskService }) {
  let status = 0;
  let fee = task.variables.get('fee');
  let quantity = task.variables.get('quantity');
  let customerId = task.variables.get('customerId');
  let location = task.variables.get('location');
  let weight = task.variables.get('weight');
  let destinationAddress = task.variables.get('destinationAddress');
  let courierId = task.variables.get('courierId');

  let processVariables = new Variables();

  processVariables.set('status', status);
  processVariables.set('fee', fee);
  processVariables.set('quantity', quantity);
  processVariables.set('customerId', customerId);
  processVariables.set('location', location);
  processVariables.set('weight', weight);
  processVariables.set('destinationAddress', destinationAddress);
  processVariables.set('courierId', courierId);

  const requestJSON = {
    status: status,
    fee: fee,
    quantity: quantity,
    customerId: customerId,
    location: location,
    weight: weight,
    destinationAddress: destinationAddress,
    courierId: courierId
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

  request(options, function (error, response, body) {
    if (error) return error;

    if (response.statusCode == 201) {
      console.log('Shipping Request Created');
      var id = body.id;
      processVariables.set('requestId', id);
      console.log('Request Id = ' + id);
    } else {
      console.log('Shipping Request Failed to Create');
    }
    taskService.complete(task, processVariables);
  });
}

async function createShippingInvoices({ task, taskService }) {
  let fee = task.variables.get('fee');
  let requestId = task.variables.get('requestId');
  let customerId = task.variables.get('customerId');

  let processVariables = new Variables();

  processVariables.set('fee', fee);
  processVariables.set('requestId', requestId);
  processVariables.set('customerId', customerId);
  
  const requestJSON = {
    amount: fee,
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
  const requestId = task.variables.get('requestId');

  console.log(`Invoice with id ${invoiceId} is sent to customer`);
  // Update Request Status
  const requestJSON = {
    status: 1
  }
  const headers = {
    'Content-Type': 'application/json'
  }
  const options = {
    url: 'http://127.0.0.1:3000/api/v1/shipping-request/' + requestId,
    method: 'PUT',
    headers: headers,
    json: requestJSON
  }

  request(options, function (error, response, body) {
    if (error) return error;

    if (response.statusCode == 200) {
      console.log('Shipping Status Updated');
    } else {
      console.log('Shipping Status Failed to Update');
    }
  });

  // Notify payment via email
  taskService.complete(task);
}

async function sendToDestination({task, taskService}) {
  const requestId = task.variables.get('requestId');
  console.log(`Shipping with id ${requestId} is sent to destination`);

  console.log(`Invoice with id ${invoiceId} is sent to customer`);
  // Update Request Status
  const requestJSON = {
    status: 2
  }
  const headers = {
    'Content-Type': 'application/json'
  }
  const options = {
    url: 'http://127.0.0.1:3000/api/v1/shipping-request/' + requestId,
    method: 'PUT',
    headers: headers,
    json: requestJSON
  }

  request(options, function (error, response, body) {
    if (error) return error;

    if (response.statusCode == 200) {
      console.log('Shipping Status Updated');
    } else {
      console.log('Shipping Status Failed to Update');
    }
  });

  taskService.complete(task);
}

module.exports = {
  createShipment,
  createShippingInvoices,
  notifyPayment,
  sendToDestination
}