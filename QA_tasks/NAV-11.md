---
ticket: NAV-11
tipo: requerimiento-qa
titulo: "Todos los enlaces de /home deben navegar sin 404"
sitio: https://blazedemo.com
pagina: "/home"
elemento: "Conjunto de enlaces de la página"
origen: test-plan-navegacion.md
prioridad: P2
severidad: Media
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, navigation, links, broken-link, blazedemo]
---

# NAV-11 — Enlaces de /home

## Descripción
Todos los enlaces de la página alternativa `/home` deben apuntar a destinos
válidos y no devolver errores.

## Pasos de prueba
1. Abrir https://blazedemo.com/home
2. Listar todos los enlaces de la página
3. Hacer clic en cada uno
4. Anotar URL destino y código de estado HTTP

## Resultado esperado
- Cada enlace navega a un destino válido
- Ningún enlace devuelve 404/500

## Criterios de aceptación
- [ ] Inventario de enlaces documentado
- [ ] 0 enlaces rotos (excepto defectos conocidos de la KB)
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- `/home` es un duplicado de la home; comparar inventario con NAV-10
