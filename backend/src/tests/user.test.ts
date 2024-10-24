import request from 'supertest';
import app from '../testIndex';

let userId: Number;
const user = {
  username: 'Tartadequeso',
  email: 'tartadequeso@email.com',
  password: 'Password7_',
};
let tokenCookie: any;

describe('User HTTP requests', () => {
  it('Registers a user', async () => {
    const res = await request(app).post('/user/register').send(user);
    userId = res.body.id;

    // Status code is 201.
    expect(res.statusCode).toBe(201);
    // Response body is an object.
    expect(res.body).toBeInstanceOf(Object);
    // Response body has id, username, and email properties.
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('username', user.username);
    expect(res.body).toHaveProperty('email', user.email);
    // Response headers contains the access token.
    expect(res.headers['set-cookie']).toBeDefined();

    // Handle both array and string cases for set-cookie.
    tokenCookie = Array.isArray(res.headers['set-cookie'])
      ? res.headers['set-cookie'].find((cookie) => cookie.startsWith('token='))
      : res.headers['set-cookie'];
    expect(tokenCookie).toBeDefined();
  });

  it('Logs in a user', async () => {
    const res = await request(app).post('/user/login').send({
      email: user.email,
      password: user.password,
    });

    // Status code is 200.
    expect(res.statusCode).toBe(200);
    // Response body is an object.
    expect(res.body).toBeInstanceOf(Object);
    // Response headers contains a cookie.
    expect(res.headers['set-cookie']).toBeDefined();
    // Response cookie contains the access token.
    tokenCookie = Array.isArray(res.headers['set-cookie'])
      ? res.headers['set-cookie'].find((cookie) => cookie.startsWith('token='))
      : res.headers['set-cookie'];
    expect(tokenCookie).toBeDefined();
  });

  it('Returns all users', async () => {
    const res = await request(app).get('/user');

    // Status code is 200.
    expect(res.statusCode).toBe(200);
    // Response body is an array.
    expect(Array.isArray(res.body)).toBe(true);
    // Response body has at least one element.
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Returns user by id', async () => {
    const res = await request(app).get(`/user/${userId}`);

    // Status code is 200.
    expect(res.statusCode).toBe(200);
    // Response body is an object.
    expect(res.body).toBeInstanceOf(Object);
    // Response body has id, username, and email properties.
    expect(res.body).toHaveProperty('id', userId);
    expect(res.body).toHaveProperty('username', user.username);
    expect(res.body).toHaveProperty('email', user.email);
  });

  it('Updates a user', async () => {
    const res = await request(app)
      .patch(`/user/${userId}`)
      .set('Cookie', tokenCookie)
      .send({
        username: 'Tiramisu',
      });

    // Status code is 200.
    expect(res.statusCode).toBe(200);
    // Response body is an object.
    expect(res.body).toBeInstanceOf(Object);
    // Response body has id, username, and email properties.
    expect(res.body).toHaveProperty('id', userId);
    expect(res.body).toHaveProperty('username', 'Tiramisu');
    expect(res.body).toHaveProperty('email', user.email);
  });

  it('Deletes a user', async () => {
    const res = await request(app)
      .delete(`/user/${userId}`)
      .set('Cookie', tokenCookie);

    // Status code is 204.
    expect(res.statusCode).toBe(204);
    // Response body is empty.
    expect(res.body).toEqual({});
  });
});
