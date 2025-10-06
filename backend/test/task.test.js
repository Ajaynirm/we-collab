import request from 'supertest'
import { initDB } from '../src/config/initDB.js';
import app from '../src/server.js'; // make sure server.js exports app, not listen()

let db;

beforeAll(async () => {
  db = await initDB();
});

afterAll(async () => {
  await db.close();
});

let taskId;

describe('Task CRUD API', () => {
  

  test('POST /api/tasks → creates a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test', description: 'Testing...' });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    taskId = res.body.id;
  });
 
  test('GET /api/tasks/:id → gets  all task', async () => {
    const res = await request(app).get(`/api/tasks`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/tasks/:id → gets a single task', async () => {
    const res = await request(app).get(`/api/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(taskId);
  });

  test('DELETE /api/tasks/:id → deletes task', async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`);

    expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe("Task deleted successfully");
  expect(parseInt(res.body.id)).toBe(taskId);
  });





});



