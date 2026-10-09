import{test} from "../fixtures/salesForceFixtures"
import 'dotenv/config'

const userName = process.env.SF_USERNAME ?? "";
const password = process.env.SF_PASSWORD ?? "";
test("Verify lead using fixture",async({SFlogin,SFapi})=>{
    //api
    const leadId = await SFapi.createResource()
    const CompanyName = await SFapi.fetchUser(leadId)

    //UI
    await SFlogin.enterUsername(userName)
    await SFlogin.verifyUsername()
    await SFlogin.enterPassword(password)
    const SFhome = await SFlogin.clickLogin()
    const SFlead = await SFhome.navigateToLeadPage("Leads")
    await SFlead.searchLead(CompanyName)
    
})