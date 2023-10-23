import config from '../config/config.js';
import { Client, Account, ID } from "appwrite";

export class Auth {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({ email, password, name }) {
        try {
            const result = await this.account.create(ID.unique(), email, password, name);
            if (result) {
                return this.login({ email, password });
            }
            return result;
        }
        catch (err) {
            console.log(`Error creating Account : ${err}`)
            return false;
        }
    }
    async login({ email, password }) {
        try {
            const result = await this.account.createEmailSession(email, password);
            return result;
        }
        catch (err) {
            console.log(`Error logging in : ${err}`)
            return false;
        }
    }
    async logout() {
        try {
            const result = await this.account.deleteSessions();
            return result;
        }
        catch (err) {
            console.log(`Error logging out : ${err}`)
            return false;
        }
    }
    async getAccount() {
        try {
            const result = await this.account.get();
            return result;
        }
        catch (err) {
            console.log(`Error getting Account : ${err}`)
            return false;
        }
        return null;
    }
}
const auth = new Auth();
export default auth;
