class mailinatorPassword{

    constructor(page1) {
        this.page1=page1;

   }


    //mailinator retrive password for forget password
   async mail_Pas(Email){
    await this.page1.goto("https://www.mailinator.com/");
    await this.page1.fill('#search', Email);
    await this.page1.locator('button:has-text("GO")').click();
    //await this.page1.waitForLoadState('networkidle');
    await this.page1.waitForTimeout(1000);
    const justNow = await this.page1.getByRole('cell', { name: 'just now' }).textContent();
    //expect(justNow).toContain("just now");
    await this.page1.locator('tr.ng-scope td').nth(2).click();
    const loc1 = await this.page1.frameLocator('#html_msg_body');
    const fullPassword = await loc1.locator('body p').textContent();
    let forgotPassword = fullPassword.split(' : ')[1];
    //await page1.close();
    return forgotPassword;
   }


}
module.exports = {mailinatorPassword};