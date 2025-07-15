const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');

test('@regression1 Forgot> Wrong email - HA024', async ({page})=>
    {
    const Email = "user@admin.in";    
    const LoginClass = new login(page);
    LoginClass.PageURL();
    await LoginClass.forgotLink.click();
    await LoginClass.forgotEmail.fill(Email);
    await LoginClass.SendPassword.click();
    await expect(page.locator('#swal2-title')).toHaveText('Error');
    await expect(page.locator('#swal2-html-container')).toHaveText('The Email does not exist, Please Check!');
    await page.locator("[type='button']").nth(1).click();
    await LoginClass.SendPassword.waitFor();
    })