<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CalendarPlus } from 'lucide-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div>
	<h1>Page</h1>
	<p>Hello <span>{data.user.userName}</span></p>
</div>
<Button>Click Me</Button>
<form method="post" use:enhance>
	<button>Sign out</button>
</form>
<Button href="/create"><CalendarPlus />Skapa ett nytt event</Button>
