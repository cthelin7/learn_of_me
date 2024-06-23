<template>
  
  <!-- <router-link to="/Home">Home</router-link>
  <v-btn @click="$router.push('/Home')">HOME PAGE</v-btn> -->

  <!-- <v-carousel
    cycle
    height="400"
    
    hide-delimiters
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(item,i) in images"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    
    ></v-carousel-item>
  </v-carousel> -->
  <v-img  height="100%" cover :src="JesusPic"></v-img>
  <!-- <v-img
    :width="300"
    aspect-ratio="16/9"
    cover
    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
  ></v-img> -->
</template>

<script>
  import JesusPic from "@/assets/images/carousel/pictures_of_jesus.jpeg";
  export default {
    name: 'MyComponent',
    data() {
      return {
        JesusPic: JesusPic
      };
    }
  }
</script>
