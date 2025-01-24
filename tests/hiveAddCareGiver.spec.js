const {test, expect} = require('@playwright/test');
    const correctEmail = "xavierandre16@gmail.com";
    const correctPassword = "Test123";
    const landingPage = "Subscription";
    const title = "Hive";
    const URL = "https://hive.clinic/#/authentication/signin";
    const clinicalUserURL = "https://hive.clinic/#/dashboard/clinical-users";
    //clinical user page required data
    const firstName = "Care";
    const lastName = "Giver";
    const email = "CC0001@mailnator.com";
    const mobile = "504452160";
    const empNo = "CC0001";
    const healthLic = "qwerty098765";
    const name = lastName+","+firstName;

test.beforeEach('login activity',async ({page})=>{
    const usernameField = page.locator('#username');
    const passwordField = page.locator('#password');
    const loginBtn = page.locator('button[type="submit"]');
    await page.goto(URL);
    //correct username & password
    await usernameField.fill(correctEmail);
    await passwordField.fill(correctPassword);
    await loginBtn.click();
    await page.waitForLoadState('networkidle');
    try {
        //click cancel mobile verification
        await page.getByRole("button",{name: 'Cancel'}).click();
    } catch (error) {
        console.error("An error occurred:", error.message);}
    const profileMail = await page.locator('#fw-bold').textContent();
    const userDesignation = await page.locator("//*[@id='fw-bold']/following-sibling::p").textContent();
    expect(profileMail.includes(correctEmail)).toBeTruthy();
    expect(userDesignation.includes("Hospital Admin")).toBeTruthy();
    const getActivePage = await page.locator(".nav-link.rounded-pill.active").textContent();
    expect(getActivePage.includes(landingPage)).toBeTruthy();
    const   pageTitle =await page.title();
    expect(pageTitle.includes(title)).toBeTruthy();
    console.log("correct username & password");
    
})

test('adding care Coordinator', async ({page})=>
{
    await page.waitForLoadState('networkidle');
    await page.locator('text="Clinical Users"').click();
    const pageURL = await page.url();
    console.log("clinical page url = "+pageURL);
    expect(pageURL.includes(clinicalUserURL)).toBeTruthy();
   
    await page.locator('text=" ADD NEW "').click();
    await page.locator('#firstname').fill(firstName);
    await page.locator('#lastName').fill(lastName);
    await page.locator('#email').fill(email);
    await page.locator('#ddlDepartment').selectOption("Anaesthesiology");
    await page.locator('#mobilenumber').fill(mobile);
    await page.locator('#employmentNo').fill(empNo);
    await page.locator('#ddlusertype').selectOption("Care Giver");
    await page.locator('#ddlGender').selectOption("Female");
    //additional info
    await page.locator('#additional-info-tab').click(); 
    await page.locator('#healthlicense').fill(healthLic);
    await page.locator('#ddlNationality').selectOption("Lesotho");
    await page.locator('#icondisplay:visible').click();
    await page.locator("span.ng-star-inserted[tabindex='0']").click();
    //address info
    await page.locator('#address-info-tab').click(); 
    await page.locator('#ddlCountry').selectOption("Mauritius");
    await page.locator('#ddlState').selectOption("Flacq District");
    await page.locator('#ddlLocation').selectOption("Ecroignard");
    //save
    await page.locator("button[type='submit']").click();
    await page.waitForLoadState('networkidle');
    const toastmsg = await page.locator('div.p-toast-detail').textContent();
    console.log("Toaster Msg:- "+toastmsg);
})


test('checking care coordinator', async ({page})=>
    {
    await page.locator('text="Clinical Users"').click();
    await page.locator('#searchType1').selectOption("Email");
    await page.locator("[type='search']").fill(email);
    await page.locator("text='Search'").first().click();
    //check the created user in the table
    await page.waitForLoadState('networkidle');
    const tableId = page.locator("tr.ng-star-inserted");
    //const pageNext = await page.locator("a.ms-2");
    const actName = await tableId.locator('td').nth(2).textContent();
    const actemail = await tableId.locator('td').nth(3).textContent()
    expect(actName.includes(name)).toBeTruthy();
    expect(actemail.includes(email)).toBeTruthy();
    console.log("Given Care Giver is present in table");

})