// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('searchStore', ()=>{

  let cur = 1
  const searchedMovies = ref([])
  const getMovies = () => searchedMovies.value
  const moviesIsLoading = ref(false)
  const searchRequest = ref('')

  function fetchMovies(key) {
      fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${key}&page=1`, {
        method: 'GET',
        headers: {
            'X-API-KEY': '52eada0a-37fe-4f33-9670-36bca78bc975',
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => 
    {
      searchedMovies.value = data.films
      console.log(searchedMovies.value)
      searchRequest.value = key
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const loadMovies =  () => {
    moviesIsLoading.value = true
   
      console.log('fetching movies' + moviesIsLoading.value)
      fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchRequest.value}&page=${++cur}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': '52eada0a-37fe-4f33-9670-36bca78bc975',
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => 
      {
        searchedMovies.value = [...searchedMovies.value, ...data.films]
        moviesIsLoading.value = false
        console.log('AAAAAAAAAAAAAAAAAAAAA'+moviesIsLoading.value)
      } )
    .catch(err =>console.log(err))    

  }


  return{
    moviesIsLoading,
    loadMovies,
    getMovies,
    fetchMovies,
  }
})
