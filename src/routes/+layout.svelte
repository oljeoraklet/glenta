<script>
	import Navbar from '$lib/components/custom/nav/navbar.svelte';
	import '../app.pcss';
</script>

<Navbar></Navbar>
<main class="flex h-screen w-full items-center justify-center">
	<slot />
</main>
