const { chromium } = require('@playwright/test');
const fs = require('fs');
const input = require('../testDataFiles/Credentials.json');
const {login} = require('../pageObjects/login');

module.exports = async function globalSetup() {
  const statePath = 'storageState.json';
  if (fs.existsSync(statePath)) {fs.unlinkSync(statePath)};
  //const baseurl = config.use.baseURL;

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const LoginClass = new login(page);
  const Email = input.username.HA;
  const Password = input.password.HA;
  
  await page.goto('https://connect.cura.cx/#/authentication/signin');
  await LoginClass.EmailLogin(Email, Password);

  // Wait for dashboard or some logged-in element
  await page.waitForURL('https://connect.cura.cx/#/dashboard/subscription'); // adjust if needed

  // Save login state
  await context.storageState({ path: statePath });
  await browser.close();
};