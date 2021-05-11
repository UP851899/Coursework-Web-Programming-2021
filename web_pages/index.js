/* eslint-disable prefer-const */
'use strict';

// EventListener for entire webpage - if dropped on wrong location
window.addEventListener('load', () => {
  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  document.addEventListener('drop', (e) => {
    e.preventDefault();
  });
  // Load file names from database
  getFileNames();
  if (window.location.href.indexOf('compare.html') > -1) {
    fileComparison();
  }
});

async function getFileNames() {
  const names = await fetch('/filenames');
  let returnedNames;
  if (names.ok) {
    returnedNames = await names.json();
  } else {
    returnedNames = { msg: 'No names found' };
  }
  for (const names of returnedNames) {
    console.log(names.originalName);
  }
}

async function fileComparison() {
  const pathFetch = await fetch('/filepaths');
  let returnedPaths;
  if (pathFetch.ok) {
    returnedPaths = await pathFetch.json();
  } else {
    console.log('pathFetch failed');
    returnedPaths = undefined;
  }

  const pathsCopy = [...returnedPaths];
  pathsCopy.shift();

  for (const x of returnedPaths) {
    for (const y of pathsCopy) {
      let data = { fileOne: x.pathName, fileTwo: y.pathName };
      let postData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };

      let response = await fetch('/compareResults', postData);
      if (response.ok) {
        let percentResult = await response.json();
        percentResult = percentResult * 100 + '%';
        console.log(x.pathName + ' & ' + y.pathName + ' = ' + percentResult);
      } else {
        console.log('No percentage found');
      }
    }
  }
}
