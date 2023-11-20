<template>
    <v-app class="bg-teal" style="min-height: 100vh; display:flex; flex-direction:column">
        <v-main>         
            <Nav></Nav>
            <router-view></router-view>
        </v-main>
    </v-app>
 
</template>

<script setup>


import Nav from './Nav.vue'
</script>

<style >
    .v-main {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    };

</style>