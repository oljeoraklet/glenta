import { lucia } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import { prisma } from "$lib/server/prisma";
import type { Actions } from './$types';
import { superValidate } from "sveltekit-superforms";
import { registerSchema } from "$lib/zod/schema";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async (event) => {
	return { form: await superValidate(event, zod(registerSchema)) };
}


export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		const { email, password } = form.data;

		const userId = generateId(15);
		const hashedPassword = await Bun.password.hash(password);

		await prisma.user.create({
			data: {
				id: userId,
				email,
				hashedPassword,
			}
		})


		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/");
	}
};