<template>
	<div class="pr-12 pt-10">
		<div class="flex flex-col items-end space-y-2">
			<span
				v-for="(menu, index) of menuList"
				:key="index"
				:class="{
					'scend-dli': menu.depth === 2,
					'tired-dli': menu.depth === 3,
					'bg-slate-300': index !== activeHeading,
					'bg-slate-700': index === activeHeading
				}"
			></span>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useScrollspy } from '~/composable/useScrollspy';

const props = defineProps({
	menu: {
		type: Array,
		required: true
	}
});

const menuList = computed(() => {
	const list = [];
	props.menu.forEach((title) => {
		list.push({
			text: title.text,
			depth: title.depth
		});
		if (title.children) {
			for (let i = 0; i < title.children.length; i++) {
				list.push({
					text: title.children[i].text,
					depth: title.children[i].depth
				});
			}
		}
	});
	return list;
});

const { activeHeading, updateHeadings } = useScrollspy();

onMounted(() => {
	const headings = document.querySelectorAll('h2, h3');
	headings.forEach((heading, index) => {
		heading.setAttribute('id', index);
	})
	updateHeadings(headings);
});
</script>

<style lang="scss" scoped>
.scend-dli {
	display: inline-block;
	vertical-align: top;
	line-height: 1;
	width: 1.4em;
	height: 2px;
	border-radius: 5em;
}
.tired-dli {
	display: inline-block;
	vertical-align: top;
	line-height: 1;
	width: 1em;
	height: 2px;
	border-radius: 5em;
}
</style>
