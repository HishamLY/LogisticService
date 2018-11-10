const app = require('./app');

const port = 3000;

var server = app.listen(port, () => {
  console.log('Server running');
});

// API ping test
app.get('/ping', function (req, res) {
  res.status(201);
  res.json({
    text: "pong"
  });
  res.end();
});


