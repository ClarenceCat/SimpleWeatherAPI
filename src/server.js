// file: server.js
// description: this file initializes the database used in the application, and starts the server.
// programmer: Daniel Grew
// Date Last Modified: 2021-05-14

// required modules
const express = require('express');

const app = express();

app.use(express.json());


// create middleware to log all requests
app.use((req, res) => {
    // log the route requested by what IP address with the date and time stamp
})

const port = process.env.PORT || 5000;

// start the server listening on the designated port
// export so that the server can be tested
module.exports = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})