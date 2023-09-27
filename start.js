const fs = require('fs');
const http = require('http');
const express = require('express');
const app = new express();

app.get('/', function(request, response){
    response.sendFile('absolutePathToYour/htmlPage.html');
});

// Create a new web server
const server = http.createServer((req, res) => {
  // Get the current time
  const now = new Date();

  // Write the current time to the response body
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('The current time is: ' + now);
  res.end();
});

// Start the web server
server.listen(3000, () => {
  console.log('Server started on port 3000');
});