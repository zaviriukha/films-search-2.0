<script setup lang="ts">
defineProps<{
  title: string
  date: string
  poster: string
  rating: number
}>()
</script>

<template>
  <v-card class="relative ">
    <v-img
        :src="poster"
    />
    <RateCircle :rating="rating" />

    <v-card-text>
      <div class="font-weight-bold ms-1 mb-2 text-xl text-white">
        {{ title }}
      </div>
      <div class="font-weight-bold ms-1 mb-2 text-sm text-gray-500/75">
        {{ date }}
      </div>
    </v-card-text>
  </v-card>
</template>
