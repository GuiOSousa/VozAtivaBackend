import { MongoClient, ServerApiVersion } from 'mongodb';
import { getEnvKey } from '../env.js';

const uri = getEnvKey("URI")

export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        useNewUrlParser: true,
	    useUnifiedTopology: true,
	    tls: false
    }
});
