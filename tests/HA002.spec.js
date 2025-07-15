const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');

test('@regression1 Wrong Username, Correct Password case - HA002', async ({page})=>
    {
    const Email = "andrew@gmail.com";
    const Password = "Test123";
    const LoginClass = new login(page);
    LoginClass.PageURL();
    LoginClass.EmailLogin(Email, Password);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#swal2-title')).toHaveText('Error');
    await expect(page.locator('#swal2-html-container')).toHaveText('Something went wrong: UserName Not Found');
    await page.locator("[type='button']").nth(1).click();
    await LoginClass.username.waitFor();
    })