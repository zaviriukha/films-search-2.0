<script setup lang="ts">
import MovieCard from "~/components/MovieCard.vue";
import {useMoviesStore} from "~/stores/movies";

const moviesStore = useMoviesStore();

onBeforeMount(() => {
  moviesStore.featureMovies()
})
</script>

<template>
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
          :id="movie.id"
      />
    </v-col>
  </v-row>
</template>
