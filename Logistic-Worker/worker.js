const { Client, logger } = require('camunda-external-task-client-js');
const http =require('http');

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'charge-card'
client.subscribe('test', async function({ task, taskService }) {
  // Put your business logic here

  // Get a process variable
  const name = task.variables.get('name');
  const item = task.variables.get('item');

  http.get('http://localhost:3000/api/v1/customer/1', (resp) => {
	  let data = '';

	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
	    data += chunk;
	  });

	  // The whole response has been received. Print out the result.
	  resp.on('end', () => {
	  	console.log(data);
	    console.log(JSON.parse(data).explanation);
	  });

	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});

  // console.log(`Charging credit card with an amount of ${amount}€ for the item '${item}'...`);

  console.log(`test aja, si ${name} membeli ${item}`);

  // Complete the task
  await taskService.complete(task);
});

