const {test, chromium, expect} = require ('@playwright/test');
test.use({ storageState: undefined });
const {login} = require ('../pageObjects/login');
const {ChangePasswordPage} = require('../pageObjects/ChangePasswordPage');
const {mailinatorPassword} = require('../pageObjects/mailinatorPassword');
const input = require('../testDataFiles/FP_CP_Creds.json');



test('Hospital admin forget password', async()=>{
    const Email = input.HA;
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
    //get password from mailinator.com
    const page1 = await contxt.newPage();
    const mail_Pass = new mailinatorPassword(page1);
    let forgotPassword = await mail_Pass.mail_Pas(Email);
    await page1.close();
    //use the forgetPassword to change password
    await page.bringToFront();
    await page.reload();
    await LoginClass.EmailLogin(Email, forgotPassword);
    await page.waitForTimeout(2000);
    //get toaster msg - change password screen redirect
    const tstMsg1 = await LoginClass.toastDetail.textContent();
    await expect(tstMsg1).toEqual('Password has been reset, Please Change the Password');
    //change the password
    await CP.changePassword(forgotPassword,newPassword);
    await page.waitForTimeout(3000);
    //get password changed successfully toaster msg
    const tstMsg2 = await LoginClass.toastDetail.textContent();
    await expect(tstMsg2).toEqual('Password Changed successfully');
    const landingPage = await page.locator('.sub-title').textContent();
    await expect(landingPage).toEqual("Subscription Info");
    await page.pause();
})