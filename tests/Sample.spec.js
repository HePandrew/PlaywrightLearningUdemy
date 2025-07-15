const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');
const {HA_clinicalUser}=require('../pageObjects/HA_clinicalUser');
const input = require('../testDataFiles/Credentials.json');
const ExcelJs = require('exceljs');
let scEmail;
let domain;
let code;
let mobileNo;
let empNo;
let sheet = 'Sheet1';
const samplemail = 'xeroaug4@mailinator.com';


test('Add SC and check in table & Search bar - HA031', async ({page})=>
    {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("H:/New folder/SCdata.xlsx");
    const worksheet =workbook.getWorksheet(sheet);//getWorksheet(1)
    scEmail = worksheet.getCell('A2').value;
    domain = worksheet.getCell('B2').value;
    code = worksheet.getCell('C2').value;
    mobileNo = worksheet.getCell('D2').value;
    empNo = worksheet.getCell('E2').value;
    //-----------------------------------------------------
    const Email = input.username.HA;
    const Password = input.password.HA;
    const fName = "sup";
    const lName = "er";
    const userEmail = scEmail+domain;
    const depart = "Anaesthesiology";
    const userType = "Super Clinician";
    const gender = "Female";
    const healthLic = "1234567890";
    const nationality = "Lesotho";
    const country = "Mauritius";
    const state = "Flacq District";
    const city = "Ecroignard";

    const LoginClass = new login(page);
    const clinicalUserClass = new HA_clinicalUser(page);
    LoginClass.PageURL();
    LoginClass.EmailLogin(Email, Password);
    await page.waitForLoadState('networkidle');
    await clinicalUserClass.clinicalUsers.click();
    //await clinicalUserClass.addClinicalUser(fName,lName,userEmail,depart,code,mobileNo,empNo,userType,gender,healthLic,nationality,country,state,city);

    await page.waitForSelector('table tbody tr', { state: 'visible' });
    await page.waitForTimeout(2000);
    const rows = await page.locator('table tbody tr').all();
    let expectedEmail = '';

    while(expectedEmail!==samplemail){
      for (let i = 0; i < rows.length; i++) {
        const nameText = await rows[i].locator('td:nth-child(5)').textContent();
        if(nameText===samplemail){
        console.log(nameText+" - is present in table");
        expectedEmail=nameText;
        break;
        }
      }
      try{
        await page.locator('a.page-link.ms-2').click();
      }
      catch(error){
        console.error('An error occurred:', error);
      }
    }    
    await page.pause();
    })
    