import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the database
export async function openDb() {
  return open({
    filename: './database/task.db',   // This file is created if it doesn’t exist
    driver: sqlite3.Database
  });
}


