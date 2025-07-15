const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');

test('@regression1 Mobile no. field Default Falg - HA019', async ({page})=>
    {
    const def_flag = 'United Arab Emirates +971';

    const LoginClass = new login(page);
    LoginClass.PageURL();
    await page.locator('//a').nth(1).click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.iti__a11y-text').nth(0)).toHaveText(def_flag);
    })