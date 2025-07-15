const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');
const {ChangePasswordPage}=require('../pageObjects/ChangePasswordPage');
const input = require('../testDataFiles/Credentials.json');

test('@Change Password - CP008', async ({page})=>
    {
    const Email = input.username.CL;
    const Password = input.password.CL;

    const LoginClass = new login(page);
    const ChangePassword = new ChangePasswordPage(page);
    LoginClass.PageURL();
    LoginClass.EmailLogin(Email, Password);
    await page.waitForLoadState('networkidle');
    await LoginClass.profileIcon.click();
    await LoginClass.changePasswordBtn.click();
    await page.waitForLoadState('networkidle');
    await ChangePassword.newPasswordField.fill(Password);
    await expect(ChangePassword.notMatchValidation).toBeVisible();
    await expect(ChangePassword.notMatchValidation).toHaveText('* Passwords do not match. ');
    await ChangePassword.newPasswordField.fill('');
    await expect(ChangePassword.notMatchValidation).toBeHidden();
    })