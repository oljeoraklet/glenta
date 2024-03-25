import { eventSchema } from "$lib/zod/schema.js";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";

export const load = async (event) => {
	return { form: await superValidate(event, zod(eventSchema)) };
}

export const actions: Actions = {
    default: async (event) => {

        const form = await superValidate(event, zod(eventSchema));
        if (!form.valid) {
            console.log("Not valid", form)
            return fail(400, {
                form,
            });
        }
        console.log(form.data)
    }
}