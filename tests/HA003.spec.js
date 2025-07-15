const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');

test('@regression1 Correct Username, Wrong Password case - HA003', async ({page})=>
    {
    const Email = "xavierandrew16@gmail.com";
    const Password = "Test";
    const LoginClass = new login(page);
    LoginClass.PageURL();
    LoginClass.EmailLogin(Email, Password);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#swal2-title')).toHaveText('Error');
    await expect(page.locator('#swal2-html-container')).toHaveText('Something went wrong: User Name or Password Mismatch');
    await page.locator("[type='button']").nth(1).click();
    await LoginClass.username.waitFor();
    })