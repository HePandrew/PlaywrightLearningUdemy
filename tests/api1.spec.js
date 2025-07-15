const{test, expect} = require('@playwright/test')

test('api GET method',async({request})=>{
    const response = await request.get("https://reqres.in/api/users?page=2");
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const text = await response.text();
    //expect(text).toContain("Janet")
    //console.log(text)
    const json = response.json();
    console.log(json.id)

})