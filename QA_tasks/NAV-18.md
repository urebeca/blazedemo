---
ticket: NAV-18
tipo: requerimiento-qa
titulo: "Doble clic rápido en 'Choose' no debe provocar doble navegación ni error"
sitio: https://blazedemo.com
pagina: reserve.php
elemento: "Botón: Choose (doble clic)"
origen: test-plan-navegacion.md
prioridad: P2
severidad: Media
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, buttons, edge-case, blazedemo]
---

# NAV-18 — Doble clic rápido en "Choose"

## Descripción
Caso borde de uso razonable: el usuario hace doble clic rápido sobre "Choose".
No debe producir doble navegación, error de concurrencia ni estado inconsistente.

## Pasos de prueba
1. Abrir https://blazedemo.com → Boston → Rome → "Find Flights"
2. Hacer doble clic rápido (dos clics en < 500 ms) en "Choose" de la fila 1
3. Observar navegación y consola

## Resultado esperado
- Una única navegación a `purchase.php` (o navegación estable)
- Sin pantalla en blanco, sin error de consola
- Sin doble sesión/pedido registrado (si aplica)

## Criterios de aceptación
- [ ] Máximo 1 navegación efectiva
- [ ] Sin excepción JavaScript en consola
- [ ] Estado resultante consistente (purchase.php accesible)
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- Si abre dos pestañas o falla → reportar como bug con vídeo/gif de la acción
