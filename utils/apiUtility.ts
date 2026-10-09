import { APIRequestContext, expect } from "@playwright/test";
import 'dotenv/config'

const salesforceClientId = process.env.SF_CLIENT_ID ?? "";
const salesforceClientSecret = process.env.SF_CLIENT_SECRET ?? "";
const baseUrl = process.env.SF_BASE_URL ?? "";

export class SalesForceAPI {
    private sf_token!: string;
    private leadId!: string;


    constructor(private request: APIRequestContext) { }

    async generateToken() {
        if (!salesforceClientId || !salesforceClientSecret || !baseUrl) {
            throw new Error("Missing SF_CLIENT_ID, SF_CLIENT_SECRET or SF_BASE_URL. Check your .env file.");
        }
        const response = await this.request.post(`${baseUrl}/services/oauth2/token`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            form: {
                "client_id": salesforceClientId,
                "client_secret": salesforceClientSecret,
                "grant_type": "client_credentials"
            }
        });
        expect(response.status()).toBe(200)
        let responseBody = await response.json()
        this.sf_token = responseBody.access_token //Oauth key
        console.log("Response", response.status())
    }

    async createResource(): Promise<string> {
        const response = await this.request.post(`${baseUrl}/services/data/v67.0/sobjects/Lead`, {
            headers: {
                "Authorization": `Bearer ${this.sf_token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            data: {
                "Salutation": "Mr.",
                "FirstName": "KRISHNA ",
                "LastName": "KUMAR",
                "Company": "ABC TECH"
            }

        })

        let responseBody = await response.json()
        expect(response.status()).toBe(201)
        this.leadId = responseBody.id
        console.log("Created lead:", this.leadId,)
        return responseBody.id
    }

    async fetchUser(userId: string): Promise<string> {
        const response = await this.request.get(`${baseUrl}/services/data/v67.0/sobjects/Lead/${userId}`, {
            headers: {
                "Authorization": `Bearer ${this.sf_token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }

        })

        let responseBody = await response.json()
        expect(response.status()).toBe(200)
        console.log(await response.json())
        console.log("Fetched incident", responseBody.Company)
        return responseBody.Company
    }
}