const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');
const inputs = require('../testDataFiles/HA011Data.json');


test('Web login username field symbol validation- HA011', async ({page})=>
    {
        const LoginClass = new login(page);
        LoginClass.PageURL();
        await page.waitForLoadState('networkidle');

        for(const input of inputs){
            await LoginClass.username.fill(input.dataa);
            const toasteramsg = await page.locator('.p-toast-detail');
            await expect(toasteramsg).toHaveText('Special characters are not allowed except @ and dot.');
            await page.reload();
        }
    })