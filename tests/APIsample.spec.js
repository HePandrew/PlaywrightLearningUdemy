const {test, expect, request} = require('@playwright/test');
const loginPayLoad = {userEmail: "vjh@gmail.com", userPassword: "Test1234"};
let token;
test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data : loginPayLoad
        })
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token;
        console.log(token);

});

test('skip login',async({page})=>
{
    page.addInitScript((value)=>{
        window.localStorage.setItem("token", value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
    //await page.goto("https://rahulshettyacademy.com/client/dashboard/dash");
    //await page.reload();
    await page.locator("button[routerlink*='myorders']").click();
    await page.pause();
})