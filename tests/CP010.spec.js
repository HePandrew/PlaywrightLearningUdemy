const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');
const {ChangePasswordPage}=require('../pageObjects/ChangePasswordPage');
const input = require('../testDataFiles/Credentials.json');

test('@Change Password - CP010', async ({page})=>
    {
    const Email = input.username.CL;
    const Password = input.password.CL;
    const minPassword = Password.slice(0, 2);

    const LoginClass = new login(page);
    const ChangePassword = new ChangePasswordPage(page);
    LoginClass.PageURL();
    LoginClass.EmailLogin(Email, Password);
    await page.waitForLoadState('networkidle');
    await LoginClass.profileIcon.click();
    await LoginClass.changePasswordBtn.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await ChangePassword.newPasswordField.pressSequentially(minPassword);
    await page.waitForTimeout(500);
    await ChangePassword.confirmPasswordField.fill(minPassword);
    await expect(ChangePassword.notMatchValidation).toBeHidden();
    await expect(ChangePassword.UpdateBtn).toHaveAttribute("disabled", "");
    expect(await page.locator("(//input[@type='checkbox'])[2]").isChecked()).toBeFalsy();
    })