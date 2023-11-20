<template>
    <v-toolbar class="bg-blue-grey-darken-2 " elevation="3" >
    <v-toolbar-title >
      <router-link to="/" class="link-btn" >
        <v-icon icon="mdi-alpha-m-circle-outline text-teal-lighten-2" size="large" ></v-icon>
        <div class="logo">
            <span class="small text-teal-lighten-2 ml-4">on</span>
            <span class="small text-white font-weight-black">MOVIES</span>
            <span class="small text-teal-lighten-2">line</span>
        </div>
        
      </router-link>
      
    </v-toolbar-title>
    
    <nav >
        <router-link to="/all">
            <v-btn value="All" stacked class="text-white" width="100" >
                <v-icon class="nav_icon" :class="{active_icon: route.path === '/all'}">mdi-magnify</v-icon>

                <span class="nav_text" :class="{active: route.path === '/all'}">Все</span>
                
            </v-btn>
        </router-link>
        
        <router-link to="/bookmark">
            <v-btn   value="bookmark" stacked class="text-white" width="100" >
                <v-icon class="nav_icon" :class="{active_icon: route.path === '/bookmark'}" >mdi-history</v-icon>

                <span class="nav_text" :class="{active: route.path === '/bookmark'}">Закладки</span>
            </v-btn>
        </router-link>

    </nav>
    <v-spacer></v-spacer>
    
    
  </v-toolbar>
</template>

<script setup>

    import {useRoute} from 'vue-router'
    const route = useRoute()

</script>

<style >

    @media (max-width:600px) {
        .logo{display: none;}
    }
    .logo{
        display: flex;
    }
    .active{
        display:none;
    }

    .active_icon{
        display:block;
    }
    .link-btn {
    text-decoration: none;
    display: flex;
    }

    .nav_text{
        margin-top: 2px;
        position: relative;
    }

    .nav_icon{
        position: relative;
        margin-bottom: 4px;
    }
    .nav_icon.active_icon::after{
        content:'';
        width: 200%;
        height: 4px;
        background-color: #4DB6AC;
        display: block;
        position: absolute;
        border-radius: 10px;
        top:35px;
        right: -50%;
        transition: all 0.3s;
    }
</style>