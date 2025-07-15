const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');

test('@regression1 Forgot>mobile redirect - HA023', async ({page})=>
    {
    const LoginClass = new login(page);
    LoginClass.PageURL();
    LoginClass.MobileSrn();
    await LoginClass.forgotLink.click();
    await expect(page.locator('.page-title')).toHaveText('Forgot Password');
    await expect(page.locator('.form-label')).toHaveText('Email');
    expect(await LoginClass.SendPassword.isVisible()).toBeTruthy();
    })