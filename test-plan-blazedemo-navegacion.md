---
titulo: "Plan de Pruebas — Links, botones y opciones de menú no funcionan correctamente (BlazeDemo)"
tipo: test-plan
issue: "Se ha detectado que los links, botones y opciones de menú no están funcionando correctamente en el sitio web blazedemo"
sitio: https://blazedemo.com
severidad: Alta
prioridad: P1
area: Navegación / UI
entorno: Preproducción (preprod)
autor: "QA Senior — Equipo de Calidad"
version: "1.6"
fecha_creacion: 2026-10-07
fecha_ultima_actualizacion: 2026-10-07
estado: Draft
tags: [test-plan, navegacion, links, botones, menu, blazedemo, regresion, compatibilidad, preproduccion]
---

# 📋 Plan de Pruebas — Navegación (Links, Botones y Menú)

## 1. Información general

| Campo | Detalle |
|---|---|
| **Issue / Requerimiento** | Links, botones y opciones de menú no funcionan correctamente en blazedemo.com |
| **Sitio bajo prueba** | https://blazedemo.com |
| **Entorno** | **Preproducción (preprod)** — confirmado por el reportador |
| **Severidad estimada** | 🔴 Alta (afecta la navegación principal) |
| **Prioridad** | P1 |
| **Área afectada** | Navegación / UI (menú, enlaces, botones) |
| **Tipo de prueba** | Funcional + Regresión + Compatibilidad + Accesibilidad básica |
| **Esfuerzo estimado** | 2 días-hombre |
| **Fecha de creación** | 2026-10-07 |
| **Referencia** | `exp003/blazedemo-kb.md`, `exp003/test-plan-navegacion.md` |

### 1.1 Entorno de pruebas

| Aspecto | Detalle |
|---|---|
| Entorno confirmado | Preproducción (preprod) |
| URL de preprod | `[PENDIENTE: sustituir por la URL real de preprod]` |
| Entorno de referencia | Producción (https://blazedemo.com) para comparar comportamiento |
| Objetivo de la comparación | Determinar si el fallo es **exclusivo de preprod** o se reproduce también en producción |
| Datos | Los datos de preprod pueden diferir de producción → no comparar valores, sino comportamiento |
| Configuración a registrar | Versión de despliegue, navegador, SO, fecha/hora y resultado de cada ejecución |

> ⚠️ **Acción previa obligatoria:** confirmar la URL/host de preproducción y que el
> equipo tiene acceso antes de iniciar la ejecución.

> **Glosario para QA junior:** *Happy path* = camino ideal sin errores. *Boundary* =
> valor límite (primero/último). *Regresión* = re-ejecutar pruebas tras un cambio.
> *Broken link* = enlace que devuelve error (404). *Cross-browser* = probar en varios navegadores.

---

## 2. Objetivos

1. **Confirmar y delimitar** el defecto reportado en **preproducción**: qué links, botones y opciones de menú fallan realmente, en qué páginas y bajo qué condiciones.
2. **Comparar con producción** para determinar si el fallo es exclusivo de preprod (regresión de despliegue) o es general del sitio.
3. **Identificar el patrón** del fallo (todos los elementos vs. algunos; según página, navegador o dispositivo).
3. **Determinar el alcance funcional**: si el fallo rompe el flujo completo de compra (happy path).
4. **Aportar evidencia reproducible** (steps to reproduce + código HTTP + consola) para el reporte y la corrección.
5. **Validar la corrección** mediante re-testing de los casos que fallaron y una regresión de navegación.

---

## 3. Alcance

### 3.1 Dentro del alcance ✅

| Categoría | Elementos |
|---|---|
| Menú superior | Enlaces "Travel The World" y "home" en todas las páginas |
| Enlaces de contenido | "destination of the week! The Beach!" (index), enlaces de `vacation.html` y `/home` |
| Botones | "Find Flights" (index), "Choose" (reserve, 5 filas), submit del formulario (purchase) |
| Navegación por teclado | Tab / Enter / Space sobre menú, enlaces y botones |
| Códigos HTTP | Verificación de 404/500 en cada destino |
| Compatibilidad | Chrome, Firefox, Edge y móvil (360px) |

### 3.2 Fuera del alcance ❌

| Excluido | Motivo |
|---|---|
| Validación de campos del formulario de compra | Cubierto por otro issue |
| Cálculo de precios / Total Cost | Cubierto por otro issue |
| Diseño visual y responsive fino | Salvo que impida el clic/uso |
| API / backend | No existe en el sitio demo |
| Pruebas de carga / estrés | Sin backend real |
| Corrección del defecto | Este plan solo prueba y reporta |

---

## 4. Análisis del requerimiento

El requerimiento es **genérico** ("no funcionan correctamente") y no especifica
página, elemento, navegador ni error. Se desglosa en puntos verificables:

| # | Punto verificable | Criterio |
|---|---|---|
| V1 | Los enlaces del menú resuelven a una URL válida | Sin 404/500; página destino carga |
| V2 | Los enlaces del contenido navegan correctamente | URL cambia; contenido correcto |
| V3 | Los botones responden al clic | Se dispara la acción esperada |
| V4 | Los botones/enlaces preservan los datos de origen | Datos coherentes entre páginas |
| V5 | No hay errores JavaScript bloqueantes | Consola sin excepciones no controladas |
| V6 | Los elementos son activables por teclado | Enter/Space funcionan |
| V7 | El comportamiento es consistente entre navegadores | Mismo resultado en Chrome/Firefox/Edge |

### Reglas de negocio (RN)

| ID | Regla |
|---|---|
| RN-01 | Todo enlace del menú debe llevar a una página existente sin error HTTP |
| RN-02 | "Find Flights" solo es válido con origen y destino seleccionados (distintos de "Choose") |
| RN-03 | "Choose" debe abrir `purchase.php` con los datos del vuelo seleccionado |
| RN-04 | `Total Cost = Price + Arbitrary Fees and Taxes` |
| RN-05 | Los resultados de vuelos son aleatorios → validar estructura/formato, no valores fijos |
| RN-06 | No existe persistencia de datos entre sesiones |

---

## 5. Estrategia de pruebas

| Tipo de prueba | ¿Aplica? | Enfoque |
|---|---|---|
| Funcional (navegación) | ✅ Sí | Recorrer 100% de links/botones/menús y validar destino |
| Regresión | ✅ Sí | Re-ejecutar todos los casos NAV tras cada fix |
| Compatibilidad (cross-browser) | ✅ Sí | Chrome, Firefox, Edge + móvil |
| Accesibilidad básica | ✅ Sí | Navegación por teclado |
| Exploratoria | ✅ Sí | Buscar fallos no listados al recorrer el sitio |
| UI / Visual | ⚠️ Parcial | Solo si el fallo impide la interacción |
| Rendimiento | ⚠️ Opcional | Solo tiempo de navegación > 3 s |
| Seguridad | ❌ No | Fuera del alcance del issue de navegación |
| API / Carga | ❌ No | No hay backend ni API |

**Técnica principal:** *link crawling* (recorrido de todos los enlaces) + *pruebas
negativas* (casos borde) + matriz cross-browser.

---

## 6. Casos de prueba

> IDs con prefijo **NAV-**. Prioridad: P0 crítico, P1 importante, P2 medio, P3 bajo.

### 6.1 Menú superior (en todas las páginas)

| ID | Título | Pasos | Resultado esperado | Prioridad |
|---|---|---|---|---|
| NAV-01 | "Travel The World" desde index | Abrir inicio → clic "Travel The World" | Navega a `index.php`, sin error | P1 |
| NAV-02 | "Travel The World" desde reserve | Boston→Rome→Find Flights → clic "Travel The World" | Navega al inicio | P1 |
| NAV-03 | "Travel The World" desde purchase | Elegir vuelo → clic "Travel The World" | Navega al inicio | P1 |
| NAV-04 | "home" desde index | Clic en "home" | Navega a `/home` sin 404 | P1 |
| NAV-05 | "home" desde reserve | Elegir vuelo → clic "home" | Navega a `/home` | P1 |
| NAV-06 | "home" desde purchase | Elegir vuelo → clic "home" | Navega a `/home` | P1 |
| NAV-07 | "home" desde vacation.html | Abrir vacation → clic "home" | Navega a `/home` | P2 |

### 6.2 Enlaces de contenido

| ID | Título | Pasos | Resultado esperado | Prioridad |
|---|---|---|---|---|
| NAV-08 | Enlace "The Beach!" de la home | Clic en "destination of the week! The Beach!" | Abre `vacation.html` con contenido | P2 |
| NAV-09 | Inventario de enlaces de vacation.html | Listar y clicar todos | Todos navegan; 0 enlaces rotos | P2 |
| NAV-10 | Inventario de enlaces de /home | Listar y clicar todos | Todos navegan; 0 enlaces rotos | P2 |
| NAV-11 | Enlace roto conocido reservation.php | GET `/reservation.php` | ⚠️ Confirmar 404 (BUG-01 de la KB) | P3 |

### 6.3 Botones del flujo principal

| ID | Título | Pasos | Resultado esperado | Prioridad |
|---|---|---|---|---|
| NAV-12 | "Find Flights" con ciudades válidas | Boston→Rome → clic Find Flights | Tabla en `reserve.php` con ≥1 fila y 5 columnas | P0 |
| NAV-13 | "Find Flights" sin seleccionar | Dejar "Choose" → clic Find Flights | Manejo controlado; sin 500 ni pantalla en blanco | P1 |
| NAV-14 | "Choose" fila 1 | Anotar fila 1 → clic Choose | `purchase.php` con datos de fila 1 | P0 |
| NAV-15 | "Choose" última fila | Anotar fila 5 → clic Choose | `purchase.php` con datos de fila 5 | P1 |
| NAV-16 | Doble clic rápido en "Choose" | 2 clics en < 500 ms | 1 sola navegación; sin error JS | P2 |
| NAV-17 | Submit del formulario de compra | Rellenar válido → clic submit | El botón procesa el envío (sin 500) | P1 |

### 6.4 Accesibilidad por teclado

| ID | Título | Pasos | Resultado esperado | Prioridad |
|---|---|---|---|---|
| NAV-18 | Tabulación global | Tab desde el inicio | Foco visible recorre menú→dropdowns→botón | P2 |
| NAV-19 | Activar enlace con Enter | Foco en "home" + Enter | Navega a `/home` | P2 |
| NAV-20 | Activar botón con Enter/Space | Foco en "Find Flights"/"Choose" + Enter | Ejecuta igual que el clic | P2 |

### 6.5 Navegación secundaria (nuevo caso)

| ID | Título | Pasos | Resultado esperado | Prioridad |
|---|---|---|---|---|
| NAV-21 | Navegar en el enlace "cambiar vuelo" | Desde `purchase.php`, clic en el enlace "cambiar vuelo" | Navega a la tabla de vuelos (`reserve.php`) para elegir otro vuelo, sin error | P1 |

> ❓ **Caso nuevo identificado por el reportador.** La descripción es preliminar
> ("navegar en el link cambiar vuelo"); ver preguntas abiertas antes de ejecutar.

**Total: 21 casos** (correlativos, sin huecos).

---

## 7. Datos de prueba

| Dato | Valor válido | Valor inválido / borde |
|---|---|---|
| Origen | Boston | "Choose" (sin seleccionar) |
| Destino | Rome | "Choose"; origen = destino (Boston → Boston) |
| Fila de la tabla | 1 y 5 (primera/última) | Doble clic rápido |
| Formulario | Name: Ana Test; Address: Calle 123; City: Madrid; State: MD; Zip: 28001; Card: Visa `4111111111111111`; fecha futura | — (validación fuera de alcance) |
| Entorno | Preproducción (preprod) | — |
| Entorno de comparación | Producción (https://blazedemo.com) | — |
| Navegadores | Chrome, Firefox, Edge | — |
| Viewport | 1920px y 360px | — |

---

## 8. Matriz de navegadores / dispositivos

Ejecutar **NAV-01 a NAV-21** en **preproducción** y, ante cualquier fallo,
**reproducir en producción** para comparar el comportamiento.

| Navegador | Versión | SO | Viewport | Preprod | Prod (comparación) |
|---|---|---|---|---|---|
| Chrome | latest | Windows 11 | 1920x1080 | ⬜ | ⬜ |
| Firefox | latest | Windows 11 | 1920x1080 | ⬜ | ⬜ |
| Edge | latest | Windows 11 | 1920x1080 | ⬜ | ⬜ |
| Chrome Mobile | latest | Android | 360x800 | ⬜ | — |
| Safari | latest | iOS | — | ⬜ (opcional) | — |

---

## 9. Criterios de entrada y salida

### Entrada
- [ ] Requerimiento recibido y **entorno de preproducción accesible** (URL confirmada)
- [ ] Acceso a preproducción verificado y credenciales (si aplican) disponibles
- [ ] Defecto confirmado en preproducción por el reportador
- [ ] Navegadores, DevTools y acceso a producción (para comparar) disponibles
- [ ] Dos revisiones de la KB (`blazedemo-kb.md`, sección 8) realizadas

### Salida
- [ ] 100% de los 20 casos ejecutados **en preproducción**
- [ ] Todos los P0/P1 en estado PASS tras el fix
- [ ] Comparación preprod vs. producción documentada para cada fallo
- [ ] Matriz de navegadores completada
- [ ] Bug report con steps to reproduce, entorno, código HTTP y evidencias
- [ ] Regresión de navegación ejecutada y aprobada
- [ ] Sign-off del QA responsable

---

## 10. Riesgos y mitigación

| Riesgo | Impacto | Mitigación |
|---|---|---|
| **Fallo exclusivo de preproducción** (no reproducible en producción) | Alto | Comparar siempre contra producción; adjuntar evidencias de ambos entornos |
| **Datos/configuración de preprod distintos** a producción | Medio | No comparar valores, solo comportamiento; registrar versión de despliegue |
| Requerimiento aún ambiguo sobre el elemento concreto ("no funciona") | Alto | Ejecutar recorrido completo; documentar exactamente qué falla |
| Datos de vuelos aleatorios impiden aserciones fijas | Medio | Validar formato/estructura y continuidad, no valores fijos |
| Fallo dependiente del navegador o red | Medio | Matriz cross-browser y repetir pruebas en sesión limpia |
| Defecto ya conocido (BUG-01 `reservation.php` 404) se confunde con el nuevo | Bajo | Contrastar con la KB para no duplicar reporte |

---

## 11. Entregables

1. **Matriz de ejecución** de los 20 casos (estado por caso y navegador)
2. **Diagnóstico del patrón** del fallo (qué falla, dónde y en qué condiciones)
3. **Bug report** con steps to reproduce, código HTTP, consola y capturas/vídeo
4. **Inventario de enlaces** con su estado (incluye enlaces rotos)
5. **Reporte de re-testing y regresión** tras la corrección

---

## ⚠️ Incidencias detectadas en el requerimiento

| ID | Incidencia | Acción sugerida |
|---|---|---|
| INC-01 | El requerimiento no indica **qué** link/botón/menú falla ni en qué **página** | Solicitar pasos concretos al reportador |
| INC-02 | No indica **navegador ni dispositivo** donde ocurre | Asumir compatible y ejecutar matriz cross-browser |
| INC-03 | No hay **captura ni mensaje de error** | Se documentará el error real durante la ejecución |
| INC-04 | Parte de la navegación **sí funciona** según la KB (solo `reservation.php` falla conocido) | Verificar si el reporte se refiere a BUG-01 ya documentado |
| INC-05 | ✅ **Resuelto:** confirmado que el fallo ocurre en **preproducción** | Plan actualizado con entorno preprod y comparación con producción |

---

## ❓ Preguntas abiertas para el product owner

1. ¿Cuál es la **URL/host exacta de preproducción** y tenemos acceso?
2. ¿En qué página(s) y con qué elemento concreto se observó el fallo?
3. ¿El fallo se reproduce también en **producción** o es exclusivo de preprod?
4. ¿En qué navegador, versión y dispositivo?
5. ¿Ocurre siempre o de forma intermitente? ¿Con qué pasos exactos?
6. ¿Qué versión de despliegue está desplegada en preprod actualmente?
7. **NAV-21 (nuevo):** ¿dónde se ubica exactamente el enlace **"cambiar vuelo"** y a qué página debe llevar?

---

## 12. Ejecución y resultados

### 12.1 Ronda de verificación de la corrección (fix verification)

Fecha de ejecución: 2026-10-07 · Entorno: **Preproducción (preprod)**
Propósito: confirmar que las soluciones aplicadas al defecto de navegación funcionan.

| Caso | Título | Entorno | Resultado | Evidencia / Observaciones |
|---|---|---|---|---|
| NAV-01 | "Travel The World" desde index | Preprod | ✅ **PASS** | El enlace navega a `index.php` sin error |
| NAV-03 | "Travel The World" desde purchase | Preprod | ❌ **FAIL** | **Error al navegar desde `purchase.php`** → ver `exp003/bug-NAV-03.md` |
| NAV-08 | Enlace "destination of the week! The Beach!" | Preprod | ✅ **PASS** | Abre `vacation.html` con el contenido esperado |
| NAV-10 | Inventario de enlaces de `/home` | Preprod | ⛔ **BLOCKED** | No ejecutable por **alto grado de dependencia** (ver 12.3) |
| NAV-14 | "Choose" fila 1 → purchase con datos del vuelo | Preprod | ✅ **PASS** | Navega a `purchase.php`; datos del vuelo correctos |
| NAV-15 | "Choose" última fila | Preprod | ⛔ **BLOCKED** | No ejecutable (fila dinámica/última fila no accesible — ver 12.3) |
| NAV-21 | Enlace "cambiar vuelo" (nuevo) | Preprod | ⬜ **NOT RUN** | Caso nuevo sin ejecutar; requiere aclarar requisito |

**Resultado de la ronda:** 3 PASS / 1 FAIL / 2 BLOCKED / 1 NOT RUN de 7 casos tratados.

### 12.2 Cobertura

> ⚠️ Solo se ejecutaron **4 de 21** casos con veredicto. La verificación es
> **parcial** y no permite cerrar el defecto sin completar la regresión.

| Estado | Casos | Cantidad |
|---|---|---|
| ✅ PASS | NAV-01, NAV-08, NAV-14 | 3 |
| ❌ FAIL | NAV-03 | 1 |
| ⛔ BLOCKED | NAV-10, NAV-15 | 2 |
| ⬜ Pendiente / NOT RUN | NAV-02, NAV-04–07, NAV-09, NAV-11–13, NAV-16–21 | 15 |
| **Total** | | **21** |

### 12.3 Bloqueos (blocked)

| Caso | Motivo del bloqueo | Dependencia | Desbloqueo requerido |
|---|---|---|---|
| NAV-10 | **Alto grado de dependencia** — el inventario de enlaces de `/home` no puede ejecutarse de forma aislada | Acceso/navegación a la página `/home` y sus enlaces (relacionado con NAV-04/05/06) | Confirmar que `/home` es accesible y estable; ejecutar tras resolver las dependencias de menú |
| NAV-15 | No ejecutable — selección de la **última fila** de la tabla dependiente de datos aleatorios / no accesible al clic | Tabla de resultados dinámica; definir "última fila" de forma robusta | Usar selector de última fila dinámico (`tr:last-child`), scroll previo y datos anotados antes del clic |

> ❓ *"Grado de dependencia" de NAV-10 debe concretarse:* ¿depende de la corrección
> de otro caso, de un servicio externo, de datos de preprod o de otra página no
> disponible? Sin esa precisión, NAV-10 no puede planificarse.

### 12.4 Recomendación del QA

- **No cerrar el defecto.** Hay 1 FAIL (NAV-03) y 2 BLOCKED (NAV-10, NAV-15).
- Copiar al equipo de desarrollo el **mensaje de error exacto + código HTTP + consola** de NAV-03.
- Resolver los bloqueos: concretar la dependencia de NAV-10 y la técnica de la última fila para NAV-15.
- Aclarar el requisito de NAV-21 (nuevo) antes de ejecutarlo.
- Ejecutar el P0 restante (**NAV-12** "Find Flights") y regresión completa de navegación.
- Verificar si NAV-03 se reproduce también en **producción**.

> 📄 Reporte consolidado de ejecución: `exp003/reporte-ejecucion.md`

---

## 13. Control de versiones del documento

| Versión | Fecha | Autor | Cambio |
|---|---|---|---|
| 1.0 | 2026-10-07 | QA Senior — Equipo de Calidad | Creación del plan: 20 casos NAV, hipótesis, riesgos, incidencias y preguntas abiertas |
| 1.1 | 2026-10-07 | QA Senior — Equipo de Calidad | Confirmado entorno **preproducción**: nueva sección 1.1, comparación con producción, matriz por entorno, riesgos y preguntas actualizadas |
| 1.2 | 2026-10-07 | QA Senior — Equipo de Calidad | Añadida sección 12 "Ejecución y resultados": verificación de fix NAV-01/08/14 (3/3 PASS) y cobertura pendiente |
| 1.3 | 2026-10-07 | QA Senior — Equipo de Calidad | NAV-03 registrado como **FAIL** en preprod; cobertura 4/20; bug report `bug-NAV-03.md` |
| 1.4 | 2026-10-07 | QA Senior — Equipo de Calidad | NAV-10 registrado como **BLOCKED** por dependencia; nueva sección 12.3 Bloqueos; cobertura 5/20 |
| 1.5 | 2026-10-07 | QA Senior — Equipo de Calidad | Añadido nuevo caso **NAV-21** "navegar en el link cambiar vuelo" (sección 6.5); total 21 casos |
| 1.6 | 2026-10-07 | QA Senior — Equipo de Calidad | Registrados NAV-15 (BLOCKED) y NAV-21 (NOT RUN); cobertura 4/21; enlace a `reporte-ejecucion.md` |
