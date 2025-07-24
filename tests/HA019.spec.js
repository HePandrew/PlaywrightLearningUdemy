const {test, expect} = require('@playwright/test');

test('@regression1 Mobile no. field Default Falg - HA019', async ({page})=>
    {
    const def_flag = 'United Arab Emirates +971';

    await page.goto('/#/authentication/signin');
    await page.locator('//a').nth(1).click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.iti__a11y-text').nth(0)).toHaveText(def_flag);
    })