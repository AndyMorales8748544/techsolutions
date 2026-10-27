'use strict';
const express = require('express');
const path = require('node:path');
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));
app.post('/api/contacto', (req, res) => {
  const { nombre, correo, mensaje } = req.body || {};
  const validText = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.trim().length <= max;
  const validEmail = typeof correo === 'string' && correo.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
  if (!validText(nombre, 100) || !validEmail || !validText(mensaje, 2000)) {
    return res.status(400).json({ error: 'Verifica el nombre, correo electrónico y mensaje.' });
  }
  // Demostración: se valida la solicitud, pero no se guarda ni se envía correo.
  return res.status(200).json({ mensaje: '¡Solicitud recibida! Esta es una confirmación de demostración.' });
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'techsolutions' }));
app.get('*', (req, res) => {
  if (req.accepts('html')) return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  return res.status(404).json({ error: 'Recurso no encontrado' });
});
if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => console.log(`TechSolutions disponible en http://localhost:${port}`));
}
module.exports = app;
