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

// Pruebas del Issue #1: formulario de contacto.
const contactRequest = data => fetch(`${base()}/api/contacto`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
const validContact = { nombre: 'Ana Pérez', correo: 'ana@example.com', mensaje: 'Necesito una página web.' };
test('POST /api/contacto acepta datos válidos', async () => {
  const res = await contactRequest(validContact);
  assert.equal(res.status, 200);
  assert.match((await res.json()).mensaje, /Solicitud recibida/);
});
test('POST /api/contacto rechaza nombre vacío', async () => {
  const res = await contactRequest({ ...validContact, nombre: ' ' });
  assert.equal(res.status, 400);
});
test('POST /api/contacto rechaza correo inválido', async () => {
  const res = await contactRequest({ ...validContact, correo: 'correo-invalido' });
  assert.equal(res.status, 400);
});
test('POST /api/contacto rechaza mensaje vacío', async () => {
  const res = await contactRequest({ ...validContact, mensaje: '' });
  assert.equal(res.status, 400);
});
test('POST /api/contacto rechaza cuerpo JSON sin campos', async () => {
  const res = await contactRequest({});
  assert.equal(res.status, 400);
});
