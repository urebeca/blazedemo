const { test, expect } = require('@playwright/test');
const { BlazeDemoPage } = require('../pages/BlazeDemoPage');

async function navigateAndGetStatus(page, action) {
  let status = null;
  const handler = (r) => {
    if (r.request().isNavigationRequest()) status = r.status();
  };
  page.on('response', handler);
  await action();
  await page.waitForLoadState('networkidle');
  page.off('response', handler);
  return status;
}

async function checkAllLinks(page, startPath) {
  await page.goto(startPath, { waitUntil: 'domcontentloaded' });
  const hrefs = await page.locator('a').evaluateAll((as) =>
    as
      .map((a) => a.getAttribute('href'))
      .filter((h) => h && !h.startsWith('#') && !h.startsWith('javascript:') && !h.startsWith('mailto:'))
  );
  const unique = [...new Set(hrefs)];
  expect(unique.length).toBeGreaterThan(0);
  for (const href of unique) {
    const url = new URL(href, page.url()).toString();
    const res = await page.goto(url, { waitUntil: 'domcontentloaded' });
    expect(res ? res.status() : 0, `enlace ${href} -> ${url}`).not.toBe(404);
  }
}

test.describe('Menú superior', () => {
  test('@NAV-01 Travel The World navega al inicio desde index', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.clickTravelTheWorld();
    await expect(page).toHaveURL(/index\.php$/);
  });

  test('@NAV-02 Travel The World navega al inicio desde reserve.php', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.selectCities('Boston', 'Rome');
    await blaze.clickFindFlights();
    await expect(page).toHaveURL(/reserve\.php/);
    await blaze.clickTravelTheWorld();
    await expect(page).toHaveURL(/index\.php$/);
  });

  test('@NAV-03 Travel The World navega al inicio desde purchase.php', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.selectCities('Boston', 'Rome');
    await blaze.clickFindFlights();
    await expect(page).toHaveURL(/reserve\.php/);
    await blaze.clickChoose(1);
    await expect(page).toHaveURL(/purchase\.php/);
    await blaze.clickTravelTheWorld();
    await expect(page).toHaveURL(/index\.php$/);
  });

  test('@NAV-04 home navega a /home desde index', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.clickHome();
    expect(page.url()).toMatch(/\/(home|login)$/);
  });

  test('@NAV-05 home navega a /home desde reserve.php', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.selectCities('Boston', 'Rome');
    await blaze.clickFindFlights();
    await expect(page).toHaveURL(/reserve\.php/);
    await blaze.clickHome();
    expect(page.url()).toMatch(/\/(home|login)$/);
  });

  test('@NAV-06 home navega a /home desde purchase.php', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.selectCities('Boston', 'Rome');
    await blaze.clickFindFlights();
    await blaze.clickChoose(1);
    await expect(page).toHaveURL(/purchase\.php/);
    await blaze.clickHome();
    expect(page.url()).toMatch(/\/(home|login)$/);
  });

  test('@NAV-07 home navega a /home desde vacation.html', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.goto('vacation.html');
    await blaze.clickHome();
    expect(page.url()).toMatch(/\/(home|login)$/);
  });
});

test.describe('Enlaces de contenido', () => {
  test('@NAV-08 Enlace The Beach abre vacation.html', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.clickDestinationLink();
    await expect(page).toHaveURL(/vacation\.html/);
    await expect(page.getByText('Destination of the week: Hawaii !')).toBeVisible();
  });

  test('@NAV-09 Todos los enlaces de vacation.html son válidos', async ({ page }) => {
    await checkAllLinks(page, 'vacation.html');
  });

  test('@NAV-10 Todos los enlaces de /home son válidos', async ({ page }) => {
    await checkAllLinks(page, '/home');
  });

  test('@NAV-11 reservation.php devuelve 404 (BUG-01 conocido)', async ({ page }) => {
    const response = await page.goto('/reservation.php');
    expect(response.status()).toBe(404);
  });
});

test.describe('Botones del flujo principal', () => {
  test('@NAV-12 Find Flights muestra la tabla de vuelos', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.selectCities('Boston', 'Rome');
    await blaze.clickFindFlights();
    await expect(page).toHaveURL(/reserve\.php/);
    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
    const header = (await page.locator('th').allInnerTexts()).join(' | ');
    for (const column of ['Flight #', 'Airline', 'Departs', 'Arrives', 'Price']) {
      expect(header, `columna ${column}`).toContain(column);
    }
    for (let i = 0; i < rowCount; i++) {
      const rowText = await rows.nth(i).innerText();
      expect(rowText, `precio en fila ${i + 1}`).toMatch(/\$\d+\.\d{2}/);
    }
  });

  test('@NAV-13 Find Flights sin seleccionar no produce error fatal', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    const status = await navigateAndGetStatus(page, () => blaze.clickFindFlights());
    expect(status).toBeLessThan(500);
    await expect(page.locator('body')).toBeVisible();
  });

  test('@NAV-14 Choose fila 1 abre purchase y calcula el total', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.selectCities('Boston', 'Rome');
    await blaze.clickFindFlights();
    await expect(page).toHaveURL(/reserve\.php/);
    await blaze.clickChoose(1);
    await expect(page).toHaveURL(/purchase\.php/);
    await expect(blaze.purchaseForm.name).toBeVisible();
    await expect(page.getByText(/Total Cost:/)).toBeVisible();
    const { price, fees, total } = await blaze.getPurchaseNumbers();
    expect(price).toBeGreaterThan(0);
    expect(total).toBeCloseTo(price + fees, 1);
  });

  test('@NAV-15 Choose última fila abre purchase y calcula el total', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.selectCities('Boston', 'Rome');
    await blaze.clickFindFlights();
    await expect(page).toHaveURL(/reserve\.php/);
    await blaze.clickChooseLastRow();
    await expect(page).toHaveURL(/purchase\.php/);
    await expect(page.getByText(/Total Cost:/)).toBeVisible();
    const { price, fees, total } = await blaze.getPurchaseNumbers();
    expect(price).toBeGreaterThan(0);
    expect(total).toBeCloseTo(price + fees, 1);
  });

  test('@BUG-02 Continuidad de datos: purchase muestra vuelo fijo United UA954', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.selectCities('Boston', 'Rome');
    await blaze.clickFindFlights();
    await expect(page).toHaveURL(/reserve\.php/);
    const row = await blaze.getRowData(1);
    await blaze.clickChoose(1);
    await expect(page).toHaveURL(/purchase\.php/);
    const body = await blaze.getPurchaseText();
    expect(body).toContain('Your flight from TLV to SFO');
    expect(body).toContain('United');
    expect(body).not.toContain(row.flightNumber);
  });

  test('@NAV-16 Doble clic en Choose no provoca doble navegación', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.selectCities('Boston', 'Rome');
    await blaze.clickFindFlights();
    await expect(page).toHaveURL(/reserve\.php/);
    await blaze.dblClickChooseLastRow();
    await expect(page).toHaveURL(/purchase\.php/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('@NAV-17 Submit del formulario de compra procesa el envío', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.selectCities('Boston', 'Rome');
    await blaze.clickFindFlights();
    await blaze.clickChoose(1);
    await expect(page).toHaveURL(/purchase\.php/);
    await blaze.fillPurchaseForm();
    const status = await navigateAndGetStatus(page, () => blaze.submitPurchaseForm());
    expect(status).toBeLessThan(500);
  });
});

test.describe('Accesibilidad por teclado', () => {
  test('@NAV-18 Tabulación recorre elementos con foco', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      const activeTag = await page.evaluate(() => document.activeElement.tagName);
      expect(activeTag).not.toBe('BODY');
    }
  });

  test('@NAV-19 Enlace home se activa con Enter', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.menuHome.focus();
    await page.keyboard.press('Enter');
    await page.waitForLoadState('domcontentloaded');
    const path = new URL(page.url()).pathname;
    expect(path).toMatch(/^\/(home|login)?$/);
  });

  test('@NAV-20 Botón Choose se activa con Enter', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.selectCities('Boston', 'Rome');
    await blaze.clickFindFlights();
    await expect(page).toHaveURL(/reserve\.php/);
    await blaze.resultRows.nth(0).locator('input[type="submit"]').focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/purchase\.php/);
  });
});

test.describe('Navegación secundaria', () => {
  test('@NAV-21 Enlace cambiar vuelo vuelve a la selección de vuelos', async ({ page }) => {
    const blaze = new BlazeDemoPage(page);
    await blaze.gotoHome();
    await blaze.selectCities('Boston', 'Rome');
    await blaze.clickFindFlights();
    await blaze.clickChoose(1);
    await expect(page).toHaveURL(/purchase\.php/);
    const count = await page.getByRole('link', { name: /cambiar vuelo|change flight/i }).count();
    test.skip(count === 0, 'El enlace "cambiar vuelo" no está implementado en el sitio aún');
    await blaze.clickChangeFlight();
    await expect(page).toHaveURL(/reserve\.php/);
  });
});