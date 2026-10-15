---
ticket: NAV-20
tipo: requerimiento-qa
titulo: "Navegación por teclado con Tab debe recorrer los elementos interactivos"
sitio: https://blazedemo.com
pagina: "Todas las páginas"
elemento: "Foco de teclado (Tab)"
origen: test-plan-navegacion.md
prioridad: P2
severidad: Media
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, accessibility, keyboard, blazedemo]
---

# NAV-20 — Tabulación con teclado

## Descripción
Los elementos interactivos (enlaces del menú, dropdowns, botones) deben ser
alcanzables con la tecla **Tab** y mostrar foco visible (accesibilidad básica).

## Pasos de prueba
1. Abrir https://blazedemo.com sin usar el ratón
2. Presionar Tab repetidamente
3. Observar el orden de foco y su visibilidad

## Resultado esperado
- Tab recorre: enlaces menú → dropdowns → "Find Flights"
- El elemento enfocado tiene indicador visual (outline/highlight)
- El foco no se pierde en elementos invisibles ni llega a un "foco fantasma"

## Criterios de aceptación
- [ ] Todos los elementos interactivos alcanzables con Tab
- [ ] Indicador de foco visible en cada paso
- [ ] Orden coherente (izquierda→derecha, arriba→abajo)
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- Registrar el orden real observado en el reporte
