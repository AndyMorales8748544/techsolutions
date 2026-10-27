# TechSolutions

Landing page responsive para una empresa ficticia de servicios tecnológicos. Proyecto académico para demostrar colaboración en GitHub, CI/CD con **Azure DevOps Pipelines**, aprobación humana y despliegue en **Azure App Service**.

## Requisitos

- Node.js 20 o superior
- npm

## Ejecutar localmente

```bash
npm install
npm start
```

Abrir http://localhost:3000

Para desarrollo: `npm run dev`.

## Comandos de validación

```bash
npm run check
npm test
npm run build
```

- `check`: comprueba la sintaxis JavaScript.
- `test`: ejecuta pruebas automatizadas HTTP con `node:test`.
- `build`: valida los archivos esenciales. Esta aplicación no requiere compilación de frontend.
- Endpoint de salud: `GET /api/health`.

## Estructura

```text
techsolutions/
├── public/
│   ├── css/styles.css
│   ├── js/main.js
│   └── index.html
├── scripts/build.js
├── tests/server.test.js
├── server.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Funcionalidad reservada para colaboración (Fase 2)

**Issue propuesto:** Implementar formulario de contacto con validación.

**Rama propuesta:** `feature/contact-form`.

**Criterios de aceptación:**
1. Sustituir el bloque «Próximamente» de la sección Contacto por un formulario con nombre, correo y mensaje.
2. Validar campos obligatorios y formato de correo.
3. Mostrar confirmación accesible al usuario, sin afirmar que se envió un correo real.
4. Añadir pruebas automatizadas de la validación.
5. Crear un Pull Request hacia `main` para revisión y merge.

**Nota:** No hay backend de envío de mensajes ni almacenamiento de datos en esta versión. No publicar credenciales ni secretos en Git.

## Plan de DevOps

- **Fase 1:** aplicación y repositorio GitHub.
- **Fase 2:** Issue, rama, commits, Pull Request y aprobación con dos cuentas.
- **Fase 3:** agregar `azure-pipelines.yml` con instalación, check, test y artefacto ZIP.
- **Fase 4:** configurar Environment `production` con Approvals and Checks en Azure DevOps.
- **Fase 5:** crear Azure App Service para Node.js, service connection y stage de despliegue tras aprobación.

La aprobación de GitHub para el Pull Request y la aprobación de Azure DevOps para producción son controles distintos. Los recursos Azure pueden generar costos; revisar la suscripción y el plan antes de crearlos.
