let http = require('http');
let path = require('path');
let fs   = require('fs');

let petsPath = path.join(__dirname, 'pets.json');
let port = process.env.PORT || 8000;
let petsStr = JSON.stringify(petsPath);

let server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/pets'){
      fs.readFile(petsPath, function(err, petsStr) {
        if (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        return res.end("Not Found");
      }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(petsStr);
      })
  }
  else if (req.method === 'GET' && req.url === '/pets/0'){
      fs.readFile(petsPath, function(err, petsStr) {
        if (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Not Found');
      }
        res.statusCode = 200;
        let pet = JSON.parse(petsStr);
        let petParse = JSON.stringify(pet[0])
        res.setHeader('Content-Type', 'application/json');
        res.end(petParse);
      })
  }
  else if (req.method === 'GET' && req.url === '/pets/1'){
      fs.readFile(petsPath, function(err, petsStr) {
        if (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Not Found');
      }
        res.statusCode = 200;
        let pet = JSON.parse(petsStr);
        let petParse = JSON.stringify(pet[1])
        res.setHeader('Content-Type', 'application/json');
        res.end(petParse);
      })
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('Not Found');
  }
})
server.listen(port, function() {
  console.log('listening on port', port);
})
module.exports = server;
