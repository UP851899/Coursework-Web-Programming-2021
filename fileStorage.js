// import { open } from 'sqlite';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3').verbose();

async function init() {
  const db = await new sqlite3.Database('./database/initial.db', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Connected to initial.db');
    return db;
  });
}

const dbConnect = init();

export async function test() {
  const db = await dbConnect;
  return db.all('SELECT * from Files');
//   console.log(testQuery);
}
