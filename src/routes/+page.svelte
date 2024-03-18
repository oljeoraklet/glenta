<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import DatePicker from '$lib/components/ui/date-picker/date-picker.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div>
	<h1>Page</h1>
	<p>Hello <span>{data.user.userName}</span></p>
</div>
<DatePicker />
<Button>Click Me</Button>
<form method="post" use:enhance>
	<button>Sign out</button>
</form>
