const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');


test('@regression1 Forgot> invalid email - HA025', async ({page})=>
    {
    const Emails = ["user", "user@admin", "user.in", "@admin.in"];
    const LoginClass = new login(page);
    await page.goto('/#/authentication/signin');
    await LoginClass.forgotLink.click();
    for(const Email of Emails){
    await LoginClass.forgotEmail.fill(Email);
    await expect(LoginClass.sendPassword).toHaveAttribute("disabled", "");
    await expect(LoginClass.invalidFieldMessage).toHaveText(' Please enter valid email ');
    await LoginClass.forgotEmail.fill('');
    }
    })