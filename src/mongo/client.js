import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = 'mongodb+srv://willygutsche:PpyBDC1KxCzx0uhG@voz-ativa.xxkh1jm.mongodb.net/?retryWrites=true&w=majority&appName=voz-ativa';

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