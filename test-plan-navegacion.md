---
titulo: "Plan de Pruebas — Issue: Links, buttons and menu options aren't accessed correctly"
tipo: test-plan
sitio: https://blazedemo.com
issue: "Links, buttons and menu options aren't accessed correctly"
severidad: Alta
prioridad: P1
autor: "QA — Equipo de Calidad"
version: "1.0"
fecha_creacion: 2026-10-07
estado: Draft
tags: [test-plan, navigation, links, buttons, menu, blazedemo]
---

# 📋 Plan de Pruebas — Navegación (Links, Buttons, Menu Options)

## 1. Información general

| Campo | Detalle |
|---|---|
| **Issue** | Links, buttons and menu options aren't accessed correctly |
| **Severidad** | 🔴 Alta (bloquea la navegación principal del usuario) |
| **Prioridad** | P1 |
| **Área afectada** | Navegación / UI |
| **Sitio bajo prueba** | https://blazedemo.com |
| **Tipo de prueba** | Funcional + Regresión + Compatibilidad |
| **Esfuerzo estimado** | 2 días-hombre |
| **KB de referencia** | `exp003/blazedemo-kb.md` |

---

## 2. Objetivos

1. **Confirmar y delimitar** el defecto: qué links, botones y opciones de menú fallan, en qué páginas y navegadores.
2. **Identificar el patrón** del fallo (todos los elementos vs. solo algunos; client-side vs. server-side).
3. **Verificar el alcance real**: si el fallo rompe el flujo completo de compra (happy path).
4. **Validar la corrección** una vez entregado el fix (re-testing + regresión).

---

## 3. Alcance

### 3.1 Dentro del alcance ✅

| Elemento | Ubicación |
|---|---|
| Menú: "Travel The World" | Todas las páginas |
| Menú: "home" | Todas las páginas |
| Enlace "destination of the week! The Beach!" | `index.php` |
| Botón "Find Flights" | `index.php` |
| Botón "Choose" (5 por tabla) | `reserve.php` |
| Enlaces en `vacation.html` y `home` | Páginas secundarias |
| Navegación por teclado (Tab / Enter / Space) | Todas las páginas |
| Botón submit del formulario | `purchase.php` |

### 3.2 Fuera del alcance ❌

- Validación de campos del formulario de compra (otro issue).
- Cálculo de precios / Total Cost.
- Diseño visual (salvo que impida el clic).
- API/backend (no existe) y pruebas de carga.

---

## 4. Hipótesis del defecto (a verificar)

| # | Hipótesis | Cómo verificarla |
|---|---|---|
| H1 | Enlaces apuntan a URLs incorrectas/inexistentes (ej. `reservation.php` → 404) | Inspeccionar `href` y navegar |
| H2 | Botones sin manejador de evento (no responden al clic) | Clic y comprobar que no cambia la URL |
| H3 | Elementos superpuestos u ocultos (no accesibles físicamente) | Inspección visual + DevTools |
| H4 | Problema solo en ciertos navegadores/resoluciones | Matriz cross-browser (sección 7) |
| H5 | Error de JS en consola que impide los handlers | Revisar Console del DevTools |

---

## 5. Estrategia y enfoque

| Fase | Acción | Entregable |
|---|---|---|
| 1 — Reproducción | Recorrer 100% de links/botones/menús en Chrome anotando fallos | Matriz de resultados |
| 2 — Caracterización | Determinar patrón (¿todos? ¿solo algunos? ¿solo 404?) | Diagnóstico inicial |
| 3 — Cross-browser | Repetir en Firefox, Edge y móvil | Matriz navegadores |
| 4 — Reporte | Documentar steps to reproduce + evidencias | Bug report |
| 5 — Fix | Re-testing de casos fallidos + regresión completa | Sign-off |

---

## 6. Casos de prueba

### 6.1 Menú superior (ejecutar en TODAS las páginas)

| ID | Elemento | Pasos | Resultado esperado | Prioridad |
|---|---|---|---|---|
| NAV-01 | "Travel The World" desde `index.php` | Clic | Navega a `index.php` sin error | P1 |
| NAV-02 | "Travel The World" desde `reserve.php` | Clic | Navega al inicio | P1 |
| NAV-03 | "Travel The World" desde `purchase.php` | Clic | Navega al inicio | P1 |
| NAV-04 | "Travel The World" desde `vacation.html` | Clic | Navega al inicio | P2 |
| NAV-05 | "home" desde `index.php` | Clic | Navega a `/home` | P1 |
| NAV-06 | "home" desde `reserve.php` | Clic | Navega a `/home` | P1 |
| NAV-07 | "home" desde `purchase.php` | Clic | Navega a `/home` | P1 |
| NAV-08 | "home" desde `vacation.html` | Clic | Navega a `/home` | P2 |

### 6.2 Enlaces de contenido

| ID | Elemento | Pasos | Resultado esperado | Prioridad |
|---|---|---|---|---|
| NAV-09 | "destination of the week! The Beach!" | Clic desde `index.php` | Navega a `vacation.html` | P2 |
| NAV-10 | Enlaces en `vacation.html` | Recorrer todos | Todos navegan sin 404 | P2 |
| NAV-11 | Enlaces en `home` | Recorrer todos | Todos navegan sin 404 | P2 |
| NAV-12 | `reservation.php` (roto conocido) | Acceder manualmente | ⚠️ Esperado: **404** → confirma BUG-01 KB | P3 |

### 6.3 Botones del flujo principal

| ID | Elemento | Pasos | Resultado esperado | Prioridad |
|---|---|---|---|---|
| NAV-13 | "Find Flights" con ciudades elegidas | Boston → Rome → clic | Navega a `reserve.php` con tabla | **P0** |
| NAV-14 | "Find Flights" sin seleccionar | Clic con "Choose" en ambos | Comportamiento definido, sin crash | P1 |
| NAV-15 | "Choose" fila 1 | Clic en 1ª fila | Navega a `purchase.php` con datos de esa fila | **P0** |
| NAV-16 | "Choose" fila 3 | Clic en 3ª fila | Navega con datos de la fila 3 | P1 |
| NAV-17 | "Choose" fila 5 (última) | Clic en última fila | Navega correctamente | P1 |
| NAV-18 | "Choose" con doble clic rápido | 2 clics rápidos | Sin doble navegación ni error | P2 |
| NAV-19 | Submit del formulario (fixture) | Datos válidos → submit | El botón responde y procesa | P1 |

### 6.4 Accesibilidad por teclado

| ID | Elemento | Pasos | Resultado esperado | Prioridad |
|---|---|---|---|---|
| NAV-20 | Tabulación global | Tab desde el inicio | Foco visible: menú → dropdowns → botón | P2 |
| NAV-21 | Enlace con Enter | Foco en "home" + Enter | Navega | P2 |
| NAV-22 | Botón con Enter/Space | Foco en "Find Flights" + Enter | Ejecuta la acción | P2 |

---

## 7. Matriz de navegadores (Fase 3)

Ejecutar **NAV-01 a NAV-19** en:

| Navegador | SO | Estado |
|---|---|---|
| Chrome (latest) | Windows 11 | ⬜ |
| Firefox (latest) | Windows 11 | ⬜ |
| Edge (latest) | Windows 11 | ⬜ |
| Chrome Mobile (360px) | Android | ⬜ |
| Safari | iOS | ⬜ *(opcional)* |

---

## 8. Datos de prueba

| Dato | Valor |
|---|---|
| Origen | Boston |
| Destino | Rome |
| Dropdown por defecto | "Choose" (para NAV-14) |
| Filas de referencia | Fila 1 y 3 → comparar Airline/Flight/Price entre `reserve.php` y `purchase.php` |

---

## 9. Criterios de entrada y salida

### Entrada
- [ ] Issue confirmado con steps to reproduce
- [ ] Sitio accesible: https://blazedemo.com
- [ ] KB `blazedemo-kb.md` revisada (sección 8: bugs conocidos)
- [ ] Navegadores instalados (Chrome, Firefox, Edge)

### Salida
- [ ] 100% de los 22 casos ejecutados
- [ ] Todos los P0/P1 en PASS tras el fix
- [ ] Matriz de navegadores completada
- [ ] Bug report con evidencias (screenshot/video + URL + pasos)
- [ ] Aprobación (sign-off) del QA responsable

---

## 10. Riesgos y mitigación

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Datos aleatorios impiden comparar resultados | Medio | Asersar formato/estructura, no valores fijos |
| Fallo dependiente del navegador | Medio | Ejecutar matriz completa (sección 7) |
| Issue ya documentado en KB (BUG-01) | Bajo | Distinguir bug conocido del nuevo |
| Cambios del sitio durante la prueba | Medio | Congelar fecha/hora de ejecución en el reporte |

---

## 11. Entregables

1. Matriz de ejecución de los 22 casos (estado por caso y navegador)
2. Bug report con steps to reproduce y evidencias
3. Diagnóstico del patrón del fallo (H1–H5)
4. Reporte de re-testing y regresión tras el fix

---

## 12. Control de versiones

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 2026-10-07 | Creación del plan: 22 casos NAV, 5 hipótesis, 5 fases |
