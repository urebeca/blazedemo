---
ticket: NAV-09
tipo: requerimiento-qa
titulo: "Enlace 'destination of the week! The Beach!' debe abrir vacation.html"
sitio: https://blazedemo.com
pagina: index.php
elemento: "Enlace: destination of the week! The Beach!"
origen: test-plan-navegacion.md
prioridad: P2
severidad: Media
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, navigation, links, blazedemo]
---

# NAV-09 — Enlace "destination of the week! The Beach!"

## Descripción
El enlace promocional "destination of the week! The Beach!" de la página de
inicio debe llevar al usuario a `vacation.html`.

## Pasos de prueba
1. Abrir https://blazedemo.com
2. Localizar el enlace "destination of the week! The Beach!"
3. Hacer clic en él

## Resultado esperado
- El navegador navega a `vacation.html`
- La página muestra "Destination of the week: Hawaii !" con su imagen
- Sin 404 ni errores de consola

## Criterios de aceptación
- [ ] Clic produce navegación a `vacation.html`
- [ ] Contenido de la página visible (título + imagen)
- [ ] Sin 404/500
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- Comprobar que la imagen `assets/vacation.jpg` carga (no rota)
