// Import module
const http = require('http');

// Import express application
const app = require('./app');

// Define port to use
let port = process.env.PORT || 8000;

// Create the server
const server = http.createServer(app);

// Activate the server
server.listen(port, console.log(`Server listening on port ${port}`));
