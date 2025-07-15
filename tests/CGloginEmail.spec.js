const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');

test('CG Email login - HA001', async ({page})=>
    {
    const UserEmail = "cgvpp1@mailinator.com";
    const Password = "Test123";
    const landingPage = "Assigned Patients";
    const title = "Hive";
    const URL = "https://hive.clinic/#/authentication/signin";
    const loginSuccessLandingURL = "https://hive.clinic/#/cg-assigned-patients/cg-assigned-patients";
    const LoginClass = new login(page);
    LoginClass.PageURL();
    await page.locator('#username').fill(UserEmail);
    await page.locator('#password').fill(Password);
    await page.locator('button[type="submit"]').click();
    await page.waitForLoadState('networkidle');
    const profileMail = await page.locator('#fw-bold').textContent();
    const userDesignation = await page.locator("//*[@id='fw-bold']/following-sibling::p").textContent();
    expect(profileMail.includes(UserEmail)).toBeTruthy();
    expect(userDesignation.includes("Care Giver")).toBeTruthy();
    const getActivePage = await page.locator(".page-title").textContent();
    expect(getActivePage.includes(landingPage)).toBeTruthy();
    const   pageTitle =await page.title();
    expect(pageTitle.includes(title)).toBeTruthy();
    const landingURL = await page.url();
    expect(landingURL.includes(loginSuccessLandingURL)).toBeTruthy();
    })