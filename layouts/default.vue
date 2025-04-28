<script setup lang="ts">

</script>

<template>
  <v-app id="inspire">
    <v-app-bar height="57" color="#0E192A" class="px-10">
      <v-icon size="48">mdi-home</v-icon>

      <v-app-bar-title class="text-h4">Films Search 2.0</v-app-bar-title>
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
        ></v-text-field>
      </v-responsive>

    </v-app-bar>

    <v-main>
      <slot/>
    </v-main>
  </v-app>
</template>