import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../../$types';

export const load: PageServerLoad = async ({ params }) => {

	const eventId = params.eventId;

	const foundEvent = prisma.event.findFirst({
		where: {
			urlToken: eventId,
		},
	
	});

	if(!foundEvent){
		error(404, "Event not found");
	}

	return { foundEvent };
};