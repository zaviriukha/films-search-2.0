<script setup lang="ts">
const router = useRouter();

defineProps<{
  title: string
  date: string
  poster: string
  rating: number
  id: number
}>()

function titleStrings(title: string) {
  return `${title.substring(0, 20)} ${title.length > 20 ? "..." : ""}`
}
</script>

<template>
  <v-card class="relative cursor-pointer" @click="router.push(`/${id}`)">
    <v-img
        :src="poster"
    />
    <RateCircle :rating="rating" />

    <v-card-text>
      <div class="font-weight-bold ms-1 mb-2 text-xl text-white">
        {{ titleStrings(title) }}
      </div>
      <div class="font-weight-bold ms-1 mb-2 text-sm text-gray-500/75">
        {{ date }}
      </div>
    </v-card-text>
  </v-card>
</template>
