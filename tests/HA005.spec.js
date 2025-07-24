const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');
const input = require('../testDataFiles/Credentials.json');

test('@regression1 Logout case - HA005', async ({page})=>
    {
    const LoginClass = new login(page);
    await page.goto('/#/dashboard/subscription');
    await page.waitForTimeout(2000);
    await page.waitForLoadState('networkidle');
    await LoginClass.LogoutFunction();
    await page.waitForLoadState('networkidle');
    await LoginClass.username.waitFor();
    const pageURL = await page.url();
    await expect(pageURL.includes(LoginClass.URL)).toBeTruthy();
    })