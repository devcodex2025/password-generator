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
  const tls = process.env.MONGODB_TLS?.toLowerCase();
  const ssl = process.env.MONGODB_SSL?.toLowerCase();
  const tlsAllowInvalidCertificates = process.env.MONGODB_TLS_ALLOW_INVALID_CERTIFICATES?.toLowerCase();
  const tlsAllowInvalidHostnames = process.env.MONGODB_TLS_ALLOW_INVALID_HOSTNAMES?.toLowerCase();
  const tlsInsecure = process.env.MONGODB_TLS_INSECURE?.toLowerCase();

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set. Set MONGODB_URI to use CONTENT_SOURCE=mongodb.');
  }

  // Runtime load avoids build issues on local Windows Turbopack setups.
  const nodeRequire = eval('require') as NodeRequire;
  const { MongoClient } = nodeRequire('mongodb') as {
    MongoClient: new (
      uri: string,
      options?: {
        serverSelectionTimeoutMS?: number;
        tls?: boolean;
        ssl?: boolean;
        tlsAllowInvalidCertificates?: boolean;
        tlsAllowInvalidHostnames?: boolean;
        tlsInsecure?: boolean;
      },
    ) => MongoClientLike;
  };

  const parseBool = (value: string | undefined): boolean | undefined => {
    if (value == null) return undefined;
    if (value === 'true' || value === '1' || value === 'yes') return true;
    if (value === 'false' || value === '0' || value === 'no') return false;
    return undefined;
  };

  client = new MongoClient(mongoUri, {
    serverSelectionTimeoutMS: Number.isFinite(serverSelectionTimeoutMS) ? serverSelectionTimeoutMS : 3000,
    tls: parseBool(tls),
    ssl: parseBool(ssl),
    tlsAllowInvalidCertificates: parseBool(tlsAllowInvalidCertificates),
    tlsAllowInvalidHostnames: parseBool(tlsAllowInvalidHostnames),
    tlsInsecure: parseBool(tlsInsecure),
  });
  await client.connect();
  db = client.db(dbName);
  return db;
}
