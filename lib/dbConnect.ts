import { MongoClient, Db } from "mongodb";

const uri = "mongodb+srv://asmasiddique44097:blogpost_12345@cluster0.rfedyai.mongodb.net/Blogs?retryWrites=true&w=majority&appName=Cluster0"
console.log("uri",uri);
let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (db) return db;
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  db = client.db(); // Uses the default DB from your connection string
  return db;
}