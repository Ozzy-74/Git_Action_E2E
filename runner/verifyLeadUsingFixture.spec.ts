import 'dotenv/config'
import{test} from "../fixtures/salesForceFixtures"
const userName = process.env.SF_USERNAME ?? "";
const password = process.env.SF_PASSWORD ?? "";

test("Verify lead using fixture",async({SFlogin})=>{
    
    await SFlogin.enterUsername(userName)
    await SFlogin.verifyUsername()
    await SFlogin.enterPassword(password)
    const SFhome = await SFlogin.clickLogin()
    const SFlead = await SFhome.navigateToLeadPage("Leads")
    await SFlead.searchLead("ABC TECH")
})