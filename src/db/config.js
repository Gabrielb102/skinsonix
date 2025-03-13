// src/db/sequelize.js
import { Sequelize } from 'sequelize';
import { app } from 'electron';
import path from 'path';
import fs from 'fs';

// Get the userData path (e.g., C:\Users\<User>\AppData\Roaming\<YourAppName>)
const userDataPath = app.getPath('userData');

// Create a subdirectory for your database if you wish
const dbFolder = path.join(userDataPath, 'db');
if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder, { recursive: true });
}

// Construct the full path to the SQLite database file
const dbPath = path.join(dbFolder, 'skinsonix.db');

console.log("Initializing DB: ", dbPath);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
});

export default sequelize;