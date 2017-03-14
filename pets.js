'use strict'

const fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0])
const file = path.basename(process.argv[1])
const cmd = process.argv[2]

fs.readFile(petsPath, 'utf8', function(err, data){
  if (err) {
    throw err;
  }
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);

});
