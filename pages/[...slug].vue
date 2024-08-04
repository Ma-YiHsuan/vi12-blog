<template>
	<main>
		<article class="w-full px-[20%] pt-10 relative">
			<ContentDoc>
				<template v-slot="{ doc }">
					<!-- <div>{{ doc }}</div> -->
					<ContentRenderer :value="doc" />
					<aside class="fixed w-[15%] right-0 top-[10%] z-20">
						<ContentSideMenu :menu="doc.body.toc.links" />
					</aside>
				</template>
			</ContentDoc>
		</article>
	</main>
</template>

<script setup>
import ContentSideMenu from '~/components/ContentSideMenu.vue';
</script>
