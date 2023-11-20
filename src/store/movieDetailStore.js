// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMovieDetailStore = defineStore('movieDetailStore', ()=>{
    const movie = ref({})
    const imgs = ref([])
    const videos = ref([])
    
    function getMovie () { return movie.value}
    
    function fetchMovie  (id){

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
            movie.value = data
            console.log(movie.value)

        } )
        .catch(err =>console.log(err))   
        
        
        fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images?type=STILL&page=1`, {
        method: 'GET',
        headers: {
            'X-API-KEY': '52eada0a-37fe-4f33-9670-36bca78bc975',
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => 
        {
            imgs.value = {...Object.values(data.items)}

        } )
        .catch(err =>console.log(err))  

        fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`, {
        method: 'GET',
        headers: {
            'X-API-KEY': '52eada0a-37fe-4f33-9670-36bca78bc975',
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => 
        {
            let links = data.items.filter((video)=>{return video.site == "YOUTUBE"}).slice(0,5)
            console.log(links)
            videos.value = {...convertToEmbedLinks(links)}
            console.log(videos.value)
        } )
        .catch(err =>console.log(err))  
    }

    function convertToEmbedLinks(links) {
        const embedLinks = [];
        for (let i = 0; i < links.length; i++) {
          const link = links[i].url;
          if (isYouTubeLink(link)) {
            const videoId = extractVideoId(link);
            const embedLink = `https://www.youtube.com/embed/${videoId}`;
            embedLinks.push(embedLink);
          }
        }       
        return embedLinks;
      }
      
      function isYouTubeLink(link) {
        return link.includes('youtube.com') && link.includes('v=');
      }
      
      function extractVideoId(link) {
        const url = new URL(link);
        const searchParams = new URLSearchParams(url.search);
        const videoId = searchParams.get('v');
        return videoId;
      }

  return{
    videos,
    movie,
    imgs,
    getMovie,
    fetchMovie,
  }
})
