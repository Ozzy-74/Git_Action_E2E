//FIXTURES
import {test as baseTest} from "@playwright/test"
import { LoginPage } from "../pages/login"
import { SalesForceAPI } from "../utils/apiUtility"
import { request } from "node:http"

//1. create custom type for fixture 
type salesforceObject={
    SFlogin : LoginPage,
    SFapi: SalesForceAPI   
}

//2. created the re usable config like object creation
export const test=baseTest.extend<salesforceObject>({
    SFlogin : async({page},use)=>{
    await page.goto("https://orgfarm-141cbd5f93-dev-ed.develop.my.salesforce.com")
    const loginObj = new LoginPage(page)
    await use(loginObj)

    },

    SFapi: async({request},use)=>{
        const loginObj = new SalesForceAPI(request)
        await loginObj.generateToken()
        use(loginObj)
    }

})
