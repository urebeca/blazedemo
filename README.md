# BlazeDemo - Pruebas de Navegación con Playwright

Este proyecto contiene pruebas automatizadas para validar la navegación del sitio [BlazeDemo](https://blazedemo.com/) utilizando [Playwright](https://playwright.dev/).

## Estructura del proyecto

```
exp003/
├── playwright/
│   ├── tests/
│   │   └── navegacion.spec.js
│   ├── pages/
│   ├── playwright.config.js
│   ├── chrome.config.js
│   ├── firefox.config.js
│   ├── package.json
│   ├── playwright-report/
│   └── test-results/
├── *.md
└── *.feature
```

## Requisitos previos

- [Node.js](https://nodejs.org/) (v16 o superior recomendado)
- npm (incluido con Node.js)

## Instalación

1. Navega al directorio de Playwright:

   ```bash
   cd playwright
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Instala los navegadores de Playwright:

   ```bash
   npx playwright install
   ```

## Configuración

- URL base: `https://blazedemo.com` (se puede sobrescribir con `BASE_URL`)
- Navegadores: Microsoft Edge (desktop) y Pixel 5 (mobile)
- Timeout por test: 90s | expect: 15s
- Trazas: solo en fallos

Ver [playwright/playwright.config.js](playwright/playwright.config.js).

## Ejecución

Desde `playwright/`:

| Comando | Descripción |
|---|---|
| `npm test` | Ejecuta todas las pruebas |
| `npm run test:nav` | Solo pruebas de navegación |
| `npm run test:headed` | Modo visible |
| `npm run test:report` | Abre reporte HTML |

En PowerShell:

```powershell
$env:BASE_URL="https://blazedemo.com"; npx playwright test
```

## Reportes y depuración

- Reporte HTML: `playwright/playwright-report/` → `npx playwright show-report`
- Artefactos: `playwright/test-results/`
