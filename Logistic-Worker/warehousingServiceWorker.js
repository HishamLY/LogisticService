const { Client, logger } = require('camunda-external-task-client-js');
const request = require('request');

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

client.subscribe('create_warehousing_request', async function({task, taskService}) {
  var customer_data = {};
  request.get('http://localhost:3000/api/v1/customer/1', function(error, response, body) {
    if (error) return error;
    
    if (response.statusCode == 200) {
      var responseJSON = JSON.parse(body);
      customer_data = responseJSON.result;
      console.log(customer_data);
    }
  });
  const status = 0;
  const fee = 1200000;
  const quantity = 10000;
  const warehouse_id = '1';
  const start_date = '2018-10-11';
  const end_date = '2018-11-11';
  requestJSON = {
    status: status,
    fee: fee,
    quantity: quantity,
    customer_id: customer_data['id'],
    warehouse_id: warehouse_id,
    start_date: start_date,
    end_date: end_date
  }

  request.post({
    url: 'http://localhost:3000/api/v1/warehousing-request/',
    method: 'POST',
    json: requestJSON
  }, function(error, response, body) {
    if (error) return error;

    if (response.statusCode == 200) {
      console.log('Request successfull');
      responseJSON = JSON.parse(body);
      var id = responseJSON.id;
      console.log('Request Id = ' + id);
    }
  });

  await taskService.complete(task);
});

client.subscribe('create_warehousing_request', async function ({ task, taskService }) {

  await taskService.complete(task);
});

client.subscribe('book_warehouse', async function ({ task, taskService }) {

  await taskService.complete(task);
});