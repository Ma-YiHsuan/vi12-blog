<template>
  <main>
    <article class="w-screen px-[20%] pt-10">
      <ContentDoc />
    </article>
    <aside class="absolute w-1/5 right-0 top-[64px] z-20">
      <ContentSideBox />
    </aside>
  </main>
</template>

<script setup>
import ContentSideBox from '@/components/ContentSideBox.vue';
</script>
