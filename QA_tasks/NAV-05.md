---
ticket: NAV-05
tipo: requerimiento-qa
titulo: "Enlace 'home' debe navegar a /home desde index.php"
sitio: https://blazedemo.com
pagina: index.php
elemento: "Enlace menú: home"
origen: test-plan-navegacion.md
prioridad: P1
severidad: Alta
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, navigation, menu, blazedemo]
---

# NAV-05 — Enlace "home" desde index.php

## Descripción
El enlace "home" del menú superior en la página de inicio debe navegar a la
ruta `/home` correctamente renderizada.

## Pasos de prueba
1. Abrir https://blazedemo.com
2. Localizar el enlace "home" en el menú superior
3. Hacer clic en él

## Resultado esperado
- El navegador navega a `/home`
- La página carga su contenido (sin 404)
- Sin errores en consola

## Criterios de aceptación
- [ ] Clic produce navegación a `/home`
- [ ] Sin 404/500
- [ ] Sin errores JavaScript en consola
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- `/home` es una ruta sin extensión; verificar que el servidor la resuelve
