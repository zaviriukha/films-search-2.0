<script setup lang="ts">
import MovieGrid from "~/components/home/MovieGrid.vue"
import { useMoviesStore } from '~/stores/movies'

const moviesStore = useMoviesStore()
onBeforeMount(() => {
  moviesStore.featureMovies()
})
</script>

<template>
  <v-container>
    <p class="text-h4 mt-4  font-bold mb-8">Popular Today</p>

    <MovieGrid/>

    <v-row justify="center">
      <v-col cols="8">
        <v-pagination
            v-if="moviesStore.movies && moviesStore.movies.total_pages > 1"
            v-model="moviesStore.page"
            :length="moviesStore.movies?.total_pages"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
