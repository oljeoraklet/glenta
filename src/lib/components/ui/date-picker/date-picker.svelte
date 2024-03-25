<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import {
		DateFormatter,
		getLocalTimeZone,
		CalendarDate,
		today,
		type DateValue
	} from '@internationalized/date';
	import * as Popover from '$lib/components/ui/popover';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { cn } from '$lib/utils.js';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';

	export let value: Date = new Date();

	let hours = String(value.getHours()).padStart(2, '0');
	//If you want to set the minutes to the nearest 5 minutes, you can use the following code and also pad the start with a 0
	let minutes = String(Math.ceil(value.getMinutes() / 5) * 5).padStart(2, '0');

	const dispatch = createEventDispatcher();
	const df = new DateFormatter('en-US', { dateStyle: 'long' });

	$: parsedValue = value
		? new CalendarDate(value.getFullYear(), value.getMonth() + 1, value.getDate())
		: today(getLocalTimeZone());

	function handleValueChange(v: DateValue | undefined) {
		if (v) {
			const newValue = v.toDate(getLocalTimeZone());
			value = new Date(
				newValue.getFullYear(),
				newValue.getMonth(),
				newValue.getDate(),
				parseInt(hours),
				parseInt(minutes)
			);
			dispatchValueChange();
		}
	}

	function dispatchValueChange() {
		value = new Date(
			value.getFullYear(),
			value.getMonth(),
			value.getDate(),
			parseInt(hours),
			parseInt(minutes)
		);
		dispatch('dateChange', { value });
	}
</script>

<Popover.Root>
	<Popover.Trigger
		class={cn(
			buttonVariants({ variant: 'outline' }),
			'w-[280px] justify-start pl-4 text-left font-normal',
			!parsedValue && 'text-muted-foreground'
		)}
	>
		{parsedValue ? df.format(parsedValue.toDate(getLocalTimeZone())) : 'Pick a date'}
		<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" side="top">
		<Calendar
			bind:value={parsedValue}
			minValue={today(getLocalTimeZone())}
			calendarLabel="Event date"
			initialFocus
			onValueChange={handleValueChange}
		/>
	</Popover.Content>
</Popover.Root>

<div class="time-picker">
	<!-- Hours Dropdown -->
	<Select.Root
		selected={{ value: hours, label: String(hours).padStart(2, '0') }}
		onSelectedChange={(h) => {
			if (h) {
				hours = h.value;
				dispatchValueChange();
			}
		}}
	>
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

	<Select.Root
		selected={{ value: minutes, label: String(minutes).padStart(2, '0') }}
		onSelectedChange={(m) => {
			if (m) {
				minutes = m.value;
				dispatchValueChange();
			}
		}}
	>
		<Select.Trigger class="w-[80px]">
			<Select.Value placeholder="Minutes" />
		</Select.Trigger>
		<Select.Content>
			{#each Array(12) as _, i}
				<Select.Item value={i * 5}>{String(i * 5).padStart(2, '0')}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>

<style>
	.time-picker {
		display: flex;
		gap: 10px;
		width: 100%;
		justify-content: center;
	}
</style>
