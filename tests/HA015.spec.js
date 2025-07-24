const {test} = require('@playwright/test');
const {login}=require('../pageObjects/login');
const input = require('../testDataFiles/Credentials.json');

test('@regression1 mobile valid login - HA015', async ({page})=>
    {
    const Mobile = input.mobile.HA;
    const CountryCode = input.CountryCode.HA;
    const Password = input.password.HA;

    const LoginClass = new login(page);
    await page.goto('/#/authentication/signin');
    await LoginClass.MobileSrn();
    await LoginClass.MobileLogin(CountryCode, Mobile, Password);

    })