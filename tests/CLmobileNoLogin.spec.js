const {test, expect} = require('@playwright/test');

test('SC mobile number login - HA001', async ({page})=>
    {
    const MobileNo = "501258746";
    const Password = "Test123";
    const CLemail = "clivpp3@mailinator.com";
    const landingPage = "Today's Appointment";
    const title = "Hive";
    const URL = "https://hive.clinic/#/authentication/signin";
    const loginSuccessLandingURL = "https://hive.clinic/#/appointment/appointment";
    await page.goto(URL);
    await page.locator('a.text-center').click();
    await page.locator('#mobileNumber').fill(MobileNo);
    await page.locator('#password').fill(Password);
    await page.locator('button[type="submit"]').click();
    await page.waitForLoadState('networkidle');
    const profileMail = await page.locator('#fw-bold').textContent();
    const userDesignation = await page.locator("//*[@id='fw-bold']/following-sibling::p").textContent();
    expect(profileMail.includes(CLemail)).toBeTruthy();
    expect(userDesignation.includes("Clinician")).toBeTruthy();
    const getActivePage = await page.locator(".nav-link.rounded-pill.active").textContent();
    expect(getActivePage.includes(landingPage)).toBeTruthy();
    const   pageTitle =await page.title();
    expect(pageTitle.includes(title)).toBeTruthy();
    const landingURL = await page.url();
    expect(landingURL.includes(loginSuccessLandingURL)).toBeTruthy();
    })