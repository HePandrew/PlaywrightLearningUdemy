const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');
const {HA_header}=require('../pageObjects/HA_header');

test('@regression1 Hospital Admin Correct Username & Password case - HA004', async ({page})=>
    {
    const Email = "xavierandrew16@gmail.com";
    const Password = "Test123";
    const landingPage = "Subscription";
    const title = "Cura";
    const loginSuccessLandingURL = "https://connect.cura.cx/#/dashboard/subscription";
    //https://connect.cura.cx/#/dashboard/subscription

    const LoginClass = new login(page);
    const headerClass = new HA_header(page);
    await page.goto('/#/authentication/signin');
    LoginClass.EmailLogin(Email, Password);
    await page.waitForLoadState('networkidle');
    await expect(headerClass.profileMail).toHaveText(Email);
    await expect(headerClass.userDesignation).toHaveText('Hospital Admin');
    await expect(page.locator(".nav-link.rounded-pill.active")).toHaveText(landingPage);
    const pageTitle =await page.title();
    expect(pageTitle.includes(title)).toBeTruthy();
    const landingURL = page.url();
    expect(landingURL.includes(loginSuccessLandingURL)).toBeTruthy();
    })