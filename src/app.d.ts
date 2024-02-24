// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from "@prisma/client/";



// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: import("@lucia-auth/sveltekit").User | null;
			session: import("@lucia-auth/sveltekit").Session | null;
		}
	}
	var prisma : PrismaClient
}

export {};
