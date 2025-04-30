<script setup lang="ts">
import MovieCard from '~/components/MovieCard.vue'

const runtimeConfig = useRuntimeConfig()
const movies = ref([])

async function searchFilms() {
  try {
    const response = await $fetch(
        `https://api.themoviedb.org/3/discover/movie?page=1&api_key=${runtimeConfig.public.apiKey}`
    )

    movies.value = response.results
        .slice(0, 10)
        .map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          rating: movie.vote_average,
          date: useDateFormat(new Date(movie.release_date), 'MMM Do YYYY').value,
        }))
    console.log(movies)
  } catch (e) {
    console.error(e)
  }
}

searchFilms()
</script>

<template>
  <v-container>
    <p class="text-h4 mt-16 font-bold mb-8">Popular Today</p>

    <v-row>
      <v-col
          v-for="movie in movies"
          :key="movie.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2.4"
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
