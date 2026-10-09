import { Page } from '@playwright/test';
import { LeadPage } from './lead';

export class HomePage{

    constructor(private page:Page){}

    async navigateToLeadPage(enterLead:string){
    
   
        await this.page.getByRole("button", { name: "App Launcher", exact: true }).click();

        const searchBox = this.page.getByPlaceholder("Search apps and items...");

        await searchBox.waitFor({ state: "visible" });

        await searchBox.fill(enterLead);

        // Wait for the search result
        const leadResult = this.page.getByText(enterLead, {exact: true});

        await leadResult.waitFor({ state: "visible" });

        // Click the result
        await leadResult.click();
    
        return new LeadPage(this.page)
        
    }
    
}