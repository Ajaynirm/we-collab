import request from 'supertest'
import express from 'express';
import { initDB } from '../src/config/initDB.js';
import app from '../src/server.js'; // make sure server.js exports app, not listen()

let db;

beforeAll(async () => {
  db = await initDB();
});

afterAll(async () => {
  await db.close();
});

describe('Task CRUD API', () => {
  let taskId;

  test('POST /api/tasks → creates a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test', description: 'Testing...' });
    // expect(res.statusCode).toBe(200);
    expect(res.body.id).toBeDefined();
    taskId = res.body.id;
  });

 
});
