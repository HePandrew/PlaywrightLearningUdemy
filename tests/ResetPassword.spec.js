const {test, expect, request} = require('@playwright/test');
const {login}=require('../pageObjects/login');
const input = require('../testDataFiles/FP_CP_Creds.json');
const {ChangePasswordPage} = require('../pageObjects/ChangePasswordPage');

const Email = input.pat;//npx playwright test ResetPassword.spec.js
const rowID = input.patId;
const hosAdmID = input.HAid;
const insID = input.insId;
const resetPassword = input.resetPassword;
const newPassword = input.new_conf_passwords;

test.beforeAll('reset with api', async({request})=>{

    const baseURI = "https://api.cura.cx/api/Login/ResetPassword";
    const params = {
        Id:rowID,
        NewPassword:resetPassword,
        ReenterPassword:resetPassword,
        created_By:hosAdmID,
        EmailId:Email,
        InstitutionId:insID
    };

    // Construct URL with query params
    const uri = `${baseURI}?${new URLSearchParams(params).toString()}`;
    const response = await request.get(uri);
    expect(response.status()).toBe(200);
    const text = await response.json();
    expect(text.Message).toBe("Password changed successfully");
})

test('patient reset passwprd',async({page})=>{
    const LoginClass = new login(page);
    const CP = new ChangePasswordPage(page);
    const forgotPassword = resetPassword;
    await LoginClass.PageURL();
    await LoginClass.EmailLogin(Email,resetPassword);
    const tstMsg1 = await LoginClass.toastDetail.textContent();
    expect(tstMsg1).toEqual('Password has been reset, Please Change the Password');
    await CP.changePassword(forgotPassword,newPassword);
    const profileMail = await page.locator('#fw-bold').textContent();

    const tstMsg2 = await LoginClass.toastDetail.textContent();
    expect(tstMsg2).toEqual('Password Changed successfully');
    expect(profileMail).toEqual(Email);
})
