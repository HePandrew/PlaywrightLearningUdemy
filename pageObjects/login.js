class login{

    constructor(page)
    {
        this.page = page;
        this.URL = "https://connect.cura.cx/#/authentication/signin";
        this.username = page.locator('#username');
        this.mobilenumber = page.locator('#mobileNumber');
        this.password = page.locator('#password');
        this.signinBtn = page.locator('button[type="submit"]');
        this.changePasswordBtn = page.locator("[href='#/authentication/change-password']");
        this.logoutBtn = page.locator("[href='#']");
        this.profileIcon = page.locator('#img');
        this.invalidFieldMessage = page.locator('.invalid-text-danger');
        this.forgotLink = page.locator("[title='Forgot Password']");
        this.forgotEmail = page.locator('#email');
        this.sendPassword = page.locator('.btn');
        this.okBtn = page.getByRole('button', {name:'OK'});
        this.dialogTitle = page.locator('#swal2-title');
        this.toastDetail = page.locator('.p-toast-detail');
    }

    async PageURL()
    {
        await this.page.goto(this.URL);
    }

    async MobileSrn()
    {
        await this.page.locator('//a').nth(1).click();
    }

    async EmailLogin(Email, Password)
    {
        await this.username.fill(Email);
        await this.password.fill(Password);
        await this.signinBtn.click();
        
        //try{
            //await this.page.waitForTimeout(1500);
           // await this.page.locator('.swal2-cancel.btn-secondary').click();
        //}
        //catch(error){
            //console.error();
        //}
    }

    async MobileLogin(CountryCode, MobileNo, Password)
    {
        await this.page.waitForTimeout(1000);
        await this.page.locator('.iti__flag.iti__ae').nth(0).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator("[aria-label='Search']").fill(CountryCode);
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.mobilenumber.fill(MobileNo);
        await this.password.fill(Password);
        await this.signinBtn.click();

    }

    async LogoutFunction()
    {
        await this.profileIcon.click();
        await this.logoutBtn.click();
    }

    async ForgotPassword(Email)
    {
        await this.forgotLink.click();
        await this.forgotEmail.fill(Email);
        await this.sendPassword.click();
    }
    
    }
    module.exports = {login};