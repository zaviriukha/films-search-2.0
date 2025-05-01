<script setup lang="ts">
import { ref } from 'vue'
import { useDateFormat } from '@vueuse/core'
import MovieCard from '~/components/MovieCard.vue'

const runtimeConfig = useRuntimeConfig()
const movies = ref<any[]>([])

async function searchFilms() {
  try {
    const response = await $fetch<{
      results: any[]
    }>(
        `https://api.themoviedb.org/3/discover/movie?page=1&api_key=${runtimeConfig.public.apiKey}`
    )

    movies.value = response.results.map((m) => {
      // Форматируем дату как строку
      const formattedDate = useDateFormat(
          new Date(m.release_date),
          'MMM Do YYYY',
          { locales: 'en-US' }
      ).value

      return {
        // разворачиваем все поля из API (id, title, overview, и т.д.)
        ...m,
        // добавляем/перезаписываем:
        poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        rating: m.vote_average,
        date: formattedDate,
      }
    })

    console.log('All movies loaded:', movies.value)
  } catch (e) {
    console.error('Failed to fetch movies:', e)
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
