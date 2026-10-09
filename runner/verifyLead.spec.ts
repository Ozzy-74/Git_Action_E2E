import{test} from "@playwright/test"
import { LoginPage } from "../pages/login"
import 'dotenv/config'
const userName = process.env.SF_USERNAME ?? "";
const password = process.env.SF_PASSWORD ?? "";

test("Learn to verify lead using the reusable function",async({page})=>{

    await page.goto("https://orgfarm-141cbd5f93-dev-ed.develop.my.salesforce.com")

    const LP = new LoginPage(page)

    await LP.enterUsername(userName)
    await LP.verifyUsername()

    await LP.enterPassword(password)
    const HP = await LP.clickLogin()
    const LeadPage=await HP.navigateToLeadPage("Leads")
    
    await LeadPage.searchLead("krishna kumar")
})  