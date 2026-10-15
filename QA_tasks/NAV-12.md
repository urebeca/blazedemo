---
ticket: NAV-12
tipo: requerimiento-qa
titulo: "Confirmar defecto conocido: reservation.php devuelve 404 (BUG-01)"
sitio: https://blazedemo.com
pagina: "reservation.php (inexistente)"
elemento: "URL / enlace apuntando a reservation.php"
origen: test-plan-navegacion.md
prioridad: P3
severidad: Baja
estado: Abierto
fecha_creacion: 2026-10-07
tags: [qa, navigation, broken-link, known-bug, blazedemo]
---

# NAV-12 — reservation.php devuelve 404 (BUG-01 conocido)

## Descripción
Existe un enlace/URL `reservation.php` que no corresponde a la página real
(`reserve.php`). Este caso **confirma** el defecto BUG-01 documentado en la
base de conocimiento (`blazedemo-kb.md`, sección 8).

## Pasos de prueba
1. Abrir https://blazedemo.com/reservation.php directamente en el navegador
2. Observar el código de estado HTTP
3. Buscar en el sitio algún enlace visible que apunte a esa URL

## Resultado esperado
- **Defecto confirmado:** HTTP 404 Not Found
- Registrar si existe algún enlace visible que lleve a esta URL

## Criterios de aceptación
- [ ] Se confirma el estado 404 (o se documenta si ya fue corregido)
- [ ] Se documenta si algún enlace visible del sitio apunta a `reservation.php`
- [ ] Se actualiza la KB (sección 8) si el estado cambió

## Notas QA
- Este caso NO espera un comportamiento correcto: sirve para rastrear el bug
- Si el 404 desaparece → marcar BUG-01 como corregido y actualizar KB
