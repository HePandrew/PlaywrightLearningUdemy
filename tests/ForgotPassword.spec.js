const {test, chromium, expect} = require ('@playwright/test');
const {login} = require ('../pageObjects/login');
const {ChangePasswordPage} = require('../pageObjects/ChangePasswordPage');

test('Forgot password +ve flow', async()=>
    {
        let forgotPassword;
        const Email = "webex002@mailinator.com";
        const newPassword = "Test@123";
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        const LoginClass = new login(page);
        const CP = new ChangePasswordPage(page);
        await page.goto('/#/authentication/signin');
        //await LoginClass.PageURL();
        await LoginClass.forgotLink.click();
        await LoginClass.forgotEmail.fill(Email);
        await LoginClass.SendPassword.click();
        await LoginClass.okBtn.click();
        await page.goBack();
        
        //open new tab
        const page1 = await context.newPage();
        await page1.goto("https://www.mailinator.com/");
        await page1.fill('#search', Email);
        await page1.locator('button:has-text("GO")').click();
        await page1.waitForTimeout(2000);
        const justNow = await page1.getByRole('cell', { name: 'just now' }).textContent();
        console.log(justNow);
        expect(justNow).toContain("just now");
        await page1.locator('tr.ng-scope td').nth(2).click();
        const loc1 = await page1.frameLocator('#html_msg_body');
        const fullPassword = await loc1.locator('body p').textContent();
        console.log(fullPassword);
        forgotPassword = fullPassword.split(' : ')[1];
        console.log(forgotPassword);
        await page1.close();

        //use the forgetPassword to change password
        await LoginClass.EmailLogin(Email, forgotPassword);
        await page.waitForTimeout(2000);
        //get toaster msg - change password screen redirect

        //change the password
        await CP.passwordField.fill(forgotPassword);
        await CP.newPasswordField.fill(newPassword);
        await CP.confirmPasswordField.fill(newPassword);
        await CP.UpdateBtn.click();

        //login with newPassword
        //await LoginClass.EmailLogin(Email, newPassword);


        await page.pause();
        




})