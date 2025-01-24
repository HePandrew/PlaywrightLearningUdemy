const {test, expect} = require('@playwright/test');
const { access } = require('fs');
    const correctEmail = "xavierandre16@gmail.com";
    const correctPassword = "Test123";
    const landingPage = "Subscription";
    const title = "Hive";
    const URL = "https://hive.clinic/#/authentication/signin";
    const allPatientURL = "https://hive.clinic/#/dashboard/all-patients";
    //clinical user page required data
    const firstName = "Patient";
    const lastName = "Automate";
    const email = "patinet0001@mailinator.com";
    const mobile = "504000002";
    const name = " "+lastName+","+firstName+" ";


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

test('adding patient', async ({page})=>
{
    await page.locator('text="All Patients"').click();
    await page.waitForLoadState('networkidle');
   /*
    const pageURL = await page.url();
    console.log("All patient page url = "+pageURL);
    expect(pageURL.includes(allPatientURL)).toBeTruthy();
   
    await page.locator('text=" ADD NEW "').click();
    await page.locator('#firstName').fill(firstName);
    await page.locator('#lastName').fill(lastName);
    await page.locator('#ddlGender').selectOption("Female");
    await page.locator('#email').last().fill(email);
    await page.locator('#mobilenumber').fill(mobile);
    
    //additional info
    await page.locator('#additional-info-tab').click(); 
    await page.locator('#ddlMartialStatus').selectOption("Single");
    await page.locator('#ddlEthnicGroup').selectOption("Unknown");
    await page.locator('#icondisplay:visible').click();
    await page.locator("span.ng-star-inserted[tabindex='0']").click();
    await page.locator('#ddlBloodGroup').selectOption("B Positive");
   
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
    */
//checking the table
    await page.locator('text="All Patients"').click();
    await page.locator('#searchType2').selectOption("Email");
    await page.locator("[type='search']").fill(email);
    await page.waitForTimeout(2000);
    await page.locator(".btn.btn-info.btn-rounded-pill").first().click();
    await page.waitForTimeout(4000);
    await page.waitForLoadState('networkidle');
    
    //check the created user in the table
    const tableId = page.locator("tr.ng-star-inserted");
    //const pageNext = await page.locator("a.ms-2");
    const actName = await tableId.locator('td').nth(3).textContent();
    const actemail = await tableId.locator('td').nth(6).textContent()
    expect(actName.includes(name)).toBeTruthy();
    expect(actemail.includes(email)).toBeTruthy();
    console.log("Given Patient is present in table");

})


