---
ticket: NAV-06
tipo: requerimiento-qa
titulo: "Enlace 'home' debe navegar a /home desde reserve.php"
sitio: https://blazedemo.com
pagina: reserve.php
elemento: "Enlace menú: home"
origen: test-plan-navegacion.md
prioridad: P1
severidad: Alta
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, navigation, menu, blazedemo]
---

# NAV-06 — Enlace "home" desde reserve.php

## Descripción
Desde la tabla de resultados de vuelos, el enlace "home" debe navegar a `/home`.

## Pasos de prueba
1. Abrir https://blazedemo.com
2. Seleccionar Boston → Rome → "Find Flights"
3. En `reserve.php`, hacer clic en "home"

## Resultado esperado
- El navegador navega a `/home`
- Sin 404 ni errores de consola

## Criterios de aceptación
- [ ] Clic produce navegación a `/home`
- [ ] Sin 404/500
- [ ] Sin errores JavaScript en consola
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- Ejecutar tras el flujo de búsqueda, no por URL directa
