import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { userTable } from "./db/schema/user";
import { sessionTable } from "./db/schema/session";
import { db } from "./db";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);; // your adapter

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			username: attributes.username
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
}