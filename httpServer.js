'use strict';

let http = require('http');
let fs = require('fs');
let path = require('path');
let petPath = path.join(__dirname, 'pets.json');
let port = 8000;

let petJSON = JSON.stringify(petPath);

let server = http.createServer((req,res) => {
  if (req.method === 'GET' && req.url === '/pets') {
    fs.readFile(petPath, 'utf8', (err, petJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        return res.end("Requested URL not responding");
      }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(petJSON);
    })
  }
  else if (req.method === 'GET' && req.url === '/pets/0') {
    fs.readFile(petPath, 'utf8', (err, petJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'petJSON');
        return res.end("Requested URL not responding");
      }
      res.statusCode = 200;
      let pet = JSON.parse(petJSON);
      let petParse = JSON.stringify(pet[0]);
      res.setHeader('Content-Type', 'application/json');
      res.end(petParse);
    })
  }
  else if (req.method === 'GET' && req.url === '/pets/1'){
      fs.readFile(petPath, 'utf8', (err, petJSON) => {
        if (err) {
        console.error(err.stack);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Requested URL not responding');
      }
        res.statusCode = 200;
        let pet = JSON.parse(petJSON);
        let petParse = JSON.stringify(pet[1]);
        res.setHeader('Content-Type', 'application/json');
        res.end(petParse);
      });
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('Not Found');
  }
});

server.listen(port, () =>{
  console.log('Listening on port', port);
});
module.exports = server;
