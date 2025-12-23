const request = require('supertest');
const app = require('../main');

describe('PostHive app', () => {
  test('GET /posts returns 200 and HTML', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });
});
