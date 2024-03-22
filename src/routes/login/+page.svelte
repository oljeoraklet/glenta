<script lang="ts">
	import { enhance } from '$app/forms';
	import LoginForm from '../../lib/components/custom/[login]/login-form.svelte';
	export let data;
</script>

<h1>Sign in</h1>
<LoginForm data={data.form} />
