const { Client, logger } = require('camunda-external-task-client-js');
const request = require('request');

const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };

const client = new Client(config);

client.subscribe('check_warehouse', async function ({ task, taskService }) {
    let id = task.variables.get('request_id');
    
    console.log('Checking Warehouse Condition in request ' + id);
});

client.subscribe('check_shipment_condition', async function ({ task, taskService }) {
    let id = task.variables.get('request_id');

          console.log('Checking Shipment Condition in request ' + id);
});

client.subscribe('continue_shipping', async function ({ task, taskService }) {
    let id = task.variables.get('request_id');

          console.log('Shipping Continue in request ' + id);
});

client.subscribe('create_insurance', async function ({ task, taskService }) {
    let id = task.variables.get('request_id');

    const headers = {
        'Content-Type': 'application/json'
       }

    const options = {
        url: 'http://127.0.0.1:3000/api/v1/request-insurance/'+id,
        method: 'PUT',
        headers: headers,
        json: requestJSON
    }

    request(options, function (error, response, body) {
        if (error) return error;
    
        if (response.statusCode == 200) {
          console.log('Insurance Created');
          responseJSON = JSON.parse(body);
          var id = responseJSON.id;
          processVariables.set('request_id', id);
          console.log('Request Id = ' + id);
        } else {
          console.log('Request Failed to Create');
        }
      });
});