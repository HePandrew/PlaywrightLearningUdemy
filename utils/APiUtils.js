class APiUtils
{

    constructor(apiContext,loginPayLoad)
    {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
    async getToken()
    {
        const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            })
            expect(loginResponse.ok()).toBeTruthy();
            const loginResponseJson = await loginResponse.json();
            const token = loginResponseJson.token;
            console.log(token);
            return token;
    }

    async creatOrder(orderPayLoad)
    {
        let response = {};
        response.token = await this.getToken();
        const orederResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
        data : orderPayLoad,
        headers : {
                        'Authorization' : response.token,
                        'Content-Type'  : 'application/json'
                  },
        })
        const orderResponseJson = await orederResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }
}

module.exports = {APiUtils};