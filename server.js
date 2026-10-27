'use strict';
const express = require('express');
const path = require('node:path');
const app = express();
app.disable('x-powered-by');
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
