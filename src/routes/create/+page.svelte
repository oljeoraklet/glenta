<script lang="ts">
	import CreateEventForm from '$lib/components/custom/[create-event]/create-event-form.svelte';
	export let data;
</script>

<CreateEventForm data={data.form} />
