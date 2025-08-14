const {loginPage} = require('./loginPage');
class POManager
{
constructor(page)
{
    this.page = page;
    this.loginpageClass = new loginPage(this.page);

}

getLoginPage()
{
    return this.loginpageClass;
}

}
module.exports = {POManager};