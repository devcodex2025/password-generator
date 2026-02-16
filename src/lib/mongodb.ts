type SortDirection = 1 | -1;

type MongoCursor<T> = {
  sort: (spec: Record<string, SortDirection>) => MongoCursor<T>;
  toArray: () => Promise<T[]>;
};

type MongoCollection<T> = {
  find: (query: Record<string, unknown>) => MongoCursor<T>;
  findOne: (query: Record<string, unknown>) => Promise<T | null>;
};

type MongoDb = {
  collection: <T = Record<string, unknown>>(name: string) => MongoCollection<T>;
};

type MongoClientLike = {
  connect: () => Promise<void>;
  db: (name: string) => MongoDb;
};

let client: MongoClientLike | null = null;
let db: MongoDb | null = null;

export async function getMongoDb(): Promise<MongoDb> {
  if (db) {
    return db;
  }

  const mongoUri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'generatepassword';
  const serverSelectionTimeoutMS = Number.parseInt(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || '3000', 10);

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set. Set MONGODB_URI to use CONTENT_SOURCE=mongodb.');
  }

  // Runtime load avoids build issues when optional providers are unused.
  const nodeRequire = eval('require') as NodeRequire;
  const { MongoClient } = nodeRequire('mongodb') as {
    MongoClient: new (uri: string, options?: { serverSelectionTimeoutMS?: number }) => MongoClientLike;
  };

  client = new MongoClient(mongoUri, {
    serverSelectionTimeoutMS: Number.isFinite(serverSelectionTimeoutMS) ? serverSelectionTimeoutMS : 3000,
  });
  await client.connect();
  db = client.db(dbName);
  return db;
}
