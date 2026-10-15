---
ticket: NAV-13
tipo: requerimiento-qa
titulo: "'Find Flights' con ciudades seleccionadas debe mostrar la tabla de vuelos"
sitio: https://blazedemo.com
pagina: index.php
elemento: "Botón: Find Flights"
origen: test-plan-navegacion.md
prioridad: P0
severidad: Alta
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, buttons, flow, critical-path, blazedemo]
---

# NAV-13 — "Find Flights" con ciudades seleccionadas

## Descripción
Botón crítico del flujo principal: con origen y destino válidos seleccionados,
debe navegar a `reserve.php` y mostrar la tabla de resultados de vuelos.

## Pasos de prueba
1. Abrir https://blazedemo.com
2. Seleccionar origen: **Boston**
3. Seleccionar destino: **Rome**
4. Hacer clic en "Find Flights"

## Resultado esperado
- Navegación a `reserve.php`
- Tabla visible con ≥ 1 fila (esperadas: 5 filas)
- Columnas: Flight #, Airline, Departs, Arrives, Price
- Precios con formato `$X.XX`
- Cada fila tiene botón "Choose"

## Criterios de aceptación
- [ ] La URL cambia a `reserve.php`
- [ ] Tabla renderizada con sus 5 columnas
- [ ] ≥ 1 fila de resultados con datos no vacíos
- [ ] Precios con formato moneda válido
- [ ] 0 errores de consola
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- **Caso P0:** si falla, el negocio está caído (no se puede comprar ningún vuelo)
- Los datos son aleatorios: validar formato/estructura, no valores fijos
