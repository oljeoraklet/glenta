<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/index.js';
	import { registerSchema, type RegisterSchema } from '$lib/zod/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { generateUsername } from 'unique-username-generator';

	export let data: SuperValidated<Infer<RegisterSchema>>;
	const form = superForm(data, {
		validators: zodClient(registerSchema)
	});
	const { form: formData, enhance } = form;

	const generateUserName = () => {
		$formData.userName = generateUsername('-');
	};
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="userName">
		<Form.Control let:attrs>
			<Form.Label>User Name</Form.Label>
			<Input {...attrs} bind:value={$formData.userName} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
		<Button variant="secondary" on:click={() => generateUserName()}
			>Generate a random username</Button
		>
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} bind:value={$formData.password} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="passwordConfirmation">
		<Form.Control let:attrs>
			<Form.Label>Confirm Password</Form.Label>
			<Input {...attrs} bind:value={$formData.passwordConfirmation} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Button type="submit">Register</Button>
</form>
