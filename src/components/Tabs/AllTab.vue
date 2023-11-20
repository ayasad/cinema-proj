<template>
  <v-container fluid class="bg-teal flex-grow-1 container ">
    <v-text-field
      color="teal-lighten-2"
      density="compact"
      placeholder="Поиск..."
      append-icon="mdi-magnify"
      single-line
      hide-details
      variant="underlined"
      v-model="search"
      @keyup.enter="openSearch(search)"
      class="text-field text-white font-weight-bold mb-3 "
      :class=" {isSearching :searching}"
    ></v-text-field>
    <div class="backgrnd" @click.stop.self="closeSearchList" v-if="searching">
      <v-card class=" backgrnd_main bg-blue-grey-darken-2 " elevation="3"  rounded="lg">
        <MoviesList :movies="searchStore.getMovies()" :search="true" @open="openSearch(search)"/>
      </v-card>
    </div>
    <v-card class=" main bg-blue-grey-darken-2 " elevation="3"  rounded="lg">
      <MoviesList :movies="moviesStore.getMovies()"/>
    </v-card>
    
    
              
  </v-container>
</template>

<script setup>
  import MoviesList from '@/components/MoviesList.vue'
  import {ref, watch , onMounted} from 'vue'
  import { useSearchStore } from '@/store/searchStore';
  import { useMoviesStore } from '@/store/moviesStore';
  import {useRouter} from 'vue-router'

  const searchStore = useSearchStore();
  const moviesStore = useMoviesStore();
  const router = useRouter()

  const search = ref('')
  const searching = ref(false)
  


    onMounted(() => {
        moviesStore.fetchMovies()
    })

  watch(()=>search.value,(val)=>{
      if(val.length > 0){
        
        searching.value = true
        searchStore.fetchMovies(search.value.toLowerCase());
        console.log(searchStore.getMovies());
      }else{
        searching.value = false
      }
  })
  
  function openSearch(id){
    router.push({name:'Search', params:{id}})
  }
  function closeSearchList(){
    search.value = '';
    searching.value = false;
  }
</script>

<style scoped>

.container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


.text-field{
  width: 30%;
}

.main{
  width: 90%;
  padding: 0  12px;
}

.backgrnd{
  background: rgba(0,0,0,0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding-top: 125px;

}

.isSearching{
  z-index: 1001;

}

.backgrnd_main{
  width: 500px;
  height: 90vh;
}

</style>