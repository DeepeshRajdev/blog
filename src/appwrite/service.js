import config from '../config/config.js';
import { Client, Databases, ID, Query, Storage } from "appwrite";
export class Service {
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    async createPost({ title, content, slug, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );

        }
        catch (err) {
            console.log(`Error creating post: ${err}`)
        }
    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const result = await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
            return result;
        }
        catch (err) {
            console.log(`Error updating post: ${err}`)
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
            return true;
        }
        catch (err) {
            console.log(`Error deleting post: ${err}`)
            return false;
        }
    }
    async getPost(slug) {
        try {
            const result = await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
            return result;
        }
        catch (err) {
            console.log(`Error getting post: ${err}`)
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const result = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            );
            return result;
        }
        catch (err) {
            console.log(`Error getting posts: ${err}`)
            return false;
        }
    }
    async uploadFile(file) {
        try {
            const result = await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
            return result;
        }
        catch (err) {
            console.log(`Error uploading file: ${err}`)
            return false;
        }
    }
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            );
            return true;
        }
        catch (err) {
            console.log(`Error deleting file: ${err}`)
            return false;
        }
    }
    getFilePreview(fileId) {
        try {
            const result = this.storage.getFilePreview(config.appwriteBucketId, fileId);
            return result;
        }
        catch (err) {
            console.log(`Error getting file preview: ${err}`)
            return false;
        }
    }
}
const service = new Service();
export default service;