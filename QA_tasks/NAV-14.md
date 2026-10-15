---
ticket: NAV-14
tipo: requerimiento-qa
titulo: "'Find Flights' sin seleccionar ciudades no debe provocar error fatal"
sitio: https://blazedemo.com
pagina: index.php
elemento: "Botón: Find Flights"
origen: test-plan-navegacion.md
prioridad: P1
severidad: Media
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, buttons, negative, validation, blazedemo]
---

# NAV-14 — "Find Flights" sin seleccionar ciudades

## Descripción
Caso negativo: el usuario hace clic en "Find Flights" dejando ambos desplegables
en su valor por defecto ("Choose"). La aplicación debe manejarlo de forma
controlada (validación o navegación definida), sin errores técnicos.

## Pasos de prueba
1. Abrir https://blazedemo.com
2. Verificar que ambos dropdowns están en "Choose" (no cambiarlos)
3. Hacer clic en "Find Flights"

## Resultado esperado
Uno de estos comportamientos aceptables:
- Mensaje de validación impidiendo avanzar, o
- Navegación a resultados vacíos/definidos
- **No aceptable:** error 500, pantalla en blanco o excepción de JavaScript

## Criterios de aceptación
- [ ] Sin error HTTP 500
- [ ] Sin pantalla en blanco
- [ ] Sin excepción JavaScript no controlada en consola
- [ ] Comportamiento es determinista (mismo resultado siempre)
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- Registrar cuál de los comportamientos aceptables ocurre (informar al equipo)
