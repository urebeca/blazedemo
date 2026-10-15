---
ticket: NAV-21
tipo: requerimiento-qa
titulo: "Los enlaces del menú deben activarse con la tecla Enter"
sitio: https://blazedemo.com
pagina: "Todas las páginas"
elemento: "Enlaces menú (Enter)"
origen: test-plan-navegacion.md
prioridad: P2
severidad: Media
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, accessibility, keyboard, blazedemo]
---

# NAV-21 — Activación de enlaces con Enter

## Descripción
Un enlace con foco debe navegar al presionar **Enter**, igual que con clic del ratón.

## Pasos de prueba
1. Abrir https://blazedemo.com
2. Usar Tab hasta enfocar el enlace "home"
3. Presionar Enter

## Resultado esperado
- Navegación a `/home` (mismo resultado que un clic)
- Sin errores de consola

## Criterios de aceptación
- [ ] Enter dispara la navegación
- [ ] Resultado idéntico al clic con ratón
- [ ] Sin 404/500
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- Repetir con "Travel The World" para mayor cobertura
