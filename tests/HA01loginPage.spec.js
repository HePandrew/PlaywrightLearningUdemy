const {test, expect} = require('@playwright/test');

test('Username&Password cases', async ({page})=>
{
    const usernameField = page.locator('#username');
    const passwordField = page.locator('#password');
    const loginBtn = page.locator('button[type="submit"]');
    const correctEmail = "xavierandrew16@gmail.com";
    const correctPassword = "Test123";
    const wrongEmail = "andrew@gmail.com";
    const wrongPassword = "Test";
    const landingPage = "Subscription";
    const logoutBtn = page.locator("[href='#']");
    const title = "Hive";
    const URL = "https://hive.clinic/#/authentication/signin";
    const loginSuccessLandingURL = "https://hive.clinic/#/dashboard/subscription";
    await page.goto(URL);
    //wrong username & wrong password
    await usernameField.fill(wrongEmail);
    await passwordField.fill(wrongPassword);
    await loginBtn.click();
    const ErrorMessage1 = await page.locator('#swal2-title').textContent();
    expect(ErrorMessage1.includes("Error")).toBeTruthy();
    const ErrorMessage2 = await page.locator('#swal2-html-container').textContent();
    expect(ErrorMessage2.includes("Something went wrong: UserName Not Found")).toBeTruthy();
    await page.locator("[type='button']").nth(1).click();
    console.log("Passed 1: wrong username & wrong password");
    //wrong username & correct password
    await usernameField.fill(wrongEmail);
    await passwordField.fill(correctPassword);
    await loginBtn.click();
    const ErrorMessage3 = await page.locator('#swal2-title').textContent();
    expect(ErrorMessage3.includes("Error")).toBeTruthy();
    const ErrorMessage4 = await page.locator('#swal2-html-container').textContent();
    expect(ErrorMessage4.includes("Something went wrong: UserName Not Found")).toBeTruthy();
    await page.locator("[type='button']").nth(1).click();
    console.log("Passed 2: wrong username & correct password");
    //correct username & wrong password
    await usernameField.fill(correctEmail);
    await passwordField.fill(wrongPassword);
    await loginBtn.click();
    const ErrorMessage5 = await page.locator('#swal2-title').textContent();
    expect(ErrorMessage5.includes("Error")).toBeTruthy();
    const ErrorMessage6 = await page.locator('#swal2-html-container').textContent();
    expect(ErrorMessage6.includes("Something went wrong: User Name or Password Mismatch")).toBeTruthy();
    await page.locator("[type='button']").nth(1).click();
    console.log("Passed 3: correct username & wrong password");
    //correct username & password
    await usernameField.fill(correctEmail);
    await passwordField.fill(correctPassword);
    await loginBtn.click();
    await page.waitForLoadState('networkidle');
    const profileMail = await page.locator('#fw-bold').textContent();
    const userDesignation = await page.locator("//*[@id='fw-bold']/following-sibling::p").textContent();
    expect(profileMail.includes(correctEmail)).toBeTruthy();
    expect(userDesignation.includes("Hospital Admin")).toBeTruthy();
    const getActivePage = await page.locator(".nav-link.rounded-pill.active").textContent();
    expect(getActivePage.includes(landingPage)).toBeTruthy();
    const   pageTitle =await page.title();
    expect(pageTitle.includes(title)).toBeTruthy();
    console.log("Passed 4: correct username & password, Email, Designation, langing page, title");
    const landingURL = await page.url();
    expect(landingURL.includes(loginSuccessLandingURL)).toBeTruthy();

    //logout
    await page.locator('#img').click();
    await logoutBtn.click();
    await usernameField.waitFor();
    await page.waitForLoadState('networkidle');
    const pageURL = await page.url();
    expect(pageURL.includes(URL)).toBeTruthy();
    console.log('Passed 5: logout & check login page');

    })