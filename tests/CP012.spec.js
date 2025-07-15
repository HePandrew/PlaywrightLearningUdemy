const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');
const {ChangePasswordPage}=require('../pageObjects/ChangePasswordPage');
const input = require('../testDataFiles/Credentials.json');

test('@Change Password - CP012', async ({page})=>
    {
    const Email = input.username.CL;
    const Password = input.password.CL;
    const newPassword = "T"

    const LoginClass = new login(page);
    const ChangePassword = new ChangePasswordPage(page);
    LoginClass.PageURL();
    LoginClass.EmailLogin(Email, Password);
    await page.waitForLoadState('networkidle');
    await LoginClass.profileIcon.click();
    await LoginClass.changePasswordBtn.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    expect(await page.locator("(//input[@type='checkbox'])[4]").isChecked()).toBeFalsy();
    await ChangePassword.newPasswordField.pressSequentially(newPassword);
    await page.waitForTimeout(500);
    await ChangePassword.confirmPasswordField.fill(newPassword);
    await expect(ChangePassword.notMatchValidation).toBeHidden();
    await expect(ChangePassword.UpdateBtn).toHaveAttribute("disabled", "");
    expect(await page.locator("(//input[@type='checkbox'])[4]").isChecked()).toBeTruthy();
    expect(await page.locator("(//input[@type='checkbox'])[1]").isChecked()).toBeTruthy();
    expect(await page.locator("(//input[@type='checkbox'])[7]").isChecked()).toBeTruthy();
    expect(await page.locator("(//input[@type='checkbox'])[5]").isChecked()).toBeFalsy();
    expect(await page.locator("(//input[@type='checkbox'])[6]").isChecked()).toBeFalsy();
    expect(await page.locator("(//input[@type='checkbox'])[8]").isChecked()).toBeFalsy();
    })