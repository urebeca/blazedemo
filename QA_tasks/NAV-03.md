---
ticket: NAV-03
tipo: requerimiento-qa
titulo: "Menú 'Travel The World' debe navegar al inicio desde purchase.php"
sitio: https://blazedemo.com
pagina: purchase.php
elemento: "Enlace menú: Travel The World"
origen: test-plan-navegacion.md
prioridad: P1
severidad: Alta
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, navigation, menu, blazedemo]
---

# NAV-03 — Menú "Travel The World" desde purchase.php

## Descripción
Desde la página de compra (`purchase.php`), el enlace "Travel The World" debe
navegar al inicio sin perder la sesión ni provocar errores.

## Pasos de prueba
1. Abrir https://blazedemo.com
2. Seleccionar Boston → Rome → "Find Flights"
3. Clic "Choose" en cualquier vuelo
4. En `purchase.php`, hacer clic en "Travel The World"

## Resultado esperado
- El navegador navega al inicio (`index.php`)
- Sin errores HTTP ni de consola

## Criterios de aceptación
- [ ] Clic produce navegación al inicio
- [ ] Sin 404/500
- [ ] Sin errores JavaScript en consola
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- Este caso valida la salida del flujo de compra (paso 4 del flujo principal)
