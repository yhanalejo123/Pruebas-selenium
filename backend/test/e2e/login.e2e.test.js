const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

const FRONTEND_URL = 'http://localhost:5173';

describe('Login e2e con Selenium', function () {
	this.timeout(40000);

	let driver;

	before(async function () {
		driver = await new Builder().forBrowser('MicrosoftEdge').build();
		await driver.manage().setTimeouts({
			implicit: 5000,
			pageLoad: 15000,
			script: 5000,
		});
	});

	after(async function () {
		if (driver) {
			await driver.quit();
		}
	});

	it('permite iniciar sesion con el usuario admin', async function () {
		await driver.get(`${FRONTEND_URL}/login`);

		const usernameInput = await driver.wait(
			until.elementLocated(By.css('input[placeholder="Ej. admin"]')),
			10000,
		);
		const passwordInput = await driver.wait(
			until.elementLocated(By.css('input[type="password"]')),
			10000,
		);

		await usernameInput.clear();
		await usernameInput.sendKeys('admin');
		await passwordInput.clear();
		await passwordInput.sendKeys('admin123');

		await driver.findElement(By.css('button[type="submit"]')).click();

		await driver.wait(until.urlIs(`${FRONTEND_URL}/`), 10000);
		await driver.wait(
			until.elementLocated(By.xpath("//span[contains(., 'Hola,')]")),
			10000,
		);
		await driver.wait(
			until.elementLocated(By.xpath("//a[contains(., 'Admin')]")),
			10000,
		);

		const greetingText = await driver
			.findElement(By.xpath("//span[contains(., 'Hola,')]"))
			.getText();
		const storedRole = await driver.executeScript(
			'return window.localStorage.getItem("role")',
		);
		const storedUsername = await driver.executeScript(
			'return window.localStorage.getItem("username")',
		);
		const storedToken = await driver.executeScript(
			'return window.localStorage.getItem("token")',
		);

		expect(greetingText).to.contain('admin');
		expect(storedRole).to.equal('admin');
		expect(storedUsername).to.equal('admin');
		expect(storedToken).to.be.a('string').and.not.empty;
	});
});

