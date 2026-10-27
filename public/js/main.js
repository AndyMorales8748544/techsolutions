'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

/* TechSolutions: formulario de contacto */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const fields = {
    nombre: contactForm.elements.namedItem('nombre'),
    correo: contactForm.elements.namedItem('correo'),
    mensaje: contactForm.elements.namedItem('mensaje')
  };
  const errors = {
    nombre: document.getElementById('contact-name-error'),
    correo: document.getElementById('contact-email-error'),
    mensaje: document.getElementById('contact-message-error')
  };
  const status = document.getElementById('contact-status');
  const submit = contactForm.querySelector('button[type="submit"]');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function validate(data) {
    const result = {};
    if (!data.nombre) result.nombre = 'Ingresa tu nombre.';
    else if (data.nombre.length > 100) result.nombre = 'El nombre es demasiado largo.';
    if (!data.correo) result.correo = 'Ingresa tu correo electrónico.';
    else if (data.correo.length > 254 || !emailPattern.test(data.correo)) result.correo = 'Ingresa un correo electrónico válido.';
    if (!data.mensaje) result.mensaje = 'Cuéntanos sobre tu proyecto.';
    else if (data.mensaje.length > 2000) result.mensaje = 'El mensaje es demasiado largo.';
    return result;
  }
  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    const data = Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.value.trim()]));
    const validation = validate(data);
    for (const [key, field] of Object.entries(fields)) {
      const message = validation[key] || '';
      errors[key].textContent = message;
      field.setAttribute('aria-invalid', String(Boolean(message)));
    }
    status.textContent = '';
    status.className = 'contact-status';
    if (Object.keys(validation).length) {
      status.textContent = 'Revisa los campos señalados.';
      status.classList.add('error');
      fields[Object.keys(validation)[0]].focus();
      return;
    }
    submit.disabled = true;
    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'No se pudo procesar el formulario.');
      status.textContent = result.mensaje;
      status.classList.add('success');
      contactForm.reset();
      for (const field of Object.values(fields)) field.removeAttribute('aria-invalid');
    } catch (error) {
      status.textContent = error.message || 'No se pudo conectar con el servidor.';
      status.classList.add('error');
    } finally {
      submit.disabled = false;
    }
  });
}
