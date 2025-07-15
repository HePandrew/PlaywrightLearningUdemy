const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');


test('@regression1 Forgot> invalid email - HA025', async ({page})=>
    {
    const Emails = ["user", "user@admin", "user.in", "@admin.in"];
    const LoginClass = new login(page);
    LoginClass.PageURL();
    await LoginClass.forgotLink.click();
    for(const Email of Emails){
    await LoginClass.forgotEmail.fill(Email);
    await expect(LoginClass.SendPassword).toHaveAttribute("disabled", "");
    await expect(LoginClass.invalidFieldMessage).toHaveText(' Please enter valid email ');
    }
    })