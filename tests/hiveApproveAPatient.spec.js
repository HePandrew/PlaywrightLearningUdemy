const {test, expect, request} = require('@playwright/test');
const ExcelJs = require('exceljs');


let email;
let finalEmail;
const shortName = '"XH"';
let loginPayLoad;

test.beforeAll(async()=>
{   
    
    const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile("D:/HivePlayWriteExcelSheets/Patient Signup.xlsx");//D:\HivePlayWriteExcelSheets
        const worksheet =workbook.getWorksheet('Sheet1');
        email = worksheet.getCell('A1').value;
        console.log(email);
        //changing the email
        const substring = email.split("@")[0];
        const lastFive = substring.slice(-5);
        console.log(lastFive);
        const num = Number(lastFive);
        const emailInc = num+1;
        console.log(emailInc);
        finalEmail = '"dec'+emailInc+'@mailinator.com"';
        console.log(finalEmail);
    // overriding the email in excel sheet
        const cell = worksheet.getCell('A1');
        cell.value = finalEmail;
        await workbook.xlsx.writeFile("D:/HivePlayWriteExcelSheets/Patient Signup.xlsx");
        
        loginPayLoad = {ApprovalFlag: 0, BLOODGROUP_ID: null, DOB: "2024-12-01T18:30:00.000Z", EMAILID: email, ETHINICGROUP_ID: null, FILETYPE: "", FILE_NAME: "", FirstName: "dec20", GENDER_ID: "2", INSTITUTION_CODE: "XH", INSURANCEID: "", ISMOBILENO_VERIFIED: true, Id: 0, LastName: "2024", MARITALSTATUS_ID: null, MOBILE_NO: "+971~506655998", MiddleName: "", MrnPrefix: "MRN", NATIONALID: "", NATIONALITY_ID: null, UID: "", UserType_Id: 2, User_Id: 0};

    //creating patient
   /* const apiContext = await request.newContext();
    const signupPatient = await apiContext.post("https://api.hive.clinic/api/User/User_InsertUpdate?Login_Session_Id={00000000-0000-0000-0000-000000000000}",
        {
            data : loginPayLoad
        })
        expect(signupPatient.ok()).toBeTruthy();
        const signupPatientJson = await signupPatient.json();
        const status = signupPatientJson.Status;
        console.log(status);
        const message = signupPatientJson.Message;
        console.log(message);*/

    


});

test('check patient',async({page})=>
{
    

    await page.goto("https://rahulshettyacademy.com/client/");
    //await page.goto("https://rahulshettyacademy.com/client/dashboard/dash");
    //await page.reload();
    await page.locator("button[routerlink*='myorders']").click();
    await page.pause();
})