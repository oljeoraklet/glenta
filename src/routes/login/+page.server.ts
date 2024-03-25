import { lucia } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server"
import type { Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { loginSchema } from "$lib/zod/schema";
import { zod } from "sveltekit-superforms/adapters";

export const load = async (event) => {
	console.log("Howdy login")
	return { form: await superValidate(event, zod(loginSchema)) };
}

export const actions: Actions = {
	default: async (event) => {

		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		const {usernameOrEmail, password,} = form.data;
		

		if(usernameOrEmail.includes("@")){
			console.log("Email", usernameOrEmail);
			const existingUser = await prisma.user.findUnique({
				where: {
					email: usernameOrEmail
				},
				select: {
					id: true,
					hashedPassword: true
				}
			})
			if (!existingUser) {
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
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});
			redirect(302, "/");
		}
		else{
			console.log("Username", usernameOrEmail);
			const existingUser = await prisma.user.findUnique({
				where: {
					userName: usernameOrEmail
				},
				select: {
					id: true,
					hashedPassword: true
				}
			})
			if (!existingUser) {
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
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});
			redirect(302, "/");
		}
	}
};