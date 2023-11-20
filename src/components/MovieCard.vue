<template>
    <div class="" 
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    >
        <v-card
            
            class="mx-auto mt-5 card"
            :title="movie.nameRu"
            width="400"
            height="600"
            
        >
            <img
            :src="movie.posterUrl"
            
            class="poster"
            >
            

            <div class="black" :class="{transparent: bookmarkTab}" v-if="hovered">
                
                    <div class="black_info" v-if="!bookmarkTab">
                        <p>{{ movie.year }}</p>
                        <v-divider :thickness="10"
                            class="border-opacity-100"></v-divider>
                        <p> {{movie.genres.length>0? movie.genres.map(obj => Object.values(obj).join(' , ')).join(' , '):{} }}</p>
                        <v-divider :thickness="10"
                            class="border-opacity-100"></v-divider>
                        <p> {{movie.countries.length>0? movie.countries.map(obj => Object.values(obj).join(' , ')).join(' , '):{} }}</p>
                    </div>
                    <div class="black_btn">
                        <v-btn width="60%" height="80px" @click="watchClick">
                            Смотреть
                        </v-btn>
                    </div>

                    <div class="recent">
                        <v-btn rounded fab height="60px"  class="bg-white round-button" @click="handleClick">
                            <v-icon v-if="!bookmarkTab">mdi-history</v-icon>
                            <v-icon v-else>mdi-close</v-icon>
                        </v-btn>
                    </div>
                
                
            </div>
        </v-card>
    </div>
  
  
</template>

<script setup>
    import { ref } from 'vue';
    import { useAddedStore } from '@/store/addedStore';
    import { useMovieDetailStore } from '@/store/movieDetailStore';
    import { useRoute, useRouter } from 'vue-router';

    const addedStore = useAddedStore();
    const movieStore = useMovieDetailStore();
    const route = useRoute();
    const router = useRouter();
    const hovered = ref(false);
    const props = defineProps({
        movie:{
            type: Object,
            required: true,
            default: ()=>{}

        },
    })
    const bookmarkTab = ref(false);
    if( route.path == '/bookmark'){
        bookmarkTab.value = true;
    }

    function handleClick(){
        if(bookmarkTab.value){
            console.log("BOOKMARK TAB")
            console.log(props.movie.kinopoiskId)
            addedStore.deleteMovie(props.movie.kinopoiskId)
        }else{
            console.log("ALL TAB")
            addedStore.addMovie(props.movie.kinopoiskId);
        }
        
    }

    function watchClick(){
        console.log("WATCH TAB")
        router.push({name: 'film', params: {id: props.movie.kinopoiskId}})
  
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
    .recent{
        position: absolute;
        bottom: 12%;
        right: 2%;
    }
    .poster{
       object-fit:cover;
       width: 100%;
       height: auto;
    }

    .card{
        position: relative;
        width: 100%;
    }

    .black{
        background-color: rgba(0,137,123,0.7);
        color:white;
        font-weight: 600;
        font-size:xx-large;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 8.5%;
        left: 0;

    }

    .transparent{
        background-color: transparent;
    }

    .black_info{
        display: flex;
        flex-direction: column;
        gap: 15px;

    }

    .black_info p{
        margin-left: 15px;

    }

   

    .black_info p:first-child{
        margin-top: 15px;
    }

    .black_btn{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 10%;
        width: 100%;
    }
</style>