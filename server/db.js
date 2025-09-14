const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(dbPath);

function runSqlFile(file) {
  const p = path.join(__dirname, file);
  if (fs.existsSync(p)) {
    const sql = fs.readFileSync(p, 'utf8');
    db.exec(sql);
  }
}

db.serialize(() => {
  runSqlFile('schema.sql');
});

module.exports = db;
