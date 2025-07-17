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

        if (!data.date) {
            const date = new Date()

            data.date = new Date(Date.UTC(
                date.getUTCFullYear(),
                date.getUTCMonth(),
                date.getUTCDate(),
                date.getUTCHours(),
                date.getUTCMinutes(),
                date.getUTCSeconds(),
                date.getUTCMilliseconds()
        ));
        }

        await collection.insertOne(data);
    }

    async getAlerts(filters) {
        const collection = await this.getCollection();
        const alerts = await collection.find(filters).toArray();
        return alerts;
    }
}
