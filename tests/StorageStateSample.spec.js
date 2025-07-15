const{test, expect} = require ('@playwright/test');

test('sample - storageState', async({page})=>
{
    await page.goto('/#/dashboard/subscription'); // will use storageState
    await expect(page.locator('text=Subscription Info')).toBeVisible();
    await page.pause();
})