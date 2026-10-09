//FIXTURES
import {test as baseTest} from "@playwright/test"
import { LoginPage } from "../pages/login"
import { SalesForceAPI } from "../utils/apiUtility"
import { HomePage } from "../pages/home";
import { request } from "node:http"

//1. create custom type for fixture 
type salesforceObject={
    SFlogin : LoginPage,
    SFhome: HomePage,
    SFapi: SalesForceAPI   
}

//2. created the re usable config like object creation
export const test=baseTest.extend<salesforceObject>({
    SFlogin : async({page},use)=>{
    await page.goto("https://orgfarm-141cbd5f93-dev-ed.develop.my.salesforce.com")
    const loginObj = new LoginPage(page)
    use(loginObj)

    },

    SFapi: async({request},use)=>{
        const loginObj = new SalesForceAPI(request)
        await loginObj.generateToken()
        use(loginObj)
    },

    SFhome: async ({ page, SFapi }, use) => {
  await page.goto(
    `${process.env.SF_BASE_URL}/secur/frontdoor.jsp?sid=${SFapi.accessToken}`
  );
  await page.getByRole('button', { name: 'App Launcher', exact: true }).waitFor({ timeout: 60000 });
  await use(new HomePage(page));
},

})
