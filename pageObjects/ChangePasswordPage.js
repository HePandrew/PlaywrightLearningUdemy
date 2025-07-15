class ChangePasswordPage{

    constructor(page){
        this.page=page;
        this.passwordField = page.locator("[formcontrolname='password']");
        this.newPasswordField = page.locator("[formcontrolname='newpassword']");
        this.confirmPasswordField = page.locator("[formcontrolname='confirmpassword']");
        this.UpdateBtn = page.locator('.btn-primary');
        this.CancelBtn = page.locator('.btn-secondary');
        this.notMatchValidation = page.locator('.text-danger');
    }

    async changePassword(forgotPassword,newPassword){
        //change the password flow
        await this.passwordField.fill(forgotPassword);
        await this.newPasswordField.fill(newPassword);
        await this.confirmPasswordField.fill(newPassword);
        await this.UpdateBtn.click();
    }
   
}
module.exports = {ChangePasswordPage};