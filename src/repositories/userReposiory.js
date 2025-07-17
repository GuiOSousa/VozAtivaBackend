import { client } from "../mongo/client.js";

export class UserRepository {
    constructor() {}

    async getCollection() {
        await client.connect();
        const dbName = "voz-ativa";
        const mongoClient = client.db(dbName);
        return mongoClient.collection('usuarios');
    }

    async createUser( data ) {
        const collection = await this.getCollection();
        await collection.insertOne(data);
    }

    async getUsers(filters) {
        const collection = await this.getCollection();
        const users = await collection.find(filters).toArray();
        return users;
    }
}
