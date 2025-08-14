const {test, expect, request} = require('@playwright/test');
const Userlogin_CheckValidity_PayLoad = {UserName: "xavierandre16@gmail.com", Password: "Test123", Browser_Version: "131.0.0.0", DeviceType: "desktop", Login_City: "", Login_Country: "", Login_IPAddress: "", Password: "Test123", Sys_TimeDifference: -330, UserName: "xavierandre16@gmail.com", loginType: "1"};
const token_PayLoad = "UserName=xavierandre16%40gmail.com&Password=Test123&grant_type=password&client_id=59";

let login_session_id;
let accessToken_id1;
let userInfoResult;
let webIdleJson;
const success1= '[{"Institution_Id":68,"ConfigCode":"WEBIDLETIME","ConfigInfo":"Auto logout user time if idle","ConfigValue":"6000","ConfigTypeDefinition":"Number"}]';
const success2 = '{"Id":1184,"PatientId":null,"InstitutionName":"VPP hospital","IsActive":1,"Department_Name":"Administration","DisplayDepartment_Name":null,"INSTITUTION_ID":68,"INSTITUTION_CODE":null,"FirstName":"velu","MiddleName":"","LastName":"pillai","FullName":"pillai,velu","EMPLOYEMENTNO":"","EMAILID":"xavierandrew16@gmail.com","GOOGLE_EMAILID":null,"FB_EMAILID":null,"appleUserID":null,"ApprovalFlag":null,"Patient_Type":1,"DEPARTMENT_ID":165,"MOBILE_NO":"+91~9566677794","Photo":"","FileName":"","Photo_Fullpath":"C:\\MyCortex\\MyCortexProdApi\\","UserName":"Hospital Admin","UserType_Id":3,"TITLE_ID":null,"HEALTH_LICENSE":"","FILE_NAME":null,"FILETYPE":null,"FILE_FULLPATH":null,"UPLOAD_FILENAME":null,"GENDER_ID":0,"NATIONALITY_ID":0,"ETHINICGROUP_ID":0,"DOB":null,"HOME_AREACODE":"","HOME_PHONENO":"","MOBIL_AREACODE":"","POSTEL_ZIPCODE":"","EMR_AVAILABILITY":null,"ADDRESS1":"","ADDRESS2":"","ADDRESS3":"","Memberid":null,"PolicyNumber":null,"RefernceId":null,"ExpiryDate":null,"PayorId":null,"PlanId":null,"PayorName":null,"PlanName":null,"COUNTRY_ID":0,"STATE_ID":0,"CITY_ID":0,"MARITALSTATUS_ID":0,"BLOODGROUP_ID":0,"PATIENTNO":"1","INSURANCEID":"","MNR_NO":"2409000001","NATIONALID":"","UID":null,"Type":null,"SMOKER":null,"DIABETIC":null,"HYPERTENSION":null,"CHOLESTEROL":null,"ISACTIVE":null,"CREATED_BY":null,"User_Id":null,"GroupName":null,"GENDER_NAME":"","DisplayGENDER_NAME":null,"Nationality":"","CREATED_DT":null,"COUNTRY_NAME":null,"EthnicGroup":"","StateName":null,"LocationName":null,"Institution":null,"LanguageKnown":null,"Createdby_ShortName":null,"CURRENTLY_TAKEMEDICINE":2,"PAST_MEDICALHISTORY":2,"FAMILYHEALTH_PROBLEMHISTORY":2,"VACCINATIONS":2,"DIETDESCRIBE_ID":0,"EXCERCISE_SCHEDULEID":0,"EXCERCISE_TEXT":"","ALERGYSUBSTANCE_ID":0,"ALERGYSUBSTANCE_TEXT":"","SMOKESUBSTANCE_ID":0,"SMOKESUBSTANCE_TEXT":"","ALCOHALSUBSTANCE_ID":0,"ALCOHALSUBSTANCE_TEXT":"","CAFFEINATED_BEVERAGESID":0,"CAFFEINATEDBEVERAGES_TEXT":"","EMERG_CONT_FIRSTNAME":"","EMERG_CONT_MIDDLENAME":"","EMERG_CONT_LASTNAME":"","EMERG_CONT_RELATIONSHIP_ID":0,"LoginTime":null,"Appointment_Module_Id":null,"TimeZone_Id":null,"MaritalStatus":"","BLOODGROUP_NAME":"","RelationShipName":"","DietDescribe":"","AlergySubstance":"","EXCERCISE_SCHEDULE":"","SMOKESUBSTANCE":"","ALCOHALSUBSTANCE":"","CAFFEINATED_BEVERAGES":"","ChronicCondition":null,"MenuType":0,"flag":null,"Group_Id":null,"PASSWORD":null,"Diabetic_Option":null,"HyperTension_Option":null,"Cholesterol_Option":null,"DOB_Encrypt":"","Emergency_MobileNo":"","Protocol_Id":null,"ProtocolName":null,"Approval_flag":1,"Modified_By":null,"GroupTypeList":null,"SelectedGroupList":null,"InstitutionList":null,"SelectedInstitutionList":null,"LanguageList":null,"SelectedLanguageList":null,"ChronicConditionList":null,"SelectedChronicConnditionList":null,"AddMedicines":null,"AddHealthProblem":null,"AddMedicalHistory":null,"ProfileDocuments":null,"PHOTOBLOB_LOW":null,"PHOTOBLOB_THUMB":null,"IS_MASTER":false,"TAB_PIN":null,"TAB_PHOTO":null,"TAB_FINGERPRINT":null,"MrnPrefix":null,"NationalPhotoFullpath":null,"NationalPhotoFilename":null,"InsurancePhotoFullpath":null,"InsurancePhotoFilename":null,"NationalPhoto":null,"InsurancePhoto":null,"Unitgroup_preference":1,"Language_preference":1,"Payment_preference":1,"Insurance_Preference":0,"UserLanguage_Preference":0,"HiveType":0,"PhotoBlob":null,"NationalPhotoBlob":null,"InsurancePhotoBlob":null,"CertificateBlob":null,"Certificate_FileName":null,"FileType":null,"Clinician_Bio":null,"ISMOBILENO_VERIFIED":true}';

test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
    //getting loginSessionId
    const loginSessionID = await apiContext.post("https://api.hive.clinic/api/Login/Userlogin_CheckValidity",
        {
            data : Userlogin_CheckValidity_PayLoad
        })
        expect(loginSessionID.ok()).toBeTruthy();
        const loginSessionIDJson = await loginSessionID.json();
        const login_session_id1 = loginSessionIDJson.Login_Session_Id;
        login_session_id = '"'+login_session_id1+'"';
        console.log(login_session_id);
    
    //getting accessToken
    const accessToken = await apiContext.post("https://api.hive.clinic/token",
    {
        data : token_PayLoad
    })
    expect(accessToken.ok()).toBeTruthy();
    const accessTokenJson = await accessToken.json();
    const accessToken_id=accessTokenJson.access_token;
    accessToken_id1 = '{"access_token":"'+accessToken_id+'"}';
    console.log(accessToken_id1);

    //getting userInfo
    const userDetails = await apiContext.post("https://api.hive.clinic/api/Login/Userlogin_CheckValidity",
        {
            data : Userlogin_CheckValidity_PayLoad
        })
        expect(userDetails.ok()).toBeTruthy();
        const userDetailsJson = await userDetails.json();
        userInfoResult = userDetailsJson.UserDetails;
        console.log(userInfoResult);

    //getting webidleinfo
    const webIdle = await apiContext.get("https://api.hive.clinic/api/Common/AppConfigurationDetails?ConfigCode=WEBIDLETIME&Institution_Id=68");
    expect(webIdle.ok()).toBeTruthy();
    webIdleJson = await webIdle.json();
    console.log(webIdleJson);




});

test('skip login',async({page})=>
{
    //await page.goto("https://hive.clinic/#/authentication/signin");
    //await page.waitForTimeout(10000);

    await page.addInitScript((value)=>{
        window.localStorage.setItem("check_expiry_info", value);
    }, "false");
    await page.addInitScript((value)=>{
        window.localStorage.setItem("product_info", value);
    }, "Hive:assets/resources/Images/Hive_Fav_Icon.png:assets/resources/images/logo-light.png");

    await page.addInitScript((value)=>{
        window.localStorage.setItem("Login_Session_Id", value);
    }, login_session_id);
    await page.addInitScript((value)=>{
        window.localStorage.setItem("tokenInfo", value);
    }, accessToken_id1);
    await page.addInitScript((value)=>{
        window.localStorage.setItem("userInfo", value);
    }, success2);
    await page.addInitScript((value)=>{
        window.localStorage.setItem("webidleinfo", value);
    }, success1);


    await page.goto("https://hive.clinic/#/dashboard/subscription");
    //await page.goto("https://rahulshettyacademy.com/client/dashboard/dash");
    //await page.reload();
    //await page.locator("button[routerlink*='myorders']").click();
    await page.pause();
})