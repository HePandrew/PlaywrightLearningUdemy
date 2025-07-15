const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');

test('@regression1 Forgot>email redirect - HA022', async ({page})=>
    {
    const LoginClass = new login(page);
    LoginClass.PageURL();
    await LoginClass.forgotLink.click();
    await expect(page.locator('.page-title')).toHaveText('Forgot Password');
    await expect(page.locator('.form-label')).toHaveText('Email');
    expect(await LoginClass.SendPassword.isVisible()).toBeTruthy();
    })