const {test, expect} = require('@playwright/test');
const storage = require('../storageState.json');

//to get the standard parameters list and min & max possible values of parameters
//get login session id & bearer token from the current storageState
const Login_Session = storage.origins[0].localStorage.filter(item1=>item1.name=="Login_Session_Id");
const Session_Id1=Login_Session[0].value;
const Session_Id = Session_Id1.slice(1,Session_Id1.length-1);
const token1 = storage.origins[0].localStorage.filter(item2=>item2.name=="tokenInfo");
const token2 = token1[0].value;
const BEARER_TOKEN = token2.slice(17,337);


test('get standard parameters of institution',async({request})=>{
    const baseURI = "https://api.cura.cx/api/ParameterSettings/ViewEditProtocolParameters";
    const query_params = {
        Unitgroup_Type : 1,
        Id : 68,
        Login_Session_Id : Session_Id
    };
    const uri = `${baseURI}?${new URLSearchParams(query_params).toString()}`;
    const response = await request.get(uri, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}` // This is how you pass the bearer token
      }
    });
    const responseBody = await response.json();
    //console.log('Secured API Response Body:', responseBody);

    const data = [];

    responseBody.forEach(item => {
      if(item.Parameter_Name!=="Step Count"&&item.Parameter_Name!=="Workout"&&item.Parameter_Name!=="Calories Expended"&&item.Parameter_Name!=="Sleeping"){
        if(item.Max_Possible>0&&item.Min_Possible>0){
        data.push({
          Parameter_Name: item.Parameter_Name,
          Max_Possible: item.Max_Possible,
          Min_Possible: item.Min_Possible
        });
        }
      }
    })
    console.log(data);


})
