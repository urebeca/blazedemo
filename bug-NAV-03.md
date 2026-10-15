---
id: BUG-NAV-03
tipo: bug-report
titulo: "El enlace de menú 'Travel The World' produce un error al navegar desde purchase.php"
propietario: "QA Senior — Equipo de Calidad"
estado: Nuevo
severidad: Alta
prioridad: P1
entorno: Preproducción (preprod)
caso_de_prueba: NAV-03
fecha_deteccion: 2026-10-07
version_plan: "test-plan-blazedemo-navegacion.md v1.3"
tags: [bug, navegacion, menu, purchase, blazedemo, preproduccion]
---

# 🐞 BUG-NAV-03 — Error de navegación del menú "Travel The World" desde purchase.php

## Clasificación

| Campo | Valor |
|---|---|
| **ID** | BUG-NAV-03 |
| **Caso de prueba** | NAV-03 |
| **Severidad** | 🔴 Alta |
| **Prioridad** | P1 |
| **Entorno** | Preproducción (preprod) |
| **Versión / Build** | ⬜ *[PENDIENTE: versión desplegada en preprod]* |
| **Navegador / SO** | ⬜ *[PENDIENTE: completar]* |
| **Detectado por** | QA Senior |
| **Estado** | Nuevo |
| **Fecha de detección** | 2026-10-07 |

## Descripción

Al encontrarse en la página de compra (`purchase.php`), el enlace de menú
**"Travel The World"** no navega correctamente al inicio y produce un error.

## Precondiciones

- Acceso al entorno de **preproducción** de BlazeDemo
- Navegador abierto con DevTools disponibles

## Pasos para reproducir

1. Abrir la página de inicio de BlazeDemo en preproducción
2. Seleccionar origen **Boston** y destino **Rome**
3. Hacer clic en **"Find Flights"** → se muestra `reserve.php`
4. Hacer clic en **"Choose"** de la fila 1 → se muestra `purchase.php`
5. Hacer clic en el enlace de menú **"Travel The World"**
6. Observar el resultado

## Resultado esperado

- El navegador navega a `index.php` (página de inicio)
- Sin errores HTTP (ha de ser 200)
- Sin excepciones JavaScript en consola

## Resultado actual

- ❌ Se produce un **error** al navegar desde `purchase.php`
- ⬜ *[PENDIENTE: detallar la naturaleza del error]*

## Evidencia

| Tipo | Detalle |
|---|---|
| Mensaje de error | ⬜ *[PENDIENTE: pegar mensaje/pantalla de error]* |
| Código HTTP | ⬜ *[PENDIENTE: 404 / 500 / otro]* |
| Consola (F12) | ⬜ *[PENDIENTE: adjuntar mensaje de consola]* |
| Captura / vídeo | ⬜ *[PENDIENTE: adjuntar]* |

## Impacto

- El usuario **no puede volver al inicio** desde la página de compra mediante el menú.
- Afecta a la navegación del flujo de compra (paso 4 del flujo principal).
- **Workaround:** editar manualmente la URL a `index.php` o usar el enlace "home".

## Relación con la KB

- No coincide con el defecto conocido **BUG-01** (`reservation.php` → 404), que afecta a otra URL.
- Guarden en `exp003/blazedemo-kb.md`, sección 8, si procede añadir este nuevo defecto.

## ❓ Datos pendientes de completar por el reportador

1. ¿Cuál es el **mensaje de error exacto** mostrado?
2. ¿Qué **código HTTP** devuelve (404, 500, otro)?
3. ¿Qué muestra la **consola** del navegador (F12)?
4. ¿Se reproduce también en **producción** o es exclusivo de **preprod**?
5. ¿Ocurre siempre o de forma intermitente?
6. **Navegador, versión y dispositivo** utilizados.
7. ¿Se dispone de **captura o vídeo** del error?

## Control de cambios

| Fecha | Cambio |
|---|---|
| 2026-10-07 | Creación del reporte tras el FAIL de NAV-03 en preproducción (plan v1.3) |
