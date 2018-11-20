const { Client, logger } = require('camunda-external-task-client-js');
const request = require('request');

const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };

const client = new Client(config);

client.subscribe('payment_process', async function ({ task, taskService }) {
  taskService.complete(task);
});