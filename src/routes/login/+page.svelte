<script lang="ts">
	import { enhance } from '$app/forms';
	import LoginForm from './login-form.svelte';
	export let data;
</script>

<h1>Sign in</h1>
<LoginForm data={data.form} />
