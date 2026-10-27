'use strict';
const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../server');
const server = app.listen(0, '127.0.0.1');
after(() => server.close());
const base = () => `http://127.0.0.1:${server.address().port}`;
test('GET /api/health responde estado correcto', async () => {
  const res = await fetch(`${base()}/api/health`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: 'ok', service: 'techsolutions' });
});
test('GET / sirve la landing page', async () => {
  const res = await fetch(`${base()}/`);
  assert.equal(res.status, 200);
  assert.match(await res.text(), /TechSolutions/);
});
test('GET /css/styles.css sirve estilos', async () => {
  const res = await fetch(`${base()}/css/styles.css`);
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/css/);
});
test('GET de recurso desconocido sin HTML devuelve 404', async () => {
  const res = await fetch(`${base()}/no-existe`, { headers: { Accept: 'application/json' } });
  assert.equal(res.status, 404);
});
