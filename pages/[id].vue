<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useDateFormat } from '@vueuse/core'
import DetailsRate from "~/components/movieDetails/detailsRate.vue";

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

interface Cast {
  profile_path: string
  name: string
  character: string
}
interface Genres {
  name: string
}
interface VideoResults {
  key: string
}
interface Videos {
  results: VideoResults[]
}
interface MovieApi {
  title: string
  backdrop_path: string
  release_date: string
  runtime: number
  budget: number
  credits: {
    cast: Cast[]
  },
  genres: Genres[],
  vote_average: number,
  overview: string,
  videos: Videos
}

interface Movie {
  title: string
  backdrop_path: string
  release_date: string
  runtime: string
  budget: string
  cast: Cast[],
  genres: Genres[],
  vote_average: number,
  overview: string,
  video: string | null
}

const { data: movie } = await useFetch<MovieApi, Movie>(
    `https://api.themoviedb.org/3/movie/${route.params.id}` +
    `?api_key=${runtimeConfig.public.apiKey}` +
    `&append_to_response=credits,videos`,
    {
      transform: (input) => ({
        title: input.title,
        backdrop_path: input.backdrop_path,
        release_date: useDateFormat(new Date(input.release_date), 'MMM Do YYYY', { locales: 'en-US' }),
        runtime: `${Math.floor(input.runtime / 60)}h ${input.runtime % 60}min`,
        budget: input.budget.toLocaleString("en-US", { currency: "USD", style: "currency" }),
        // cast: input.credits.cast,
        genres: input.genres,
        vote_average: input.vote_average,
        overview: input.overview,
        video: input.videos?.results?.[0]?.key
            ? `https://www.youtube.com/embed/${input.videos.results[0].key}`
            : null,
        cast: input.credits.cast
            .filter((item) => item.profile_path)
            .slice(0, 8)
      })
    }
)

</script>

<template>
  <v-container>
    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-img
            v-if="movie?.backdrop_path"
            :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`"
            cover
        >
          <template #placeholder>
            <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
            >
              <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
              />
            </v-row>
          </template>
        </v-img>
        <p v-else>No poster available.</p>

      </v-col>
      <v-col cols="12" md="6">
        <div class="text-4xl mb-4 font-bold">{{ movie?.title }}</div>
        <div class="d-flex gap-4 mb-3">
          <p class="text-subtitle-1 text-grey">
            {{ movie?.release_date }} - {{ movie?.runtime }} - {{ movie?.budget }}
          </p>
        </div>
        <div class="d-flex gap-4">
          <v-chip
              v-for="(genre, index) in movie?.genres"
              :key="index"
              variant="outlined"
          >
            {{ genre?.name }}
          </v-chip>
        </div>
        <DetailsRate :rating="movie?.vote_average" class="mb-4" />
        <p class="text-subtitle-1">{{ movie?.overview }}</p>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <div class="text-4xl mb-4">Trailer</div>
        <iframe
            v-if="movie?.video"
            :src="movie.video"
            width="100%"
            height="350"
            frameborder="0"
            allowfullscreen
        />
        <p v-else>No trailer available.</p>
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-4xl mb-4">Cast</div>
        <v-row>
          <v-col
              v-for="(actor, index) in movie?.cast"
              :key="index"
              cols="6"
              sm="6"
              md="4"
              class="d-flex"
          >
            <v-card class="w-100" outlined>
              <v-img
                  :src="`https://image.tmdb.org/t/p/w300/${actor.profile_path}`"
                  height="200"
                  class="object-top"
                  cover
              >
                <template #placeholder>
                  <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                  >
                    <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                    />
                  </v-row>
                </template>
              </v-img>
              <v-card-text class="text-center">
                <div class="font-weight-bold text-lg mb-1">{{ actor.name }}</div>
                <div class="text-grey text-sm">{{ actor.character }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

    </v-row>

  </v-container>
</template>
