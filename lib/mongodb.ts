import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quickshare';
const MONGODB_DB = process.env.MONGODB_DB || 'quickshare';

interface GlobalMongo {
  conn: { client: MongoClient; db: Db } | null;
  promise: Promise<{ client: MongoClient; db: Db }> | null;
}

// Global caching for Next.js hot-reloading
let cached = (global as any).mongo as GlobalMongo;

if (!cached) {
  cached = (global as any).mongo = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {};
    cached.promise = MongoClient.connect(MONGODB_URI, opts).then(async (client) => {
      const db = client.db(MONGODB_DB);

      // Create TTL index on expiresAt.
      // MongoDB automatically deletes documents when the current time is greater than or equal to expiresAt.
      try {
        await db.collection('pastes').createIndex(
          { expiresAt: 1 },
          { expireAfterSeconds: 0, name: 'paste_ttl_idx' }
        );
        console.log('MongoDB TTL index created/verified successfully.');
      } catch (error) {
        console.error('Failed to create MongoDB TTL index:', error);
      }

      return { client, db };
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
