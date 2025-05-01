<script setup lang="ts">
import MovieCard from '~/components/MovieCard.vue'
import {useMoviesStore} from "~/stores/movies";
const moviesStore = useMoviesStore();

onBeforeMount(() => {
  moviesStore.featureMovies()
})

</script>

<template>
  <v-container>
    <p class="text-h4 mt-16 font-bold mb-8">Popular Today</p>

    <v-row>
      <v-col
          v-for="(movie, index) in moviesStore.movies?.results"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
      >
        <MovieCard
            :title="movie.title"
            :poster="movie.poster"
            :rating="movie.rating"
            :date="movie.date"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
