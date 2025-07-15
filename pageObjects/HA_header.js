class HA_header{

    constructor(page)
    {
        this.page = page;
        this.profileMail = page.locator('#fw-bold');
        this.userDesignation = page.locator("//*[@id='fw-bold']/following-sibling::p");
    }

}
    module.exports = {HA_header};