const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');
const input = require('../testDataFiles/Credentials.json');

test('add entry for all vitals', async ({page})=>
    {
    const Email = input.username.PAT;
    const Password = input.password.PAT;

    const LoginClass = new login(page);
    await LoginClass.PageURL();
    await LoginClass.EmailLogin(Email, Password);
    await page.waitForLoadState('networkidle');
    await page.locator(".nav-pills li a").nth(9).click();
    //await page.pause();
    let value = [70,100,80,37,84,90,20,84,180,30,60];
    for(let i=0;i<value.length;i++){
    await page.locator('a.btn').click();
    await page.locator('.ng-arrow-wrapper').nth(0).click();
    await page.locator('.ng-option').nth(i).click();
    await page.locator('.ng-arrow-wrapper').nth(1).click();
    await page.locator('.ng-option').nth(0).click();
    await page.getByPlaceholder('Value').fill(String(value[i]));
    await page.locator('button.btn-lg').nth(1).click();
    const tstMsg = await LoginClass.toastDetail.textContent();
    await expect(tstMsg).toEqual('Data created successfully');
    await page.locator('.p-toast-icon-close-icon').click();
    }

    await page.pause();


    })