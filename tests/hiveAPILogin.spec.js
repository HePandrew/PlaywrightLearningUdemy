const {test,expect,request}= require('@playwright/test');
const {APiUtils} = require('./utils/APiUtils');
const loginPayLoad = {UserName=xavierandrew16%40gmail.com&Password=Test123&grant_type=password&client_id=68};
const webidleinfo = {[{"Institution_Id":68,"ConfigCode":"WEBIDLETIME","ConfigInfo":"Auto logout user time if idle","ConfigValue":"6000","ConfigTypeDefinition":"Number"}]};

let response;
test.beforeAll(async()=>
{

        const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: loginPayLoad
            })
            expect(loginResponse.ok()).toBeTruthy();
            const loginResponseJson = await loginResponse.json();
            const token = loginResponseJson.token;
            console.log(token);


})

test('place order', async ({page})=>
    {
        {
            await page.addInitScript(value =>{
                window.localStorage.setItem('token',value);
            }, token);
            
            const productName = 'ZARA COAT 3';
            const email = 'vjh@gmail.com';
            await page.goto("https://rahulshettyacademy.com/client/");
            
            await page.locator("button[routerlink='/dashboard/myorders']").click();
            await page.locator('tbody').waitFor();
        }
        
    })