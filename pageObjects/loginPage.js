class loginPage{

constructor(page)
{
    this.page = page;
    this.signinBtn = page.locator("[value='Login']");
    this.username = page.locator('#userEmail');
    this.password = page.locator('#userPassword')
}

/*async goTo()
{
    await this.page.goTo("https://rahulshettyacademy.com/client");
}*/

async validLogin()
{
    //await this.page.goto("https://rahulshettyacademy.com/client");
    await this.username.fill("vjh@gmail.com");
    await this.password.fill("Test1234");
    await this.signinBtn.click();
    await this.page.waitForLoadState('networkidle');
}

}
module.exports = {loginPage};