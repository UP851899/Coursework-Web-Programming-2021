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
  if (window.location.href.indexOf('/') > -1) {
    showFileNames();
  }
  if (window.location.href.indexOf('compare.html') > -1) {
    fileComparison();
  }
});

// ----------------------------- \\
// Compare files to show on page \\
// ----------------------------- \\

async function fileComparison() {
  const pathFetch = await fetch('/filepaths');
  let returnedPaths;
  if (pathFetch.ok) {
    returnedPaths = await pathFetch.json();
  } else {
    console.log('pathFetch failed');
    returnedPaths = undefined;
  }

  // Duplicate array for loop, shift for comparison
  const pathsCopy = [...returnedPaths];
  pathsCopy.shift();

  for (const x of returnedPaths) {
    for (const y of pathsCopy) {
      if (x.pathName === y.pathName) {
        continue;
      }
      let data = { fileOne: x.pathName, fileTwo: y.pathName };
      let postData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };

      let response = await fetch('/compareResults', postData);
      if (response.ok) {
        let percentResult = await response.json();
        percentResult = percentResult.toPrecision(3) * 100 + '%';
        // console.log(x.pathName + ' & ' + y.pathName + ' = ' + percentResult);
        addResults(x.pathName, y.pathName, percentResult);
      } else {
        console.log('No percentage found');
      }
    }
  }
  // After results, function to sort table High-to-Low
  sortTable();
}

// ------------------ \\
// Showing File Names \\
// ------------------ \\
async function showFileNames() {
  const ul = document.getElementById('my-files');

  // Query from database to get files names
  const names = await fetch('/filenames');
  let returnedNames;
  if (names.ok) {
    returnedNames = await names.json();
  } else {
    returnedNames = { msg: 'No names found' };
  }

  for (const names of returnedNames) {
    const li = document.createElement('li');
    // console.log(names.originalName); // test file name output
    li.appendChild(document.createTextNode(names.originalName));
    ul.appendChild(li);
  }
}

// --------------------------------- \\
// Adding comparison results to page \\
// --------------------------------- \\
function addResults(pathOne, pathTwo, result) {
  const table = document.getElementById('results');
  let fileOne = extractName(pathOne);
  let fileTwo = extractName(pathTwo);

  let newRow = table.insertRow(1);
  let cellOne = newRow.insertCell(0);
  let cellTwo = newRow.insertCell(1);
  let cellThree = newRow.insertCell(2);

  cellOne.innerHTML = fileOne;
  cellTwo.innerHTML = fileTwo;
  cellThree.innerHTML = result;
}

function extractName(path) {
  let fileName = path.slice(6);
  return fileName;
}

// ------------------ \\
// Sorting HTML Table \\
// ------------------ \\
function sortTable() {
  let i, shouldSwitch;
  const table = document.getElementById('results');
  let switching = true;
  while (switching) {
    switching = false;
    let rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      let x = rows[i].getElementsByTagName('td')[2];
      let y = rows[i + 1].getElementsByTagName('td')[2];

      if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
