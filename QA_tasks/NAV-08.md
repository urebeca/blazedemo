---
ticket: NAV-08
tipo: requerimiento-qa
titulo: "Enlace 'home' debe navegar a /home desde vacation.html"
sitio: https://blazedemo.com
pagina: vacation.html
elemento: "Enlace menú: home"
origen: test-plan-navegacion.md
prioridad: P2
severidad: Media
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, navigation, menu, blazedemo]
---

# NAV-08 — Enlace "home" desde vacation.html

## Descripción
Desde la página estática de vacaciones, el enlace "home" debe navegar a `/home`.

## Pasos de prueba
1. Abrir https://blazedemo.com
2. Clic en "destination of the week! The Beach!"
3. En `vacation.html`, hacer clic en "home"

## Resultado esperado
- El navegador navega a `/home`
- Sin 404 ni errores de consola

## Criterios de aceptación
- [ ] Clic produce navegación a `/home`
- [ ] Sin 404/500
- [ ] Sin errores JavaScript en consola
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- Prioridad P2: página secundaria
