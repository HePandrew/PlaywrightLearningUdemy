const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');
const {ChangePasswordPage}=require('../pageObjects/ChangePasswordPage');
const input = require('../testDataFiles/Credentials.json');

test('@Change Password - CP011', async ({page})=>
    {
    const Email = input.username.CL;
    const Password = input.password.CL;
    const maxPassword = "Test12345678901234567890"

    const LoginClass = new login(page);
    const ChangePassword = new ChangePasswordPage(page);
    LoginClass.PageURL();
    LoginClass.EmailLogin(Email, Password);
    await page.waitForLoadState('networkidle');
    await LoginClass.profileIcon.click();
    await LoginClass.changePasswordBtn.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await ChangePassword.newPasswordField.pressSequentially(maxPassword);
    await page.waitForTimeout(500);
    await ChangePassword.confirmPasswordField.fill(maxPassword);
    await expect(ChangePassword.notMatchValidation).toBeHidden();
    await expect(ChangePassword.UpdateBtn).toHaveAttribute("disabled", "");
    expect(await page.locator("(//input[@type='checkbox'])[3]").isChecked()).toBeFalsy();
    })