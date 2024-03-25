import { eventSchema } from "$lib/zod/schema.js";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";

export const load = async (event) => {
    if(!event.locals.user){
        return redirect(302, "/login");
    }
	return { form: await superValidate(event, zod(eventSchema)) };
}

export const actions: Actions = {
    default: async (event) => {

        console.log("User", event.locals.user)
        const form = await superValidate(event, zod(eventSchema));
        if (!form.valid) {
            console.log("Not valid", form)
            return fail(400, {
                form,
            });
        }

        const {title, description, date, location} = form.data;

        const createdEvent = await prisma.event.create({
            data: {
                name: title,
                description,
                date,
                location,
                urlToken: generateId(15)
            }
        })
        const eventHost = await prisma.eventHost.create({
            data: {
                eventId: createdEvent.id,
                userId: event.locals.user.id,
                status: "Accepted"
            }
        })

        console.log("Event Created", createdEvent)

        if(!createdEvent){
            return fail(400, {
                message: "Event could not be created"
            });
        }
        if(!eventHost){
            return fail(400, {
                message: "Event Host could not be created"
            });
        }

        return redirect(302, "/event/"+createdEvent.urlToken);
    }
}