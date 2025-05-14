import { defineStore } from 'pinia'
import { ref, watch, type Ref } from 'vue'
import { useDateFormat } from '@vueuse/core'
import { useMessageStore } from './message'

interface Results {
    id: number
    title: string
    vote_average: number
    poster_path: string
    release_date: string
}

interface Movies {
    total_pages: number
    total_results: number
    results: Results[]
}

const MAX_PAGES = 500

export const useMoviesStore = defineStore('movies', () => {
    const searchString: Ref<string> = ref('')
    const movies: Ref<Movies | null> = ref(null)
    const page: Ref<number> = ref(1)
    const loading: Ref<boolean> = ref(false)
    const messageStore = useMessageStore()

    function formatMovie(m: Results) {
        const formattedDate = useDateFormat(
            new Date(m.release_date),
            'MMM Do YYYY',
            { locales: 'en-US' }
        ).value

        return {
            ...m,
            poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
            rating: m.vote_average,
            date: formattedDate,
        }
    }

    // Feature movies
    async function featureMovies() {
        loading.value = true
        try {
            const runtimeConfig = useRuntimeConfig()
            const safePage = Math.min(page.value, MAX_PAGES)

            const response: Movies = await $fetch(
                `https://api.themoviedb.org/3/discover/movie?page=${safePage}&api_key=${runtimeConfig.public.apiKey}`
            )

            const limitedTotalPages = Math.min(response.total_pages, MAX_PAGES)

            if (page.value > limitedTotalPages) {
                page.value = limitedTotalPages
            }

            movies.value = {
                total_pages: limitedTotalPages,
                total_results: response.total_results,
                results: response.results.map(formatMovie).slice(0, 12)
            }
        } catch (e) {
            messageStore.showMessage = true
            messageStore.message = e.message || 'Unknown error'
            console.error('Failed to fetch movies:', e)
        } finally {
            loading.value = false
        }
    }

    // Search movies
    async function searchMovies() {
        loading.value = true
        try {
            const runtimeConfig = useRuntimeConfig()
            const safePage = Math.min(page.value, MAX_PAGES)

            const response: Movies = await $fetch(
                `https://api.themoviedb.org/3/search/movie?include_adult=true` +
                `&page=${safePage}` +
                `&query=${encodeURIComponent(searchString.value)}` +
                `&api_key=${runtimeConfig.public.apiKey}`
            )

            const limitedTotalPages = Math.min(response.total_pages, MAX_PAGES)

            if (page.value > limitedTotalPages) {
                page.value = limitedTotalPages
            }

            movies.value = {
                total_pages: limitedTotalPages,
                total_results: response.total_results,
                results: response.results.map(formatMovie)
            }
        } catch (e) {
            messageStore.showMessage = true
            messageStore.message = e.message || 'Unknown error'
            console.error('Failed to search movies:', e)
        } finally {
            loading.value = false
        }
    }

    watch(searchString, () => {
        page.value = 1
    })

    watch(
        [page, searchString],
        ([, newSearch]) => {
            if (newSearch.trim()) {
                void searchMovies()
            } else {
                void featureMovies()
            }
        },
        { immediate: true }
    )

    return {
        featureMovies,
        searchMovies,
        movies,
        searchString,
        page,
        loading
    }
})
