const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');

const Email1 = "xavier";
const Email2 = "xavier@gmail";
const Email3 = "xavier.com";
const Email4 = "xavier.c";
const Email5 = "@gmail.com";
const Email6 = "xavier@gmail.com";
const invalidEmailMsg = " Please enter a valid email address ";

test('@regression1 invalid Email - HA006 - 1', async ({page})=>
    {
        const LoginClass = new login(page);
        LoginClass.PageURL();
        await LoginClass.username.fill(Email1);
        await page.waitForTimeout(1000);
        await expect(LoginClass.invalidFieldMessage).toHaveText(invalidEmailMsg);
    })

test('@regression1 invalid Email - HA006 - 2', async ({page})=>
    {
        const LoginClass = new login(page);
        LoginClass.PageURL();
        await LoginClass.username.fill(Email2);
        await page.waitForTimeout(1000);
        await expect(LoginClass.invalidFieldMessage).toHaveText(invalidEmailMsg);
    })

test('@regression1 invalid Email - HA006 - 3', async ({page})=>
    {
        const LoginClass = new login(page);
        LoginClass.PageURL();
        await LoginClass.username.fill(Email3);
        await page.waitForTimeout(1000);
        await expect(LoginClass.invalidFieldMessage).toHaveText(invalidEmailMsg);
    })

test('@regression1 invalid Email - HA006 - 4', async ({page})=>
    {
        const LoginClass = new login(page);
        LoginClass.PageURL();
        await LoginClass.username.fill(Email4);
        await page.waitForTimeout(1000);
        await expect(LoginClass.invalidFieldMessage).toHaveText(invalidEmailMsg);
    })

test('@regression1 invalid Email - HA006 - 5', async ({page})=>
    {
        const LoginClass = new login(page);
        LoginClass.PageURL();
        await LoginClass.username.fill(Email5);
        await page.waitForTimeout(1000);
        await expect(LoginClass.invalidFieldMessage).toHaveText(invalidEmailMsg);
    })

test('@regression1 invalid message removal on valid email - HA006 - 6', async ({page})=>
    {
        const LoginClass = new login(page);
        LoginClass.PageURL();
        await LoginClass.username.fill(Email1);
        await page.waitForTimeout(1000);
        await expect(LoginClass.invalidFieldMessage).toHaveText(invalidEmailMsg);
        await LoginClass.username.fill(Email6);
        expect(await page.waitForSelector('.invalid-text-danger', {state:'detached'})).toBeTruthy;
    })