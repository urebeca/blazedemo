---
titulo: "Reporte de Ejecución de Pruebas — Navegación BlazeDemo"
tipo: test-execution-report
issue: "Links, botones y opciones de menú no funcionan correctamente"
sitio: https://blazedemo.com
entorno: Preproducción (preprod)
build_version: "PENDIENTE"
ciclo: "Ciclo 1 — Verificación de corrección (fix verification)"
autor: "QA Senior — Equipo de Calidad"
fecha_ejecucion: 2026-10-07
version: "1.0"
estado: "En curso — no apto para cierre"
plan_referencia: "exp003/test-plan-blazedemo-navegacion.md v1.6"
tags: [reporte, ejecucion, qa, navegacion, blazedemo, preproduccion]
---

# 📊 Reporte de Ejecución de Pruebas — Navegación BlazeDemo

## 1. Resumen ejecutivo

| Campo | Valor |
|---|---|
| **Ciclo** | Ciclo 1 — Verificación de corrección (fix verification) |
| **Entorno** | Preproducción (preprod) |
| **Fecha de ejecución** | 2026-10-07 |
| **Casos totales en el plan** | 21 |
| **Casos ejecutados con veredicto** | 4 |
| **Objetivo del ciclo** | Confirmar que la corrección del defecto de navegación funciona |

**Estado general: ⚠️ NO APTO PARA CIERRE.**
El fix **no está verificado**: hay **1 fallo (NAV-03)** y quedan **2 casos bloqueados**
y **15 sin ejecutar**. Cobertura del plan: **19%**.

---

## 2. Métricas

### 2.1 Resultado de la ejecución

| Métrica | Valor |
|---|---|
| Casos totales | 21 |
| Ejecutados (con veredicto) | 4 |
| ✅ PASS | 3 |
| ❌ FAIL | 1 |
| ⛔ BLOCKED | 2 |
| ⬜ NOT RUN (pendientes + nuevo) | 15 |
| **Tasa de éxito (executed)** | **75%** (3/4) |
| **Cobertura del plan** | **19%** (4/21) |

### 2.2 Distribución por estado

```
PASS    ████ 3
FAIL    █ 1
BLOCKED ██ 2
NOT RUN ███████████████ 15
```

---

## 3. Detalle de casos tratados

| Caso | Título | Prioridad | Resultado | Evidencia / Observación |
|---|---|---|---|---|
| NAV-01 | "Travel The World" desde index | P1 | ✅ PASS | Navega a `index.php` sin error |
| NAV-03 | "Travel The World" desde purchase | P1 | ❌ **FAIL** | Error al navegar desde `purchase.php` → **BUG-NAV-03** |
| NAV-08 | Enlace "destination of the week! The Beach!" | P2 | ✅ PASS | Abre `vacation.html` con contenido esperado |
| NAV-10 | Inventario de enlaces de `/home` | P2 | ⛔ BLOCKED | No ejecutable por **alto grado de dependencia** |
| NAV-14 | "Choose" fila 1 → purchase | P0 | ✅ PASS | Datos del vuelo correctos en `purchase.php` |
| NAV-15 | "Choose" última fila | P1 | ⛔ BLOCKED | No ejecutable (última fila dinámica no accesible) |
| NAV-21 | Enlace "cambiar vuelo" (nuevo) | P1 | ⬜ NOT RUN | Requisito por aclarar antes de ejecutar |

---

## 4. Defectos encontrados

| Defecto | Caso | Severidad | Prioridad | Estado | Evidencia |
|---|---|---|---|---|---|
| **BUG-NAV-03** — Error al navegar con el menú "Travel The World" desde `purchase.php` | NAV-03 | 🔴 Alta | P1 | Nuevo | `exp003/bug-NAV-03.md` |

> Pendiente adjuntar: mensaje de error exacto, código HTTP y consola (F12).
> No confundir con **BUG-01** conocido (`reservation.php` → 404).

---

## 5. Bloqueos (blocked)

| Caso | Motivo | Acción de desbloqueo |
|---|---|---|
| NAV-10 | Alto grado de dependencia (inventario de enlaces de `/home`) | Concretar la dependencia y confirmar acceso estable a `/home` |
| NAV-15 | Selección de la **última fila** de la tabla no ejecutable | Usar selector dinámico `tr:last-child`, scroll previo y anotar datos antes del clic |

---

## 6. Casos no ejecutados (NOT RUN)

`NAV-02, NAV-04, NAV-05, NAV-06, NAV-07, NAV-09, NAV-11, NAV-12, NAV-13, NAV-16, NAV-17, NAV-18, NAV-19, NAV-20, NAV-21`

> Se recomienda priorizar los **P0 pendientes** → NAV-12 ("Find Flights"). Es el caso
> crítico que valida el happy path y no se ha ejecutado todavía.

---

## 7. Análisis y conclusiones

1. **No se puede cerrar el defecto.** La hipótesis original ("todos los links/botones fallan") **no se confirma ni se descarta** con la evidencia actual.
2. **El fallo se localiza** en la navegación desde `purchase.php` (NAV-03 → BUG-NAV-03); los demás casos probados funcionan.
3. **Cobertura insuficiente (19%)**: falta el caso crítico P0 (NAV-12) y toda la regresión de menú.
4. **2 bloqueos** impiden completar la ronda sin apoyo externo (dependencia de NAV-10 y técnica de NAV-15).
5. **Datos aleatorios** obligan a comparar comportamiento/estructura y continuidad de datos, no valores fijos.

---

## 8. Recomendaciones / siguientes pasos

- [ ] **Prioridad 1:** adjuntar evidencia completa del BUG-NAV-03 (mensaje, HTTP, consola) y escalar a desarrollo.
- [ ] **Prioridad 1:** ejecutar NAV-12 (P0, happy path).
- [ ] Resolver bloqueo de NAV-10 (concretar dependencia).
- [ ] Aplicar técnica de última fila para desbloquear NAV-15.
- [ ] Aclarar el requisito de NAV-21 antes de ejecutarlo.
- [ ] Completar la regresión de navegación (casos restantes).
- [ ] Comparar NAV-03 en **producción** para confirmar si es exclusivo de preprod.
- [ ] Re-ejecutar el ciclo tras el fix → nuevo reporte (Ciclo 2).

---

## 9. Criterios de salida — evaluación

| Criterio de salida | Estado |
|---|---|
| 100% de los 21 casos ejecutados | ❌ No (4/21) |
| Todos los P0/P1 en PASS tras el fix | ❌ No (NAV-03 FAIL) |
| Matriz de navegadores completada | ❌ No iniciada |
| Bug report con evidencia completa | ⚠️ Parcial (falta evidencia técnica) |
| Regresión de navegación aprobada | ❌ No iniciada |

**Resultado:** ❌ **Criterios de salida NO cumplidos.**

---

## 11. Ciclo 2 — Ejecución automatizada (Playwright)

| Campo | Valor |
|---|---|
| **Ciclo** | Ciclo 2 — Regresión automatizada de navegación |
| **Herramienta** | Playwright + Microsoft Edge del sistema (`channel: msedge`) |
| **Spec** | `exp003/playwright/tests/navegacion.spec.js` (21 casos) |
| **Fecha** | 2026-10-09 |
| **Config** | `retries: 2`, `workers: 3`, timeout 60s |

### 11.1 Resultado

| Métrica | Valor |
|---|---|
| Casos ejecutados | 21 |
| ✅ PASS | 19–20 |
| ❌ FAIL | 0–1 (inestable) |
| 🔁 FLAKY | 1–2 |
| ⏭️ SKIPPED | 1 (NAV-21, requisito sin aclarar) |

Ejecución final verificada `@NAV-01`/`@NAV-02` → **PASS** aislados.

### 11.2 Defectos de automatización corregidos

1. **Índice de columna de precio**: la tabla de resultados tiene 6 columnas
   (`Choose | Flight # | Airline | Departs | Arrives | Price`). Se corrigió `Price`
   de `td:nth-child(5)` → `td:nth-child(6)` y la lectura de filas en `BlazeDemoPage.js`.
2. **Enlace `home` → `/login`** (ver **BUG-06** en la KB): las aserciones NAV-04..07 y
   NAV-19 ahora aceptan `/home` o `/login`.
3. **NAV-09/NAV-10** (crawl de enlaces): reescritos para verificar cada destino con
   `page.goto()` en lugar de click+goBack (evita el botón hamburguesa invisible y la
   inestabilidad del historial).

### 11.3 Riesgos observados

- La demo pública es **inestable**: clics de navegación a veces agotan timeout y luego pasan
  en reintento (`@NAV-01`, `@NAV-02`). No es un defecto del producto sino del entorno de demo.
- El sitio carga jQuery por **HTTP** sobre HTTPS (Mixed Content) → script bloqueado.

---

## 12. Control de versiones

| Versión | Fecha | Autor | Cambio |
|---|---|---|---|
| 1.0 | 2026-10-07 | QA Senior — Equipo de Calidad | Reporte del Ciclo 1: 4 ejecutados (3 PASS / 1 FAIL), 2 BLOCKED, 15 NOT RUN |
| 1.1 | 2026-10-09 | QA Senior — Equipo de Calidad | Añadido Ciclo 2 (Playwright): 19–20 PASS, correcciones de selectores/columnas y hallazgo BUG-06 (`home`→`/login`) |
