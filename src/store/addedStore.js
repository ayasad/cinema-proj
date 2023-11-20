// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddedStore = defineStore('addedStore', ()=>{
    const movies = ref([])

    let moviesInLocalStorage = localStorage.getItem('movies')
 
    if(moviesInLocalStorage){
      movies.value = JSON.parse( moviesInLocalStorage)  
    }
    
    const getMovies = () => movies.value
    
    function updateLocalStorage(){
        localStorage.setItem('movies', JSON.stringify(movies.value))
    }

    const addMovie = (id) =>{
        
    const isMovieExists = movies.value.some(movie => movie.kinopoiskId === id)
    if(isMovieExists){
        return
    }

        fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': '52eada0a-37fe-4f33-9670-36bca78bc975',
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => 
        {
            console.log(data)
            movies.value = [...movies.value, data]
            updateLocalStorage()
        } )
        .catch(err =>console.log(err))    
    }

    function deleteMovie (id)  {
        console.log(id + 'delete')
        movies.value = movies.value.filter(movie => movie.kinopoiskId !== id)
        updateLocalStorage()
    }
 

  return{

    getMovies,
    addMovie,
    deleteMovie,
  }
})
