---
titulo: "Prompt maestro para generar un Plan de Pruebas desde un Requerimiento"
tipo: prompt-template
uso: "Pegar el requerimiento al final antes de enviarlo a la IA"
autor: "QA — Equipo de Calidad"
version: "1.0"
fecha_creacion: 2026-10-07
tags: [prompt, test-plan, template, qa, requirements]
---

# 🤖 Prompt maestro — Generar Plan de Pruebas desde un Requerimiento

> **Cómo usarlo:**
> 1. Copia todo el contenido de abajo (desde "INICIO DEL PROMPT").
> 2. Pega el requerimiento en el lugar indicado al final.
> 3. Envíalo a la IA. Opcional: ajusta los campos `[opcional: ...]`.
> 4. Guarda el resultado como `test-plan-<nombre-issue>.md` en `exp003/`.

---

## INICIO DEL PROMPT

Actúa como un **QA Senior con certificación ISTQB**, especialista en gestión de
calidad de software y redacción de documentación de pruebas.

Tu tarea es crear un **plan de pruebas completo y profesional** basado en el
requerimiento que te adjunto al final de este prompt.

### Contexto
- **Sitio/proyecto:** [indicar si aplica, ej. blazedemo.com — si no se indica, dedúdelo del requerimiento]
- **Nivel de conocimiento del equipo:** QA junior (explicar términos técnicos la primera vez)
- **Formato de salida:** archivo Markdown estructurado con frontmatter YAML
- **Idioma:** español (términos técnicos en inglés entre paréntesis)

### Estructura obligatoria del plan de pruebas

Genera exactamente las siguientes secciones:

1. **Información general** — tabla con: issue/requerimiento, severidad estimada,
   prioridad, área afectada, tipo de prueba, esfuerzo estimado (días-hombre), fecha.
2. **Objetivos** — 3 a 5 objetivos claros y medibles del plan.
3. **Alcance** — "Dentro del alcance ✅" y "Fuera del alcance ❌" en tablas.
4. **Análisis del requerimiento** — desglosa el requerimiento en puntos
   verificables e identifica **reglas de negocio (RN)** con IDs.
5. **Estrategia de pruebas** — tipos de prueba que aplican (funcional, UI,
   regresión, compatibilidad, seguridad, rendimiento...) justificando cuáles NO aplican.
6. **Casos de prueba** — tabla con columnas: `ID | Título | Pasos | Resultado esperado | Prioridad (P0–P3)`.
   - Incluir: happy path, casos negativos/borde (boundary), validación y regresión.
   - Un mínimo de **15 casos** salvo que el requerimiento sea muy pequeño.
   - Prefijar IDs según el área (ej. NAV-, FORM-, CALC-).
7. **Datos de prueba** — tabla de inputs a usar (válidos e inválidos).
8. **Matriz de navegadores/dispositivos** — si aplica a UI web.
9. **Criterios de entrada y salida** — en checklists.
10. **Riesgos y mitigación** — tabla de mínimo 3 riesgos.
11. **Entregables** — qué se produce al terminar.
12. **Control de versiones del documento** — tabla con v1.0.

### Reglas de calidad
- Cada caso de prueba debe ser **independiente** y con resultado **observable**.
- Numeración correlativa sin huecos.
- Asigna prioridad: **P0** = crítico/negocio, **P1** = importante, **P2** = medio, **P3** = bajo.
- Si detectas **defectos o inconsistencias en el propio requerimiento**, créales
  una sección "⚠️ Incidencias detectadas en el requerimiento" para que el equipo las aclare.
- Si falta información necesaria para probar, añade una sección
  "❓ Preguntas abiertas para el/product owner".
- Incluye frontmatter YAML con: titulo, tipo, issue, severidad, prioridad, autor,
  version, fecha_creacion, estado (Draft) y tags.
- No inventes funcionalidades que no estén en el requerimiento.
- Sé conciso: nada de relleno; el plan debe ser accionable el mismo día.

### Ejemplo de tono
> "NAV-13 | 'Find Flights' con ciudades elegidas | Elegir Boston→Rome, clic | Navega a reserve.php con tabla | P0"

### Formato de entrega
Devuelve **únicamente** el contenido Markdown del plan listo para guardarse
como archivo, sin explicaciones previas ni posteriores.

---

## REQUERIMIENTO / ISSUE A ANALIZAR

*(Pega aquí el requerimiento completo, user story, bug report o ticket)*

<!-- Ejemplo:
Título: El usuario no puede descargar la factura en PDF
Descripción: Al hacer clic en "Descargar factura" en la página de pedidos,
el botón no responde. Se esperaba que se descargara el PDF con la factura.
Prioridad: Alta
Pasos: 1) Login 2) Ir a Pedidos 3) Clic "Descargar factura"
-->
