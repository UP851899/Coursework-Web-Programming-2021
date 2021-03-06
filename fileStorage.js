/* eslint-disable prefer-const */
// import { open } from 'sqlite';
import { createRequire } from 'module';
import sqlite from 'sqlite3';
import { open } from 'sqlite';
const require = createRequire(import.meta.url);
const shortID = require('shortid');

async function init() {
  const db = await open({
    filename: './fileDB.sqlite',
    driver: sqlite.Database,
  });
  await db.migrate({ migrationsPath: './migrations' });
  return db;
}

const dbConnect = init();

// Takes req.files, inserts file details into DB for reference
export async function uploadToDB(files) {
  for (const file of files) {
    // console.log(file.originalname); // Testing file name read
    let fileName = file.originalname;
    let path = file.path;
    let id = shortID.generate();
    // console.log(id); // Testing generated ID value

    const db = await dbConnect;
    db.run('INSERT INTO Files VALUES (?, ?, ?)', [id, fileName, path]);
  }
}

// Queries \\
let q;

// Get list of names
export async function getNames() {
  const db = await dbConnect;
  q = 'SELECT DISTINCT originalName FROM Files;';
  return db.all(q);
}

// Get list of paths
export async function getPaths() {
  const db = await dbConnect;
  q = 'SELECT DISTINCT pathName FROM Files;';
  return db.all(q);
}
