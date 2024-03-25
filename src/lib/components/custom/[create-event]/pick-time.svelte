<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { createEventDispatcher } from 'svelte';

	export let hours: number = new Date().getHours();
	export let minutes: number = new Date().getMinutes();
	const dispatch = createEventDispatcher();

	function updateHours(newHours: number) {
		hours = newHours;
		dispatchTimeChange();
	}

	function updateMinutes(newMinutes: number) {
		minutes = newMinutes;
		dispatchTimeChange();
	}

	function dispatchTimeChange() {
		dispatch('timeChange', { hours, minutes });
	}
</script>

<div class="time-picker">
	<!-- Hours Dropdown -->
	<Select.Root on:select={(e) => updateHours(e.detail.value)}>
		<Select.Trigger class="w-[80px]">
			<Select.Value placeholder="Hours" />
		</Select.Trigger>
		<Select.Content>
			{#each Array(24) as _, i}
				<Select.Item value={i}>{String(i).padStart(2, '0')}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>

	<!-- Minutes Dropdown -->
	<Select.Root on:select={(e) => updateMinutes(e.detail.value)}>
		<Select.Trigger class="w-[80px]">
			<Select.Value placeholder="Minutes" />
		</Select.Trigger>
		<Select.Content>
			{#each Array(60) as _, i}
				<Select.Item value={i}>{String(i).padStart(2, '0')}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>

<style>
	.time-picker {
		/* Add your styling here */
		display: flex;
		gap: 10px;
	}
</style>
