<script setup lang="ts">
defineProps({
  rating: {
    type: Number,
    required: true,
  }
})

// Function for choosing color based on rating
const getColor = (rating: number) => {
  if (rating < 5) {
    return 'red-accent-4'; // Rating from 0 to 5
  } else if (rating >= 5 && rating < 7) {
    return 'yellow-accent-4'; // Rating from 5 to 7
  } else {
    return 'green-accent-4'; // Rating from 7 to 10
  }
}
</script>

<template>
  <div class="circle">
    <v-progress-circular
        :size="40"
        :model-value="rating * 10"
        :color="getColor(rating)"
        bg-color="blue-grey-lighten-5"
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
