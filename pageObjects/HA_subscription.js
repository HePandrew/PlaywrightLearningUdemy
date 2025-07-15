class HA_subscription{

    constructor(page)
    {
        this.page = page;
        
        this.signinBtn = page.locator('button[type="submit"]');
    }

}
    module.exports = {HA_subscription};
