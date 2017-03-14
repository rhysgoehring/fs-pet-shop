'use strict'

const fs = require('fs');
const path = require('path');
const petsPath = path.join('../fs-pet-shop', 'pets.json');

let node = path.basename(process.argv[0]);
let file = path.basename(process.argv[1]);
let cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, petData) => {
    if (err) {
      throw err
    }

    let index = Number.parseInt(process.argv[3])
    let pets = JSON.parse(petData)


    if (Number.isNaN(index)) {
      console.log(pets)
      process.exit(1)
    }

    if (index > pets.length -1 || index < 0) {
      console.log(pets);
      console.error(`USAGE ${node} ${file} ${cmd} INDEX`)
      process.exit(1)
    }
    console.log(pets[index])
  });
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, petData) => {
    if (readErr) {
      throw readErr
    }

    let pets = JSON.parse(petData);
    let age = Number.parseInt(process.argv[3]);
    let kind = process.argv[4];
    let name = process.argv[5];

    if (Number.isNaN(age) || !kind || !name) {
      console.error(`USAGE: ${node} ${file} ${cmd} AGE KIND NAME`)
      process.exit(1)
    }

    let pet = {
      age,
      kind,
      name
    }
    pets.push(pet)
    let petsDataJSON = JSON.stringify(pets)

    fs.writeFile(petsPath, petsDataJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr
      }
      console.log(pet);
    });
  });
} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`)
  process.exit(1)
}
