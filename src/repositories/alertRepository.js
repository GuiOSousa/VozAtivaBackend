import { client } from "../mongo/client.js";

export class AlertRepository {
    constructor() {}

    async getCollection() {
        await client.connect();
        const dbName = "voz-ativa";
        const mongoClient = client.db(dbName);
        return mongoClient.collection('alertas');
    }

    async createAlert( data ) {
        const collection = await this.getCollection();
        await collection.insertOne(data);
    }

    async getAlerts() {
        const collection = await this.getCollection();
        const alerts = await collection.find().toArray();
        return alerts;
    }
}
