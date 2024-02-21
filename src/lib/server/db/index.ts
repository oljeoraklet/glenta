import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';

const sqlite = new Database('db/drizzle.db', {create: true});
export const db = drizzle(sqlite);
