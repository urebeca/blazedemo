---
ticket: NAV-19
tipo: requerimiento-qa
titulo: "Botón de envío del formulario de compra debe responder al clic"
sitio: https://blazedemo.com
pagina: purchase.php
elemento: "Botón de submit del formulario"
origen: test-plan-navegacion.md
prioridad: P1
severidad: Alta
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, buttons, form, blazedemo]
---

# NAV-19 — Botón de envío del formulario de compra

## Descripción
El botón de submit del formulario de pasajero/pago debe responder al clic y
procesar el envío. El alcance de este ticket es que **el botón acciona**; la
validación de campos se cubre en otro issue.

## Pasos de prueba
1. Abrir https://blazedemo.com → Boston → Rome → "Find Flights"
2. Clic "Choose" en la fila 1
3. Rellenar todos los campos con datos válidos (ver datos de prueba)
4. Hacer clic en el botón de submit

## Resultado esperado
- El clic procesa el envío (navegación a confirmación o mensaje de éxito)
- Sin error 500 ni excepción JavaScript
- Sin recarga infinita (spinner eterno)

## Criterios de aceptación
- [ ] El clic dispara el envío del formulario
- [ ] Respuesta del servidor en < 3 s
- [ ] Sin error HTTP 500
- [ ] Sin excepción JavaScript en consola
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- Datos válidos en sección "Datos de prueba" del plan de navegación
- No validar aquí el formato de campos (otro issue)
