---
ticket: NAV-07
tipo: requerimiento-qa
titulo: "Enlace 'home' debe navegar a /home desde purchase.php"
sitio: https://blazedemo.com
pagina: purchase.php
elemento: "Enlace menú: home"
origen: test-plan-navegacion.md
prioridad: P1
severidad: Alta
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, navigation, menu, blazedemo]
---

# NAV-07 — Enlace "home" desde purchase.php

## Descripción
Desde la página de compra, el enlace "home" del menú superior debe navegar a `/home`.

## Pasos de prueba
1. Abrir https://blazedemo.com
2. Seleccionar Boston → Rome → "Find Flights"
3. Clic "Choose" en cualquier vuelo
4. En `purchase.php`, hacer clic en "home"

## Resultado esperado
- El navegador navega a `/home`
- Sin 404 ni errores de consola

## Criterios de aceptación
- [ ] Clic produce navegación a `/home`
- [ ] Sin 404/500
- [ ] Sin errores JavaScript en consola
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- Verificar que abandonar el formulario de compra no provoca errores
