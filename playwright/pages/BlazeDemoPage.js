class BlazeDemoPage {
  constructor(page) {
    this.page = page;
    this.menuTravelTheWorld = page.getByRole('link', { name: 'Travel The World' }).first();
    this.menuHome = page.getByRole('link', { name: 'home', exact: true }).first();
    this.fromPort = page.locator('select[name="fromPort"]');
    this.toPort = page.locator('select[name="toPort"]');
    this.findFlights = page.locator('input[type="submit"]');
    this.resultTable = page.locator('table');
    this.resultRows = page.locator('tbody tr');
    this.destinationLink = page.getByRole('link', { name: /destination of the week/i }).first();
    this.changeFlight = page.getByRole('link', { name: /cambiar vuelo|change flight/i }).first();
    this.purchaseForm = {
      name: page.locator('input[name="inputName"]'),
      address: page.locator('input[name="address"]'),
      city: page.locator('input[name="city"]'),
      state: page.locator('input[name="state"]'),
      zipCode: page.locator('input[name="zipCode"]'),
      cardType: page.locator('select[name="cardType"]'),
      creditCardNumber: page.locator('input[name="creditCardNumber"]'),
      creditCardMonth: page.locator('input[name="creditCardMonth"]'),
      creditCardYear: page.locator('input[name="creditCardYear"]'),
      nameOnCard: page.locator('input[name="nameOnCard"]'),
    };
    this.submitPurchase = page.locator('input[type="submit"]');
  }

  async gotoHome() {
    await this.page.goto('/');
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async selectCities(from, to) {
    await this.fromPort.selectOption({ label: from });
    await this.toPort.selectOption({ label: to });
  }

  async clickFindFlights() {
    await this.findFlights.click();
  }

  async getRowData(index) {
    const row = this.resultRows.nth(index - 1);
    return {
      flightNumber: await row.locator('td').nth(1).innerText(),
      airline: await row.locator('td').nth(2).innerText(),
      priceText: await row.locator('td').nth(5).innerText(),
    };
  }

  async getLastRowData() {
    const row = this.resultRows.last();
    return {
      flightNumber: await row.locator('td').nth(1).innerText(),
      airline: await row.locator('td').nth(2).innerText(),
      priceText: await row.locator('td').nth(5).innerText(),
    };
  }

  async clickChoose(rowIndex) {
    await this.resultRows.nth(rowIndex - 1).locator('input[type="submit"]').click();
  }

  async clickChooseLastRow() {
    await this.resultRows.last().locator('input[type="submit"]').click();
  }

  async dblClickChooseLastRow() {
    await this.resultRows.nth(0).locator('input[type="submit"]').dblclick();
  }

  async clickTravelTheWorld() {
    await this.menuTravelTheWorld.click();
  }

  async clickHome() {
    await this.menuHome.click();
  }

  async clickDestinationLink() {
    await this.destinationLink.click();
  }

  async clickChangeFlight() {
    await this.changeFlight.click();
  }

  async getPurchaseFlightData() {
    const airline = await this.page.locator('div', { hasText: 'Airline:' }).first().innerText();
    const total = await this.page.locator('text=Total Cost:').first().locator('..').innerText();
  }

  async getPurchaseNumbers() {
    const text = await this.getPurchaseText();
    const price = Number((text.match(/Price:\s*([\d.,]+)/) || [])[1]);
    const fees = Number((text.match(/Arbitrary Fees and Taxes:\s*([\d.,]+)/) || [])[1]);
    const total = Number((text.match(/Total Cost:\s*([\d.,]+)/) || [])[1]);
    return { price, fees, total };
  }

  async getPurchaseText() {
    return this.page.locator('body').innerText();
  }

  async fillPurchaseForm(data = {}) {
    await this.purchaseForm.name.fill(data.name ?? 'Ana Test');
    await this.purchaseForm.address.fill(data.address ?? 'Calle Falsa 123');
    await this.purchaseForm.city.fill(data.city ?? 'Madrid');
    await this.purchaseForm.state.fill(data.state ?? 'MD');
    await this.purchaseForm.zipCode.fill(data.zipCode ?? '28001');
    await this.purchaseForm.cardType.selectOption({ label: data.cardType ?? 'Visa' });
    await this.purchaseForm.creditCardNumber.fill(data.creditCardNumber ?? '4111111111111111');
    await this.purchaseForm.creditCardMonth.fill(data.month ?? '11');
    await this.purchaseForm.creditCardYear.fill(data.year ?? '2030');
    await this.purchaseForm.nameOnCard.fill(data.nameOnCard ?? 'ANA TEST');
  }

  async submitPurchaseForm() {
    await this.submitPurchase.click();
  }
}

module.exports = { BlazeDemoPage };