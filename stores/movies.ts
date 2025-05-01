import {defineStore} from "pinia";
import {ref} from "vue";
import {useDateFormat} from "@vueuse/core";

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

export const useMoviesStore = defineStore(
    'movies', () => {
        const searchString: Ref<string> = ref("")
        const movies: Ref<Movies | null> = ref(null)
        const messageStore = useMessageStore()

        async function featureMovies() {
            try {
                const runtimeConfig = useRuntimeConfig()
                const response: Movies = await $fetch(
                    `https://api.themoviedb.org/3/discover/movie?page=1&api_key=${runtimeConfig.public.apiKey}`
                );
                movies.value = {
                    ...response,
                    results: response.results
                        .map((m) => {
                            const formattedDate = useDateFormat(
                                new Date(m.release_date),
                                'MMM Do YYYY',
                                {locales: 'en-US'}
                            ).value

                            return {
                                ...m,
                                poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
                                rating: m.vote_average,
                                date: formattedDate,
                            }
                        })
                        .slice(0, 10)
                }

                console.log('All movies loaded:', movies.value)
            } catch (e) {
                messageStore.showMessage = true;
                messageStore.message = e.message
                console.error('Failed to fetch movies:', e)
            }
        }

        async function searchMovies() {
            try {
                const runtimeConfig = useRuntimeConfig()
                const response: Movies = await $fetch(
                    `https://api.themoviedb.org/3/search/movie?include_adult=true&page=1&query=${searchString.value}&api_key=${runtimeConfig.public.apiKey}`
                );
                movies.value = {
                    ...response,
                    results: response.results
                        .map((m) => {
                            const formattedDate = useDateFormat(
                                new Date(m.release_date),
                                'MMM Do YYYY',
                                {locales: 'en-US'}
                            ).value

                            return {
                                ...m,
                                poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
                                rating: m.vote_average,
                                date: formattedDate,
                            }
                        })
                }

                console.log('All movies loaded:', movies.value)
            } catch (e) {
                messageStore.showMessage = true;
                messageStore.message = e.message
                console.error('Failed to fetch movies:', e)
            }
        }

        return {featureMovies, movies, searchMovies, searchString};
    }
)
