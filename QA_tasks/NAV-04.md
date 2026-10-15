---
ticket: NAV-04
tipo: requerimiento-qa
titulo: "Menú 'Travel The World' debe navegar al inicio desde vacation.html"
sitio: https://blazedemo.com
pagina: vacation.html
elemento: "Enlace menú: Travel The World"
origen: test-plan-navegacion.md
prioridad: P2
severidad: Media
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, navigation, menu, blazedemo]
---

# NAV-04 — Menú "Travel The World" desde vacation.html

## Descripción
Página estática de vacaciones: el menú superior debe permitir volver al inicio.

## Pasos de prueba
1. Abrir https://blazedemo.com
2. Clic en "destination of the week! The Beach!"
3. En `vacation.html`, hacer clic en "Travel The World"

## Resultado esperado
- El navegador navega al inicio (`index.php`)
- Sin errores HTTP ni de consola

## Criterios de aceptación
- [ ] Clic produce navegación al inicio
- [ ] Sin 404/500
- [ ] Sin errores JavaScript en consola
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- Prioridad P2: página secundaria, no forma parte del flujo de compra
