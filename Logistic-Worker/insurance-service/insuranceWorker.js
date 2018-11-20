const { Client, logger, Variables } = require('camunda-external-task-client-js');
const request = require('request');

const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };

const client = new Client(config);

client.subscribe('create_insurance', async function ({ task, taskService }) {
  let id = task.variables.get('request_id');

  const headers = {
    'Content-Type': 'application/json'
  }

  const options = {
    url: 'http://127.0.0.1:3000/api/v1/request/insurance/' + id,
    method: 'PUT',
    headers: headers
  }

  request(options, function (error, response, body) {
    if (error) return error;

    if (response.statusCode == 200) {
      console.log('Insurance Created');
      console.log('Request Id = ' + id);
    } else if (response.statusCode == 201) {
      console.log('Request Already Created');
    } else {
      console.log('Request Failed to Create');
    }
    taskService.complete(task);
  });
});

client.subscribe('check_warehouse', async function ({ task, taskService }) {
  let id = task.variables.get('request_id');
  console.log('Checking Warehouse Condition in request ' + id);
  taskService.complete(task);
});

client.subscribe('continue_shipping', async function ({ task, taskService }) {
  let id = task.variables.get('request_id');

  let processVariables = new Variables();
  processVariables.set('checkpoint', true);
  processVariables.set('destination', false);

  console.log('Shipping Continue in request ' + id);
  taskService.complete(task, processVariables);
});

client.subscribe('check_shipment_condition', async function ({ task, taskService }) {
  let id = task.variables.get('request_id');

  let processVariables = new Variables();
  processVariables.set('destination', true);

  console.log('Checking Shipment Condition in request ' + id);
  taskService.complete(task, processVariables);
});

