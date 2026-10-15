---
ticket: NAV-01
tipo: requerimiento-qa
titulo: "Menú 'Travel The World' debe navegar al inicio desde index.php"
sitio: https://blazedemo.com
pagina: index.php
elemento: "Enlace menú: Travel The World"
origen: test-plan-navegacion.md
prioridad: P1
severidad: Alta
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, navigation, menu, blazedemo]
---

# NAV-01 — Menú "Travel The World" desde index.php

## Descripción
El enlace "Travel The World" del menú superior, ubicado en la página de inicio,
debe responder al clic y llevar al usuario a `index.php` sin errores.

## Pasos de prueba
1. Abrir https://blazedemo.com
2. Localizar el enlace "Travel The World" en el menú superior
3. Hacer clic en él

## Resultado esperado
- El navegador navega a `index.php` (URL correcta, sin 404)
- La página carga sin errores en consola
- El menú permanece visible tras la navegación

## Criterios de aceptación
- [ ] Clic produce navegación (la URL cambia a `index.php`)
- [ ] Sin estado de error HTTP (404/500)
- [ ] Sin errores JavaScript en consola
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- Caso P1: el menú es la navegación principal del sitio
- Registrar evidencia (screenshot) solo si FALLA
