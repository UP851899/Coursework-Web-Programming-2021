'use strict';

// EventListener for entire webpage - if dropped on wrong location
window.addEventListener('load', () => {
  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  document.addEventListener('drop', (e) => {
    e.preventDefault();
  });
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

// Load file names from database
window.addEventListener('load', () => {
  getFileNames();
});
