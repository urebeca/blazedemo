---
ticket: NAV-15
tipo: requerimiento-qa
titulo: "Botón 'Choose' de la fila 1 debe abrir purchase.php con sus datos"
sitio: https://blazedemo.com
pagina: reserve.php
elemento: "Botón: Choose (fila 1)"
origen: test-plan-navegacion.md
prioridad: P0
severidad: Alta
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, buttons, flow, critical-path, blazedemo]
---

# NAV-15 — "Choose" fila 1

## Descripción
Botón crítico: al elegir el primer vuelo de la tabla, debe navegar a
`purchase.php` mostrando los datos de **ese** vuelo (continuidad de datos).

## Pasos de prueba
1. Abrir https://blazedemo.com → Boston → Rome → "Find Flights"
2. Anotar los datos de la **fila 1**: Airline, Flight #, Price
3. Hacer clic en "Choose" de la fila 1
4. Verificar `purchase.php`

## Resultado esperado
- Navegación a `purchase.php`
- Airline y Flight Number coinciden con la fila 1 anotada
- Price visible; Total Cost = Price + Arbitrary Fees and Taxes
- Formulario de compra visible

## Criterios de aceptación
- [ ] La URL cambia a `purchase.php`
- [ ] Airline = fila 1
- [ ] Flight Number = fila 1
- [ ] Total = Price + Fees (RN-01 de la KB)
- [ ] Formulario de pasajero visible
- [ ] 0 errores de consola

## Notas QA
- **Caso P0:** valida la continuidad de datos entre páginas
- Comparar siempre contra los valores anotados en el paso 2 (datos aleatorios)
