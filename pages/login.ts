import { Page } from "@playwright/test";
import { HomePage } from "./home";

export class LoginPage{

    constructor(private page:Page){}

    async enterUsername(Username:string){
         await this.page.locator("#username").fill(Username)
    }
    async verifyUsername(){
        await this.page.locator("#Login").click();
    }
    
    async enterPassword(Password:string){
        await this.page.locator("#password").fill(Password)
    }
    async clickLogin(){
        await this.page.locator("#Login").click();

        await this.page.locator(`//div[@class="slds-icon-waffle"]`).waitFor({timeout:60000})

        return new HomePage(this.page)
    }
}