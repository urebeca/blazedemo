---
ticket: NAV-17
tipo: requerimiento-qa
titulo: "Botón 'Choose' de la fila 5 (última) debe abrir purchase.php"
sitio: https://blazedemo.com
pagina: reserve.php
elemento: "Botón: Choose (fila 5)"
origen: test-plan-navegacion.md
prioridad: P1
severidad: Alta
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, buttons, flow, blazedemo]
---

# NAV-17 — "Choose" fila 5 (última)

## Descripción
Validar el botón de la última fila de la tabla de resultados (caso de borde
de posición: principio, medio y fin de tabla).

## Pasos de prueba
1. Abrir https://blazedemo.com → Boston → Rome → "Find Flights"
2. Anotar los datos de la **fila 5**: Airline, Flight #, Price
3. Hacer clic en "Choose" de la fila 5
4. Verificar `purchase.php`

## Resultado esperado
- Navegación a `purchase.php`
- Airline y Flight Number coinciden con la fila 5
- Total = Price + Fees

## Criterios de aceptación
- [ ] La URL cambia a `purchase.php`
- [ ] Datos del vuelo = fila 5
- [ ] Total = Price + Fees
- [ ] 0 errores de consola
- [ ] Sin desbordamiento visual de la tabla en Chrome/Firefox/Edge

## Notas QA
- Última fila suele tener problemas de eventos/scroll (boundary por posición)
