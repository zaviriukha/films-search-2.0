<script setup lang="ts">
defineProps({
  rating: {
    type: Number,
    required: true,
  }
})
</script>

<template>
  <div class="circle">
    <v-progress-circular
        :size="40"
        :model-value="rating * 10"
    color="red"
    bg-color="blue"
    >
    <div class="color-black font-bold">{{ rating.toFixed(1) }}</div>
    </v-progress-circular>
  </div>
</template>

<style scoped>
.circle {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 60px;
  left: 15px;
  transform: translateY(-50%);
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
