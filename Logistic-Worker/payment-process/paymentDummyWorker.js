const { Client, logger } = require('camunda-external-task-client-js');
const request = require('request');

const config = { baseUrl: 'http://localhost:8080/engine-rest'};

const client = new Client(config);

client.subscribe('payment_process', async function ({ task, taskService }) {
  console.log('Payment success');
  taskService.complete(task);
});