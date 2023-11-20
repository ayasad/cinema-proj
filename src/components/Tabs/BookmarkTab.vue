<template>
  <v-container fluid class="bg-teal flex-grow-1 container ">
      <v-card class=" main bg-blue-grey-darken-2 " elevation="3"  rounded="lg">
        <MoviesList :movies="addedStore.getMovies()" :bookmarkTab="true"/>
      </v-card>          
  </v-container>
</template>

<script setup>
  import MoviesList from '@/components/MoviesList.vue'
  import {useRouter} from 'vue-router'
  import { useAddedStore } from '@/store/addedStore';

  const addedStore = useAddedStore()
  const router = useRouter()

</script>

<style scoped>

.container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.main{
  max-width: 90%;
  min-height: 92.8vh;
  padding: 0  12px;
}


</style>