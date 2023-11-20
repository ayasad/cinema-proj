<template>
  <div class="moviesList_wrapper" :class="{scrollable:search}">
    <div class="listContainer">
      <MovieCard v-for="movie in movies" :key="movie.kinopoiskId" :movie="movie"/>    
    </div>
    <div class="wrapper-btns">
      
      <div class="noResults" v-if="!movies.length">
          <span v-if="bookmarkTab">Вы еще ничего не добавили в закладки</span>
          <span v-else>Нет результатов поиска</span>        
      </div>
      <div class="moreBtn" v-if="searchTab || bookmarkTab" >
        <v-btn @click="backClick">Назад</v-btn>
      </div>
      <div class="moreBtn" v-else>
        <div >
          <v-btn @click="handleClick" v-if="bookmarkTab != true" >
            <template v-if="isLoading == false">
              <span>Еще</span>
            </template>
            <template v-else>
              <v-progress-circular indeterminate size="24"></v-progress-circular>
            </template>
          </v-btn>
        </div>
        
      </div>  
    </div>
    

    
  </div>
  
</template>

<script setup>
    import MovieCard from './MovieCard.vue'
    import { useMoviesStore } from '../store/moviesStore'
    import { useSearchStore } from '../store/searchStore'
    import { computed,defineEmits } from 'vue';
    import { useRouter } from 'vue-router';
    

    const props = defineProps({
        movies: {
            type: Array,
            required: true
        },
        search:{
            type:Boolean,
            default:false,
            required:false
        },
        searchTab:{
            type:Boolean,
            default:false,
            required:false
        },
        bookmarkTab:{
            type:Boolean,
            default:false,
            required:false
        }

    })

    const emit = defineEmits(['open'])

    const router = useRouter()
    const moviesStore = useMoviesStore()
    const searchStore = useSearchStore()
    const isLoading = computed(() => {
      if(!props.searchTab){
        return moviesStore.moviesIsLoading
      }else{
        return searchStore.moviesIsLoading
      }
    })
      

    function backClick() {
      router.push({path:'/all'})
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    }

    function handleClick() {
      if(props.searchTab){
        searchStore.loadMovies()
      }else{
        moviesStore.loadMovies()
      }

      if(props.search){
        console.log('search')
        emit('open')
      }
      
    }
</script>

<style scoped>
    .listContainer{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        gap: 20px;
    }

    .moviesList_wrapper{
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .moreBtn{
      margin: 20px;
    }

    .scrollable{
      overflow-y: scroll;
      height: 100%;
    }

    .wrapper-btns{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    
    .noResults{
      font-size: 40px;
      min-width: 1000px;
      display: flex;
      justify-content: center;
      margin-top: 5px;
    }

</style>