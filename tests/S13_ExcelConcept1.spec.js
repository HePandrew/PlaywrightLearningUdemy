const ExcelJs = require('exceljs');
const {test} = require('@playwright/test');
let s;

async function excelTest()
{
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("D:/download.xlsx");
    const worksheet =workbook.getWorksheet('Sheet1');//getWorksheet(1)
    worksheet.eachRow((row,rowNumber)=>
    {
        row.eachCell((cell,colNumber)=>
        {
            console.log(cell.value);
            s = cell.value;
        })
    })
}
excelTest();

test('skip login',async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/");
    console.log('"---------------------"');
    console.log(s);
})