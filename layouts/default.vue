<script setup lang="ts">

</script>

<template>
  <v-app id="inspire">
    <v-app-bar height="57" color="#0E192A" class="px-10">
      <v-container class="d-flex justify-center align-center">
        <v-icon size="40">mdi-home</v-icon>

        <v-app-bar-title class="text-h4 ml-4">Films Search 2.0</v-app-bar-title>
        <v-spacer/>

        <v-responsive
            max-width="344"
        >
          <v-text-field
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