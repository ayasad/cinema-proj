<template>
    <v-container fluid class="bg-teal flex-grow-1 container ">
      <h1>Поиск по запросу  -  "{{ route.params.id }}"</h1>
      <v-card class=" main bg-blue-grey-darken-2 " elevation="3"  rounded="lg">
        <MoviesList :movies="searchStore.getMovies()" :searchTab="true"/>
      </v-card>          
    </v-container>
  </template>
  
  <script setup>
    import MoviesList from '@/components/MoviesList.vue'
    import { onMounted} from 'vue'
    import { useSearchStore } from '@/store/searchStore';
    import { useRoute} from 'vue-router';

    const route = useRoute();
    const searchStore = useSearchStore();

  </script>
  
  <style scoped>
  
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  
  .main{
    width: 90%;
    min-height: 92.8vh;
  }

  h1{
    margin: 20px;
  }
  
  </style>