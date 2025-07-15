class HA_clinicalUser{

    constructor(page)
    {
        this.page = page;
        this.clinicalUsers = page.getByText('Clinical Users');
        this.addNew = page.getByRole('button',{name:'ADD NEW'});
        this.additionalInfo = page.locator('#additional-info-tab');
        this.addressInfo = page.locator('#address-info-tab');
        this.qualificationInfo = page.locator('#qualification-info-tab');
        this.biography = page.locator('#biography-info-tab');
        this.save = page.getByRole('button',{name: 'Save'});
        this.cancel = page.getByRole('button',{name:'Cancel'});
        this.firstName = page.locator('#firstname');
        this.middleName = page.locator('#middleName');
        this.lastName = page.locator('#lastName');
        this.email = page.locator('#email');
        this.department = page.locator('#ddlDepartment');
        this.countryCode = page.locator('.iti__arrow');
        this.countryCodeSearch = page.locator('.iti__search-input');
        this.mobileNo = page.locator('#mobilenumber');
        this.employmentNo = page.locator('#employmentNo');
        this.userType = page.locator('#ddlusertype');
        this.gender = page.locator('#ddlGender');
        this.healthLicense = page.locator('#healthlicense');
        this.nationality = page.locator('#ddlNationality');
        this.dob = page.locator('#icondisplay').nth(0);
        this.country = page.locator('#ddlCountry');
        this.state = page.locator('#ddlState');
        this.city = page.locator('#ddlLocation');
    }

    async addClinicalUser(fName,lName,userEmail,depart,code,mobile,empNo,userType,gender,healthLic,nationality,country,state,city){
        await this.addNew.click();
        await this.firstName.fill(fName);
        await this.lastName.fill(lName);
        await this.email.fill(userEmail);
        await this.department.selectOption(depart);
        await this.countryCode.click()
        await this.countryCodeSearch.fill(code);
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);
        await this.mobileNo.fill(mobile);
        await this.employmentNo.fill(empNo);
        await this.userType.selectOption(userType);
        await this.gender.selectOption(gender);
        //additional info
        await this.additionalInfo.click(); 
        await this.healthLicense.fill(healthLic);
        await this.nationality.selectOption(nationality);
        await this.dob.click();
        await this.page.locator("span.ng-star-inserted[tabindex='0']").click();
        //address info
        await this.addressInfo.click();
        await this.country.selectOption(country);
        await this.state.selectOption(state);
        await this.city.selectOption(city);
        //save
        //await this.save.click();
        await this.page.waitForTimeout(500);
        await this.page.waitForLoadState('networkidle');
    }

    async toastermsg(){
        const toastmsg = await this.page.locator('div.p-toast-detail').textContent();
        console.log("Toaster Msg:- "+toastmsg);
        return toastmsg;
    }

    async checkUserInTable(userEmail,empNo){
        await this.page.waitForSelector('table tbody tr', { state: 'visible' });
        await this.page.waitForTimeout(2000);
        const rows = await this.page.locator('table tbody tr').all();
        let expectedEmail = '';

        while(expectedEmail!==userEmail){
            for (let i = 0; i < rows.length; i++) {
                const emailText = await rows[i].locator('td:nth-child(5)').textContent();
                const empText = await rows[i].locator('td:nth-child(7)').textContent();
                if(emailText===userEmail && empText===empNo){
                    expectedEmail=emailText;
                    break;
                }
            }
            try{
                await this.page.locator('a.page-link.ms-2').click();
            }
            catch(error){
                console.error('An error occurred:', error);
            }
        }
        return[emailText, empText];
    }


}
    module.exports = {HA_clinicalUser};