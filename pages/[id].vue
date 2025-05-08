<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useDateFormat } from '@vueuse/core'
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

interface Cast {
  profile_path: string
  name: string
  character: string
}

interface MovieApi {
  title: string
  backdrop_path: string
  release_date: string
  runtime: number
  budget: number
  credits: {
    cast: Cast[]
  }
}

// Our local type after transform
interface Movie {
  title: string
  backdrop_path: string
  release_date: string
  runtime: number
  budget: number
  cast: Cast[]
}

const { data: movie, pending, error } = await useFetch<MovieApi,
    Movie>(
    `https://api.themoviedb.org/3/movie/${route.params.id}` +
    `?api_key=${runtimeConfig.public.apiKey}` +
    `&append_to_response=credits`,
    {
      // take only the necessary fields and “pop up” credits.cast → cast
      transform: (input) => ({
        title: input.title,
        backdrop_path: input.backdrop_path,
        release_date: useDateFormat(
            new Date(input.release_date),
            'MMM Do YYYY',
            { locales: 'en-US' }
        ),
        runtime: `${parseInt(input.runtime/60).toString()}h ${input.runtime % 60}min`,
        budget: input.budget.toLocaleString("en-US", {currency: "USD", style: "currency" }),
        cast: input.credits.cast,
      })
    }
)
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-img
            :src="`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`"
        />
      </v-col>
      <v-col cols="6">
        <h2 class="text-4xl mb-4">{{ movie?.title }}</h2>
        <div class="d-flex gap-4">
          <p class="text-subtitle-1 text-grey">{{ movie?.release_date }} - {{ movie?.runtime }} - {{ movie?.budget }}</p>
        </div>

<!--        <h3 class="mt-6">Cast:</h3>-->
<!--        <ul>-->
<!--          <li v-for="member in movie?.cast" :key="member.name">-->
<!--            {{ member.name }} as {{ member.character }}-->
<!--          </li>-->
<!--        </ul>-->
      </v-col>
    </v-row>
  </v-container>
</template>
