<script lang="ts">
	import RegisterForm from './register-form.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<section>
	<RegisterForm data={data.form} />
</section>
