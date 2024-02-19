import { MongoClient, ServerApiVersion } from 'mongodb';
import { config } from 'dotenv';

config();

const uri: string = process.env.URI || '';

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});
