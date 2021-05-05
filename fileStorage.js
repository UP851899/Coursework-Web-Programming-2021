/* eslint-disable prefer-const */
// import { open } from 'sqlite';
import { createRequire } from 'module';
import sqlite from 'sqlite3';
import { open } from 'sqlite';
const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3').verbose();
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

export async function uploadToDB(files) {
  for (const file of files) {
    console.log(file.originalname);
    let fileName = file.originalname;
    let path = file.path;
    let id = shortID.generate();
    console.log(id);

    const db = await dbConnect;
    db.run('INSERT INTO Files VALUES (?, ?, ?)', [id, fileName, path]);
  }
}
