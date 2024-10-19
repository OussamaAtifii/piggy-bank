import request from 'supertest';
import app from '../testIndex';

describe('GET /api', () => {
  it('Debe devolver un mensaje de bienvenida', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('¡Bienvenido a la API!');
  });
});
