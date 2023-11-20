// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMoviesStore = defineStore('moviesStore', ()=>{
  const movies = ref([])
  let cur = 1
  const getMovies = () => movies.value
  const moviesIsLoading = ref(false)


  const fetchMovies = async () => {
    try{
      const response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1', {
        method: 'GET',
        headers: {
            'X-API-KEY': '52eada0a-37fe-4f33-9670-36bca78bc975',
            'Content-Type': 'application/json',
        },
    })
    
      const data = await response.json()
      movies.value = data.items
      // console.log(movies.value)
      
    }catch(err){
      console.log(err)
    }
    

  }

  const loadMovies =  () => {
    moviesIsLoading.value = true
      moviesIsLoading.value = true
      fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${++cur}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': '52eada0a-37fe-4f33-9670-36bca78bc975',
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => 
      {
        movies.value = [...movies.value, ...data.items]
        moviesIsLoading.value = false
      } )
    .catch(err =>console.log(err))    
  }


  return{
    moviesIsLoading,
    getMovies,
    fetchMovies,
    loadMovies
  }
})
