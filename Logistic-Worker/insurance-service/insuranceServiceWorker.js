const { Variables } = require('camunda-external-task-client-js');
const request = require('request');

async function createInsurance({ task, taskService }) {
  let id = task.variables.get('requestId');

  let processVariables = new Variables();

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
    } else if (response.statusCode == 204) {
      console.log('Request Already Created');
    } else {
      console.log('Request Failed to Create');
    }

    request.get('http://127.0.0.1:3000/api/v1/request/' + id + '/type', function(error, response, body) {
      if (error) return error;

      bodyJSON = JSON.parse(body)
      var shipping = false;
      if (bodyJSON.type == 'shipping') {
        shipping = true;
      }
      
      console.log('Shipping = ' + shipping);
      processVariables.set('shipping', shipping);

      taskService.complete(task, processVariables);
    });
  });
}

async function checkWarehouse({ task, taskService }) {
  let id = task.variables.get('requestId');
  console.log('Checking Warehouse Condition in request ' + id);
  taskService.complete(task);
}

async function continueShipping({ task, taskService }) {
  let id = task.variables.get('requestId');

  console.log('Shipping Continue in request ' + id);
  taskService.complete(task);
}

module.exports = {
  createInsurance,
  checkWarehouse,
  continueShipping
}
