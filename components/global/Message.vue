<script setup lang="ts">
const messageStore = useMessageStore();
</script>

<template>
  <v-dialog v-model="messageStore.showMessage">
    <v-card>
      <v-card-text>
        <p>Oooops... You have some problems!</p>
        <p>{{ messageStore.message }}</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>