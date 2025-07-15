const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');

const NameReqiredMsg = " Password is required ";
const Password = "xavier@gmail.com";


test('@regression1 Password required - HA008', async ({page})=>
    {
        const LoginClass = new login(page);
        LoginClass.PageURL();
        await LoginClass.password.fill(Password);
        await page.waitForTimeout(1000);
        await LoginClass.password.fill('');
        await page.locator("//*[@alt='Hive']").click();
        await expect(LoginClass.invalidFieldMessage).toHaveText(NameReqiredMsg);
        
        await LoginClass.password.fill(Password);
        expect(await page.waitForSelector('.invalid-text-danger', {state:'detached'})).toBeTruthy;
    })