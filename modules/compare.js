'use strict';
/* eslint-disable prefer-const */
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
// const fetch = require('node-fetch');
const fs = require('fs');
const stringSimilarity = require('string-similarity');

// Test run \\
export function compareTest() {
  const fileOne = fs.readFileSync('.\\files\\Test.txt', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('file read');
      return data;
    }
  });

  const fileTwo = fs.readFileSync('.\\files\\Test2.txt', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('file read');
      return data;
    }
  });

  const testValue = stringSimilarity.compareTwoStrings(fileOne, fileTwo);
  return testValue;
}

export function comparison(pathOne, pathTwo) {
  const test1 = fs.readFileSync('.\\' + pathOne, 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      return data;
    }
  });

  const test2 = fs.readFileSync('.\\' + pathTwo, 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      return data;
    }
  });

  const testValue = stringSimilarity.compareTwoStrings(test1, test2);
  return testValue;
}
