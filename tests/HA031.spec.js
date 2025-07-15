const {test, expect} = require('@playwright/test');
const {login}=require('../pageObjects/login');
const {HA_clinicalUser}=require('../pageObjects/HA_clinicalUser');
const input = require('../testDataFiles/Credentials.json');
const ExcelJs = require('exceljs');
const path = require('path');
let scEmail;
let domain;
let code;
let mobileNo;
let empNo;
let sheet = 'Sheet1';


test('Add SC and check in table & Search bar - HA031', async ({page})=>
    {
    const workbook = new ExcelJs.Workbook();
    const filePath = path.resolve(__dirname, '../testDataFiles/ClinicalUsersData.xlsx');
    await workbook.xlsx.readFile(filePath);
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
    //adding super clinician
    await clinicalUserClass.addClinicalUser(fName,lName,userEmail,depart,code,mobileNo,empNo,userType,gender,healthLic,nationality,country,state,city);
    //checking the toaster message
    const displayedMsg = await clinicalUserClass.toastermsg();
    expect(displayedMsg).toEqual('User created successfully');
    //checking the created super clinician in table using email & empID
    const[tableEmail, tableEmpID]=await clinicalUserClass.checkUserInTable(userEmail,empNo);
    expect(userEmail).toEqual(tableEmail);
    expect(empNo).toEqual(tableEmpID);
    //checking the created super clinician from search field
    

    //------------------------ data update
    const word = scEmail.split("sc");
    const num = Number(word[1])+1;
    let rewriteSC = ("sc"+num);
    let rewriteMob = Number(mobileNo)+1;
    const word1 = empNo.split("SC");
    const num1 = Number(word1[1])+1;
    let rewritEmp = ("SC"+num1);
    worksheet.getCell('A2').value = rewriteSC;
    worksheet.getCell('D2').value = rewriteMob.toString();
    worksheet.getCell('E2').value = rewritEmp;
    await workbook.xlsx.writeFile("H:/New folder/SCdata.xlsx");

    await page.pause();
    })
    
    