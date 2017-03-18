'use strict';

const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
const petPath = path.join(__dirname, 'pets.json');


const morgan = require('morgan');
const bodyParser = require('body-parser');

// let petJSON = JSON.stringify(petPath);

app.use(morgan('short'));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);

app.get('/pets', (req, res) => {
  fs.readFile(petPath, 'utf8', (err, petData) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    res.send(petData);
  });
});

app.get('/pets/:id', (req, res) => {
  fs.readFile(petPath, 'utf8', (err, petJSON) => {
    if (err) {
      console.error(err.stack);
       return res.sendStatus(500);
    }
    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petJSON);

    if (id < 0 || id >= pets.length || Number(isNaN(id))) {
      res.sendStatus(404);
    }

    res.send(pets[id]);
  });
});

app.post('/pets', (req, res) => {
  if (req.body.name === '' || req.body.age === '' || req.body.kind === '' || isNaN(req.body.age)) {
    res.sendStatus(400);
  } else {

  fs.readFile(petPath, 'utf8', (err, petJSON) => {
    if (err) {
      console.error(err.stack);
      res.sendStatus(500);
    }

    let jData = JSON.parse(petJSON);
    jData.push(req.body);

    let petJson2 = JSON.stringify(jData);

    fs.writeFile(petPath, petJson2, (writeErr) => {
      console.error(writeErr);
    });

    res.set('Content-Type', 'application/json').send(req.body);
  });
  }
});


app.listen(app.get('port'), () => {
  console.log('Listening on port: ', app.get('port'));
});
