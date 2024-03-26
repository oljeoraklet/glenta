import { eventSchema } from "$lib/zod/schema.js";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { generateId } from "lucia";

export const load = async (event) => {
    if(!event.locals.user){
        return redirect(302, "/login");
    }
	return { form: await superValidate(event, zod(eventSchema)) };
}

export const actions: Actions = {
    default: async (event) => {
        console.log("Howdy event");
            console.log("Howdy try 2 supervalidate");
            const form = await superValidate(event, zod(eventSchema));
            console.log("Form", form);

            if (!form.valid) {
                console.log("Not valid", form);
                return fail(400, { form });
            }

            const { title, description, date, location} = form.data;

            const eventUrlToken = generateId(15);
            const createdEvent = await prisma.event.create({data: {
                name: title,
                description,
                date,
                location,
                urlToken: eventUrlToken,
            }})

            const createdEventHost = await prisma.eventHost.create({data: {
                eventId: createdEvent.id,
                userId: event.locals.user.id,
                status: "Accepted"
            }});
            if(!createdEvent || !createdEventHost){
                return fail(500, {form});
            }

            // Your logic to handle the form data...
            
            // Perform the redirect if form is valid
            return redirect(302, "/event" + createdEvent.urlToken);
    }
};

