const {test, expect, chromium} = require('@playwright/test');
test.use({storageState: undefined})
const {login} = require ('../pageObjects/login');
const {ChangePasswordPage} = require('../pageObjects/ChangePasswordPage');
const {mailinatorPassword} = require('../pageObjects/mailinatorPassword');
const input = require('../testDataFiles/FP_CP_Creds.json');



test('clinician forget password', async()=>{
    const Email = input.CL;
    const newPassword = input.new_conf_passwords;
    const browser = await chromium.launch();
    const contxt = await browser.newContext();
    const page = await contxt.newPage();
    
    const LoginClass = new login(page);
    const CP = new ChangePasswordPage(page);

    await page.goto('/#/authentication/signin');
    //send forgot email
    await LoginClass.ForgotPassword(Email);
    //await page.waitForSelector('#swal2-title');
    const diaMsg = await LoginClass.dialogTitle.textContent();
    await expect(diaMsg).toEqual('Success');
    await LoginClass.okBtn.click();
    await page.goBack();
    await page.reload();
    //get password from mailinator.com
    const page1 = await contxt.newPage();
    const mail_Pass = new mailinatorPassword(page1);
    let forgotPassword = await mail_Pass.mail_Pas(Email);
    await page1.close();
    //use the forgetPassword to change password
    await LoginClass.EmailLogin(Email, forgotPassword);
    //await page.waitForTimeout(1000);
    //get toaster msg - change password screen redirect
    //const tstMsg1 = await LoginClass.toastDetail.textContent();
    //await expect(tstMsg1).toEqual('Password has been reset, Please Change the Password');
    //change the password flow
    await CP.changePassword(forgotPassword,newPassword);
    await page.pause();
    //await page.waitForTimeout(5000);
    //get password changed successfully toaster msg
    const tstMsg2 = await LoginClass.toastDetail.textContent();
    await expect(tstMsg2).toEqual('Password Changed successfully');
    //await expect(page.url()).toEqual('https://connect.cura.cx/#/appointment/appointment');
    const  tabs = await page.locator('.nav-pills li').all();
    const tabArray = [];
    for(let i=0; i<tabs.length;i++){
        const tabText = await tabs[i].locator('a').textContent();
        tabArray.push(tabText);
    }
    expect(tabArray[0]).toEqual("Today's Appointment");
    expect(tabArray[1]).toEqual("Next 30 Days Appointments");
    expect(tabArray[2]).toEqual("Scheduler");
    await page.pause();
})

