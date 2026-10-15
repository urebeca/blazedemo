---
ticket: NAV-22
tipo: requerimiento-qa
titulo: "Los botones deben activarse con Enter o Space desde el foco de teclado"
sitio: https://blazedemo.com
pagina: "index.php, reserve.php"
elemento: "Botones: Find Flights, Choose"
origen: test-plan-navegacion.md
prioridad: P2
severidad: Media
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, accessibility, keyboard, blazedemo]
---

# NAV-22 — Activación de botones con Enter/Space

## Descripción
Los botones deben poder activarse con **Enter** o **Space** cuando tienen el
foco de teclado (estándar HTML: `Enter` para `<button>`, `Space` también
debe funcionar).

## Pasos de prueba
1. Abrir https://blazedemo.com
2. Tab hasta enfocar el botón "Find Flights" (con ciudades ya seleccionadas)
3. Presionar Enter → verificar navegación
4. Repetir en `reserve.php` con "Choose" (fila 1), probando Enter y Space

## Resultado esperado
- Enter y/o Space activan el botón con el mismo resultado que el clic
- Sin errores de consola

## Criterios de aceptación
- [ ] Enter activa "Find Flights" → navega a `reserve.php`
- [ ] Enter o Space activa "Choose" → navega a `purchase.php`
- [ ] Resultado idéntico al clic con ratón
- [ ] Sin 404/500 ni excepciones JS
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- Si `<div>` con onclick en vez de `<button>`, Enter/Space podrían fallar → reportar
