---
ticket: NAV-10
tipo: requerimiento-qa
titulo: "Todos los enlaces de vacation.html deben navegar sin 404"
sitio: https://blazedemo.com
pagina: vacation.html
elemento: "Conjunto de enlaces de la página"
origen: test-plan-navegacion.md
prioridad: P2
severidad: Media
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, navigation, links, broken-link, blazedemo]
---

# NAV-10 — Enlaces de vacation.html

## Descripción
Todos los enlaces existentes en `vacation.html` (menú superior y contenido)
deben apuntar a destinos válidos y no devolver errores.

## Pasos de prueba
1. Abrir https://blazedemo.com/vacation.html
2. Listar todos los enlaces de la página (inspeccionar o usar DevTools > Elements)
3. Hacer clic en cada uno de ellos
4. Anotar URL destino y código de estado HTTP

## Resultado esperado
- Cada enlace navega a un destino válido
- Ningún enlace devuelve 404/500
- `travel the world` → `index.php`; `home` → `/home`

## Criterios de aceptación
- [ ] Inventario de enlaces documentado (URL origen → URL destino)
- [ ] 0 enlaces rotos (excepto defectos conocidos documentados en KB)
- [ ] Funciona en Chrome, Firefox y Edge

## Notas QA
- Guardar el inventario como evidencia del reporte
