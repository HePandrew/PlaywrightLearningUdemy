const {test,expect,request}= require('@playwright/test');
const {APiUtils} = require('./utils/APiUtils');
const loginPayLoad = {userEmail: "vjh@gmail.com", userPassword: "Test1234"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderId:"6581ca979fd99c85e8ee7faf"}]}
let response;
test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})

test('place order', async ({page})=>
    {
        await page.addInitScript(value =>{
            window.localStorage.setItem('token',value);
        }, token);
        
        const productName = 'ZARA COAT 3';
        const email = 'vjh@gmail.com';
        await page.goto("https://rahulshettyacademy.com/client/");
        
        await page.locator("button[routerlink='/dashboard/myorders']").click();
        await page.locator('tbody').waitFor();
        const orderrow = page.locator("tbody tr");
        for(let i=0;i<await orderrow.count();++i){
            const texta = await orderrow.nth(i).locator("[scope='row']").textContent();
            if(response.orderId===texta){
                await orderrow.nth(i).locator(".btn-primary").click();
                break;
            }
            else{console.log("no if");}
        }
        const orderSummary = await page.locator(".col-text").textContent();
        expect(response.orderId.includes(orderSummary)).toBeTruthy();
    })
    