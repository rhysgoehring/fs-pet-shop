'use strict';

const fs = require('fs');
const path = require('path');
const petPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();
let port = 8000;

let petJSON = JSON.stringify(petPath);

app.get('/pets', (req, res) => {
    fs.readFile(petPath, 'utf8', (err, petJSON) => {
      if (err) {
        console.error(err.stack);
        res.sendStatus(500);
      }

      let pets = JSON.parse(petJSON);
      res.send(pets);
    });
});

app.get('/pets/:id', (req,res) => {
  fs.readFile(petPath, 'utf8', (err, petJSON) => {
    if (err) {
      console.error(err.stack);
      res.sendStatus(500);
    }

    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }


    res.send(pets[id]);
  });
});

app.listen(port, () => {
  console.log('Listening on port: ', port);
});
