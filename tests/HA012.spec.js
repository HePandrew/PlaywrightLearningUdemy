const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');

test('@regression1 Wrong Mobile & Password - HA012', async ({page})=>
    {
    const Mobile = "508555555";
    const CountryCode = "+971";
    const Password = "Test";

    const LoginClass = new login(page);
    await page.goto('/#/authentication/signin');
    await LoginClass.MobileSrn();
    await LoginClass.MobileLogin(CountryCode, Mobile, Password);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#swal2-title')).toHaveText('Error');
    await expect(page.locator('#swal2-html-container')).toHaveText('Something went wrong: UserName Not Found');
    await page.locator("[type='button']").nth(2).click();
    await LoginClass.mobilenumber.waitFor();
    })