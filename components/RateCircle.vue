<script setup lang="ts">
defineProps({
  rating: {
    type: Number,
    required: true,
  }
})

// Function for choosing color based on rating
const getColor = (rating: number) => {
  if (rating < 5) return 'red-accent-4'
  if (rating < 7) return 'yellow-accent-4'
  return 'green-accent-4'
}

const getBgColor = (rating: number) => {
  if (rating < 5) return 'red-lighten-5'
  if (rating < 7) return 'yellow-lighten-5'
  return 'green-lighten-5'
}

</script>

<template>
  <div class="circle">
    <v-progress-circular
        :size="40"
        :model-value="rating * 10"
        :color="getColor(rating)"
        :bg-color="getBgColor(rating)"
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
