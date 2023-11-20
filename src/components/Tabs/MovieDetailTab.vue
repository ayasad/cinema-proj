<template>
    <v-container fluid class="bg-teal flex-grow-1 container ">
      <v-card class=" main bg-blue-grey-darken-2 " elevation="3"  rounded="lg">
        <div class="main_wrapper">
            
            <div class="img">
                <v-img :src="movieStore.movie.posterUrl"  contain max-height="100%" max-width="100%" /> 
            </div>
            
            <div class="main_about">
                <div class="main_btns">
                  <v-btn rounded fab height="60px"  class="bg-white round-button" @click="watchClick"><v-icon>mdi-play</v-icon></v-btn>
                  <v-btn rounded fab height="60px"  class="bg-white round-button" @click="bookmarkClick"><v-icon>mdi-history</v-icon></v-btn>
                </div>
                <div class="main_header">
                    <div class="main_header-name">
                        <h1 class="nameRu">{{ movieStore.movie.nameRu }}</h1>
                        <h2 class="nameOriginal text-teal-lighten-1 font-weight-italic">{{ movieStore.movie.nameOriginal }}</h2>
                        <div class="year">
                            <div v-if="movieStore.movie.endYear && movieStore.movie.startYear && (movieStore.movie.startYear!==movieStore.movie.endYear)">{{ movieStore.movie.startYear }} - {{ movieStore.movie.endYear }}</div>
                            <div v-else>{{ movieStore.movie.year }}</div>
                        </div>
                    </div>
                    <div class="main_header-rating">
                        <div class="rating bg-white">
                            <span class="text-teal-lighten-1 font-weight-bold">КиноПоиск : {{ movieStore.movie.ratingKinopoisk}}</span> 
                        </div>
                        <div class="rating bg-teal-lighten-1 " v-if="movieStore.movie.ratingImdb">
                            <span class="text-white font-weight-bold">IMDB : {{ movieStore.movie.ratingImdb}}</span> 
                        </div>
                    </div>
                    
                </div>
                <v-divider :thickness="2" class="border-opacity-100 divider"></v-divider>
                <div class="main_info">
                    <p  class="text-teal-lighten-1  font-weight-bold">
                        <span v-if="movieStore.movie.serial">О сериале:</span>
                        <span v-else>О фильме:</span>
                    </p>
                    
                    <p> Жанр - {{movieStore.movie.genres?(movieStore.movie.genres.length>0? movieStore.movie.genres.map(obj => Object.values(obj).join(' , ')).join(' | '):{}):'-' }}</p>          
                    <p> Страна - {{movieStore.movie.genres?(movieStore.movie.countries.length>0? movieStore.movie.countries.map(obj => Object.values(obj).join(' , ')).join(' | '):{}):'-' }}</p>
                    <p v-if="movieStore.movie.filmLength"> Продолжительность  -  {{movieStore.movie.filmLength}}мин</p>
                    <p v-if="movieStore.movie.slogan"> Слоган  -  {{movieStore.movie.slogan}}</p>

                    <div class="description" v-if="movieStore.movie.description">
                        <p  class="text-teal-lighten-1  font-weight-bold">Описание:</p>
                        <p >{{movieStore.movie.description}}</p>
                    </div>
                    
                    
                </div>
            </div>
            
          
            
        </div>
        <div class="content">
          <div class="carousel" >
            <h1 class="mb-3">Кадры</h1>
            <v-sheet elevation="20">
              <v-carousel class="carousel_block"  cycle    :height-full="500"  :width-full="400" show-arrows="hover" hide-delimiters progress="white" >
                <v-carousel-item v-for="(img,index) in movieStore.imgs" :key="index" :src="img.imageUrl"   cover ></v-carousel-item>
              </v-carousel>
            </v-sheet>
            
          </div>
          <div class="yt" >
            <h1 class="mb-3 trailers" >Трейлеры </h1>
            <div class="yt-videos">
              <v-skeleton-loader
                  boilerplate
                  class="mx-auto"
                  elevation="2"
                  max-width="580"
                >
                  <v-slide-group
                      class="w-100 p-5"
                      mandatory
                      selected-class="bg-primary"
                      show-arrows
                    >
                      <v-slide-group-item
                        v-for="video in movieStore.videos"
                        :key="video.name"
                      >
              
                        <div class="yt-player">
                          <iframe class="yt-video"  :src="video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                      </v-slide-group-item>
                  </v-slide-group>
                </v-skeleton-loader>
                  
              
            </div>
            
          </div>
          
        </div>
        
      </v-card>          
    </v-container>
  </template>
  
  
  <script setup>
  import { useMovieDetailStore } from '@/store/movieDetailStore';
  import { useAddedStore } from '@/store/addedStore';
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router';

  const movieStore = useMovieDetailStore();
  const addedStore = useAddedStore();
  const route = useRoute();

  onMounted(() => {
    movieStore.fetchMovie(route.params.id)
  });

  function bookmarkClick(){
    addedStore.addMovie(movieStore.movie.kinopoiskId);
  }

  function watchClick(){
    window.location.href = movieStore.movie.webUrl;
  }

  
  
  
  </script>
  
  <style scoped>
  
  .round-button {
        border-radius: 50%;
        width: 60px;
        height: 60px;
        min-width: unset;
        min-height: unset;
        padding: 0;
        line-height: 1;
    }
  .main_btns{
    display: flex;
    justify-content: end;
    gap:30px
  }
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
  }

  .yt{
    min-width: 10%;
    
  }

  .trailers{
    margin-left: 75px;
  }

  .content{
    margin: 50px 0;
    display: flex;
    width: 100%;
    gap: 20px
  }

  .yt-videos{
    display: flex;
    width: 100%;
    min-height: 89.5%;
  }
  
  .yt-player{
    width: 580px;
    max-width: 100%;
    max-height: 100%;
    position: relative;
    overflow: hidden;
    margin: 0 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .yt-video{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .carousel_block{
    max-width: 100%;
    max-height: 100%;
  }
  
  .carousel{
    min-width:30%;
    min-height: 100%;
    margin-left: 50px;
  }
  
  
  .main{
    width: 90%;
    min-height: 92.8vh;
    padding: 20px 0;
    
  }

  .main_about{
    max-width: 50%;
    margin-right: 3%;
  }

  .img{
    width: 35%;
    height: 100%;
    margin: 50px;
    margin-top: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .main_wrapper{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

 

  .nameRu{
    font-size: 50px;
  }

  .nameOriginal{
    font-size: 25px;
  }

  .year{
    font-size: 25px;
    margin-top: 20px;
  }

  .main_info{
    font-size: 20px;
    display: flex;
    flex-direction: column;
    gap: 0px;
    
  }


  .divider{
    margin: 20px 0 ;
  }

  .description{
    font-size: 20px;
    margin-top: 20px;
    padding: 15px;
    border: 2px solid white;
    border-radius: 15px;
  }

  .main_header-rating{
    display: flex;
    gap:20px
  }

  .rating{
    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    display:inline-block;
  }
  
  </style>