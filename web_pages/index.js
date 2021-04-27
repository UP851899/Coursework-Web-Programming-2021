'use strict';
const fileStorage = window.localStorage;

// eslint-disable-next-line no-unused-vars
function dropHandler(e) {
  console.log('File(s) have been dropped');

  if (e.dataTransfer.items) {
    // Access uploaded files (DataTransferItemList method)
    for (let i = 0; i < e.dataTransfer.items.length; i++) {
      if (e.dataTransfer.items[i].kind === 'file') {
        const file = e.dataTransfer.items[i].getAsFile();
        console.log('file[' + i + '].name = ' + file.name);
        localStorage.setItem(i, file);
      }
    }
  } else {
    // Access uploaded files (DataTransfer method)
    for (let i = 0; i < e.dataTransfer.items.length; i++) {
      console.log('file[' + i + '].name = ' + e.dataTransfer.files[i].name);
      localStorage.setItem('file', e.dataTransfer.files[i].name);
    }
  }
  const test = localStorage.getItem(1);
  window.alert(test.name);
}

// EventListener for entire webpage - if dropped on wrong location
window.addEventListener('load', () => {
  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  document.addEventListener('drop', (e) => {
    e.preventDefault();
  });
});