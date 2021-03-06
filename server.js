const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {  app.use(express.static(path.join(__dirname, 'client/build')));  
app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html'));})
app.listen(port, (req, res) => {  console.log( `server listening on port: ${port}`);})}