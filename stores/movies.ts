import { defineStore } from 'pinia'
import { ref, type Ref, watch } from 'vue'
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

export const useMoviesStore = defineStore('movies', () => {
    const searchString: Ref<string> = ref('')
    const movies: Ref<Movies | null> = ref(null)
    const page: Ref<number> = ref(1)
    const loading: Ref<boolean> = ref(false)
    const messageStore = useMessageStore()

    // movie formatting function
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

    // popular movies
    async function featureMovies() {
        loading.value = true
        try {
            const runtimeConfig = useRuntimeConfig()
            const response: Movies = await $fetch(
                `https://api.themoviedb.org/3/discover/movie?page=${page.value}&api_key=${runtimeConfig.public.apiKey}`
            )

            movies.value = {
                total_pages: response.total_pages,
                total_results: response.total_results,
                results: response.results
                    .map(formatMovie)
                    .slice(0, 12), // card limit
            }
            console.log('All movies loaded:', movies.value)
        } catch (e) {
            messageStore.showMessage = true
            messageStore.message = e.message || 'Unknown error'
            console.error('Failed to fetch movies:', e)
        } finally {
            loading.value = false
        }
    }

    // Search by name
    async function searchMovies() {
        loading.value = true
        try {
            const runtimeConfig = useRuntimeConfig()
            const response: Movies = await $fetch(
                `https://api.themoviedb.org/3/search/movie?include_adult=true&page=${page.value}` +
                `&query=${encodeURIComponent(searchString.value)}` +
                `&api_key=${runtimeConfig.public.apiKey}`
            )

            movies.value = {
                total_pages: response.total_pages,
                total_results: response.total_results,
                results: response.results.map(formatMovie),
            }
            console.log('Search results loaded:', movies.value)
        } catch (e) {
            messageStore.showMessage = true
            messageStore.message = e.message || 'Unknown error'
            console.error('Failed to search movies:', e)
        } finally {
            loading.value = false
        }
    }

    watch(page, () => {
        if (searchString.value.trim()) {
            searchMovies()
        } else {
            featureMovies()
        }
    })

    return {
        featureMovies,
        searchMovies,
        movies,
        searchString,
        page,
        loading,
    }
})
