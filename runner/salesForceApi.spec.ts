import{expect, test}from "@playwright/test"
import { request } from "node:http";
import 'dotenv/config'

test.describe.serial("Salesforce api",async()=>{
    let sforce_token:any;
    let userId:any;
    const salesforceClientId = process.env.SF_CLIENT_ID;
    const salesforceClientSecret = process.env.SF_CLIENT_SECRET;

    test("generate oauth token",async({request})=>{
        if (!salesforceClientId || !salesforceClientSecret) {
            throw new Error("Salesforce client credentials are not configured in the environment variables.");
        }

        let response = await request.post("https://orgfarm-141cbd5f93-dev-ed.develop.my.salesforce.com/services/oauth2/token",{
            headers:{
                "Accept": "Application.json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            form:{
                "client_id": salesforceClientId,
                "client_secret": salesforceClientSecret,
                "grant_type":"client_credentials"
            }
        })

        let responseBody = await response.json()
        sforce_token = responseBody.access_token
        expect(response.status()).toBe(200)
        console.log("Token:"+ sforce_token, response.status())
    })

    test("Create new lead", async({request}) =>{
        let response = await request.post("https://orgfarm-141cbd5f93-dev-ed.develop.my.salesforce.com/services/data/v67.0/sobjects/Lead",{
            headers:{
                "Authorization": `Bearer ${sforce_token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            data:{
                "Salutation": "Mr.",
                "FirstName":"krishna",	
                "LastName":"kumar M",
                "Company":"QA-TESTER"
            }
        })

        let responseBody = await response.json();
        userId = responseBody.id
        expect(response.status()).toBe(201)
        console.log("Lead created:"+ userId, await response.json())
    })

     test("Fetch new lead", async({request}) =>{
        let response = await request.get(`https://orgfarm-141cbd5f93-dev-ed.develop.my.salesforce.com/services/data/v67.0/sobjects/Lead/${userId}`,{
            headers:{
                "Authorization": `Bearer ${sforce_token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })

        let responseBody = await response.json();
        console.log(responseBody)
        expect(response.status()).toBe(200)
        console.log("Fetched data:"+userId,response.status())
        console.log(responseBody.result)
        
     })    

})