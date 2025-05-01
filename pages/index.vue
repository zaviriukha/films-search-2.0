<script setup lang="ts">
import {ref} from 'vue'
import {useDateFormat} from '@vueuse/core'
import MovieCard from '~/components/MovieCard.vue'

interface Results {
  id: number,
  title: string,
  vote_average: number,
  poster_path: string,
  release_date: string,
}

interface Movies {
  total_pages: number,
  total_results: number,
  results: Results[]
}

const runtimeConfig = useRuntimeConfig()
const searchString: Ref<string> = ref("")
const movies: Ref<Movies | null> = ref([])
const messageStore = useMessageStore()

async function searchFilms() {
  try {
    const response = await $fetch<{
      results: any[]
    }>(
        `https://api.themoviedb.org/3/discover/movie?page=1&api_key=${runtimeConfig.public.apiKey}`
    )

    movies.value = response.results
        .map((m) => {
          // Форматируем дату как строку
          const formattedDate = useDateFormat(
              new Date(m.release_date),
              'MMM Do YYYY',
              {locales: 'en-US'}
          ).value

          return {
            ...m,
            // добавляем/перезаписываем:
            poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
            rating: m.vote_average,
            date: formattedDate,
          }
        })
        .slice(0, 10)

    console.log('All movies loaded:', movies.value)
  } catch (e) {
    messageStore.showMessage = true;
    messageStore.message = e.message
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
