<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/index.js';
	import { eventSchema, type EventSchema } from '$lib/zod/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import DatePicker from '$lib/components/ui/date-picker/date-picker.svelte';

	export let data: SuperValidated<Infer<EventSchema>>;

	const form = superForm(data, {
		validators: zodClient(eventSchema)
	});
	const { form: formData, enhance } = form;

	$: console.log($formData.date);
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>Title</Form.Label>
			<Input {...attrs} bind:value={$formData.title} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="date">
		<Form.Control let:attrs>
			<Form.Label>Date</Form.Label>
			<div class="flex flex-col items-center gap-4">
				<DatePicker bind:value={$formData.date} />
				<input hidden value={$formData.date} name={attrs.name} />
			</div>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="location">
		<Form.Control let:attrs>
			<Form.Label>Location</Form.Label>
			<Input {...attrs} bind:value={$formData.location} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Input {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Button type="submit">Create event</Button>
</form>
