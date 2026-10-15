---
ticket: NAV-02
tipo: requerimiento-qa
titulo: "Menú 'Travel The World' debe navegar al inicio desde reserve.php"
sitio: https://blazedemo.com
pagina: reserve.php
elemento: "Enlace menú: Travel The World"
origen: test-plan-navegacion.md
prioridad: P1
severidad: Alta
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, navigation, menu, blazedemo]
---

# NAV-02 — Menú "Travel The World" desde reserve.php

## Descripción
Desde la página de resultados de vuelos (`reserve.php`), el enlace "Travel The
World" del menú superior debe devolver al usuario al inicio.

## Pasos de prueba
1. Abrir https://blazedemo.com
2. Seleccionar Boston → Rome → clic "Find Flights"
3. En `reserve.php`, hacer clic en "Travel The World"

## Resultado esperado
- El navegador navega al inicio (`index.php`)
- La tabla de vuelos deja de mostrarse (se carga la home)
- Sin errores HTTP ni de consola

## Criterios de aceptación
- [ ] Clic produce navegación al inicio
- [ ] Sin 404/500
- [ ] Sin errores JavaScript en consola
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- Ejecutar con el flujo completo (con búsqueda previa), no por URL directa
