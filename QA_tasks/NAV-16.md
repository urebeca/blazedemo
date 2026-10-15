---
ticket: NAV-16
tipo: requerimiento-qa
titulo: "Botón 'Choose' de la fila 3 debe abrir purchase.php con sus datos"
sitio: https://blazedemo.com
pagina: reserve.php
elemento: "Botón: Choose (fila 3)"
origen: test-plan-navegacion.md
prioridad: P1
severidad: Alta
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, buttons, flow, blazedemo]
---

# NAV-16 — "Choose" fila 3

## Descripción
Validar que la selección funciona en filas intermedias de la tabla (no solo
la primera), descartando que solo el primer botón esté enlazado correctamente.

## Pasos de prueba
1. Abrir https://blazedemo.com → Boston → Rome → "Find Flights"
2. Anotar los datos de la **fila 3**: Airline, Flight #, Price
3. Hacer clic en "Choose" de la fila 3
4. Verificar `purchase.php`

## Resultado esperado
- Navegación a `purchase.php`
- Airline y Flight Number coinciden con la fila 3 anotada
- Total = Price + Fees

## Criterios de aceptación
- [ ] La URL cambia a `purchase.php`
- [ ] Datos del vuelo = fila 3 (no de otra fila)
- [ ] Total = Price + Fees
- [ ] 0 errores de consola

## Notas QA
- Comparar fila 3 ≠ fila 1 (si muestran lo mismo → bug de binding de datos)
