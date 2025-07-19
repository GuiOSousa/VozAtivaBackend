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

    async handleLocation(alertData) {
        if (alertData.lat && alertData.long) {
            alertData.coords = {
                "lat": alertData.lat,
                "long": alertData.long,
            }
            delete alertData.lat
            delete alertData.long
        }

        const json = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${alertData.coords.lat}&lon=${alertData.coords.long}`)
        const data = await json.json()
        const address = data.address;
        
        alertData.location = {
            "country": address.country,
            "state": address.state,
            "city": address.city || address.town || address.village
        }


        return alertData
    }

    async getCollection() {
        await client.connect();
        const dbName = "voz-ativa";
        const mongoClient = client.db(dbName);
        return mongoClient.collection('alertas');
    }

    async createAlert( data ) {
        data = await this.handleLocation(data)

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
