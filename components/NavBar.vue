<template>
     <ContentNavigation v-slot="{ navigation }">
        <nav class="flex flex-row justify-between py-5 px-12">
            <div>🪐 Vi12 小星球</div>
            <ul class="flex flex-row-reverse gap-4">
                <li v-for="(link, index) in navigation" :key="index">
                    <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
                </li>
            </ul>
        </nav>
     </ContentNavigation>
</template>
