import { lucia } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";

import { superValidate } from "sveltekit-superforms/server"

import type { Actions } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load = async () => {
	// const form = superValidate()
	return {}
}

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get("username");
		const password = formData.get("password");

		if (
			typeof username !== "string" ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				message: "Invalid username"
			});
		}
		if (typeof password !== "string" || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: "Invalid password"
			});
		}

        const existingUser = await prisma.user.findUnique({
            where: {
                userName: username
            },
            select: {
                id: true,
                hashedPassword: true
            }
        
        })

		// const result = await db.select({id: userTable.id, hashed_password: userTable.hashed_password}).from(userTable).where(eq(userTable.username, username));

		if (!existingUser) {
			// NOTE:
			// Returning immediately allows malicious actors to figure out valid usernames from response times,
			// allowing them to only focus on guessing passwords in brute-force attacks.
			// As a preventive measure, you may want to hash passwords even for invalid usernames.
			// However, valid usernames can be already be revealed with the signup page among other methods.
			// It will also be much more resource intensive.
			// Since protecting against this is none-trivial,
			// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
			// If usernames are public, you may outright tell the user that the username is invalid.
			return fail(400, {
				message: "Incorrect username or password"
			});
		}


		const validPassword = await Bun.password.verify(password, existingUser.hashedPassword);
		if (!validPassword) {
			return fail(400, {
				message: "Incorrect username or password"
			});
		}

		const session = await lucia.createSession(existingUser.id, {});
        console.log(session)
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/");
	}
};