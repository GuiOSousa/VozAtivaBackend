import { client } from "../mongo/client.js";

export class AlertRepository {
    constructor() {}
    
    handleDictionary( filters ) {
        if (filters.title) {
		    filters.title = { $regex: filters.title, $options: 'i' };
	    }

        if (filters.date) {
		    filters.date = { $regex: filters.date, $options: 'i' };
	    }
        return filters
    }

    async getCollection() {
        await client.connect();
        const dbName = "voz-ativa";
        const mongoClient = client.db(dbName);
        return mongoClient.collection('alertas');
    }

    async createAlert( data ) {
        if (data.lat && data.long) {
            data.coords = {
                "lat": data.lat,
                "long": data.long,
            }
            delete data.lat
            delete data.long
        }

        const collection = await this.getCollection();
        await collection.insertOne(data);
    }

    async getAlerts(filters) {
        const collection = await this.getCollection();
        filters = this.handleDictionary(filters)
        const alerts = await collection.find(filters).toArray();
        return alerts;
    }
}
