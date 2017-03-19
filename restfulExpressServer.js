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
    res.setHeader('Content-Type', 'application/json');
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
  fs.readFile(petPath, 'utf8', (err, petData) => {
    if (err) {
      console.error(err.stack);
      res.sendStatus(500);
    }
    if (req.body.name === '' || req.body.age === '' || req.body.kind === '' || isNaN(req.body.age)) {
      return res.sendStatus(400);
    }
    let pets = JSON.parse(petData);
    let name = req.body.name;
    let age = Number.parseInt(req.body.age);
    let kind = req.body.kind;

    let pet = {
      age,
      kind,
      name
    }

    pets.push(pet);
    let petDataJson = JSON.stringify(pets);

    fs.writeFile(petPath, petDataJson, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
      res.send(pet);
    });
  });
});
app.patch('/pets/:id', (req, res) => {
  fs.readFile(petPath, 'utf8', (err, petData) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }


    let pets = JSON.parse(petData);
    let id = Number.parseInt(req.params.id);

    if (id < 0 || id >= pets.length || Number(isNaN(id))) {
      return res.sendStatus(400);
    }

    let age = Number.parseInt(req.body.age);
    let kind = req.body.kind;
    let name = req.body.name;

    if (age) {
      pets[id]["age"] = age;
    }
    if (name) {
      pets[id]["name"] = name;
    }
    if (kind) {
      pets[id]["kind"] = kind;
    }

    let petDataJson = JSON.stringify(pets);

    fs.writeFile(petPath, petDataJson, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
      res.send(pets[id]);
    });
  });
});

app.delete('/pets/:id', (req, res) => {
  fs.readFile(petPath, 'utf8', (err, petData) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let pets = JSON.parse(petData);
    let id = Number.parseInt(req.params.id);
    if (id < 0 || id >= pets.length || Number(isNaN(id))) {
      return res.sendStatus(400);
    }

    let deletedPet = pets.splice(id, 1);
    let petJson = JSON.stringify(deletedPet);

    fs.writeFile(petPath, petJson, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
      res.send(deletedPet[0]);
    });
  });
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(app.get('port'), () => {
  console.log('Listening on port: ', app.get('port'));
});

module.exports = app;
