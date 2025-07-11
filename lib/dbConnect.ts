import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI;
console.log("uri", uri);
let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (db) return db;
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  db = client.db();
  return db;
}
