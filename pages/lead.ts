import { Page } from "@playwright/test";

export class LeadPage{

    constructor(private page:Page){}

    async searchLead(LeadName:string){
        await this.page.getByPlaceholder("Search this list...").fill(LeadName)
        await this.page.getByPlaceholder("Search this list...").press("Enter")

        //  const dataTable = this.page.locator("table.slds-table");

        // await dataTable.waitFor({ state: "visible" });

        // const rows = dataTable.locator("tbody tr");

        // console.log("Rows:", await rows.count());

        // // First row → first column → link
        // const firstName = rows.first().locator("td").first().locator("a").first();

        // await firstName.waitFor({ state: "visible" });

        // console.log("First lead:", await firstName.innerText());

        // await firstName.click();

    }

}