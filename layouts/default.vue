<script setup lang="ts">
const moviesStore = useMoviesStore();
</script>

<template>
  <v-app id="inspire">
    <v-app-bar height="57" color="#0E192A" class="px-2 px-sm-10">
      <v-container class="d-flex justify-center align-center">
        <v-icon size="40" @click="$router.push(`/`)">mdi-video-vintage</v-icon>

        <v-app-bar-title
            class="text-h4 ml-4 cursor-pointer d-none d-sm-flex"
            @click="$router.push(`/`)"
        >
          Films Search 2.0
        </v-app-bar-title>
        <v-spacer/>

        <v-responsive
            max-width="344"
        >

          <v-text-field
              v-model="moviesStore.searchString"
              variant="outlined"
              density="compact"
              hide-details
              append-inner-icon="mdi-magnify"
              placeholder="Search"
          />

        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main>
      <slot/>
      <Message/>
    </v-main>
  </v-app>
</template>