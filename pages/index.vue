<script setup lang="ts">
import MovieGrid from "~/components/home/MovieGrid.vue";
const moviesStore = useMoviesStore()
onBeforeMount(() => {
  moviesStore.featureMovies();
})

</script>

<template>
  <v-container>
    <p class="text-h4 mt-16 font-bold mb-8">Popular Today</p>

    <MovieGrid/>
    <v-row justify="center">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination
              v-if="moviesStore.movies?.total_pages !== 1"
              v-model="moviesStore.page"
              :length="moviesStore.movies?.total_pages"
              class="my-4"
              @update:modelValue="moviesStore.searchMovies"
          />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
