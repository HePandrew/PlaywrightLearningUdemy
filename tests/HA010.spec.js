const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');

const userLabel = "Username";
const passwordLabel = " Password (Forgot?) ";


test('@regression1 Web login field names', async ({page})=>
    {
        const LoginClass = new login(page);
        await LoginClass.PageURL();
        await expect(page.locator('.form-label.mt-4')).toHaveText(userLabel);
        await expect(page.locator('.form-label.mt-2')).toHaveText(passwordLabel);
    })