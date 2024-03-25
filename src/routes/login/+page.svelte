<script lang="ts">
	import LoginForm from '../../lib/components/custom/[login]/login-form.svelte';
	export let data;
</script>

<h1>Sign in</h1>
<LoginForm data={data.form} />
