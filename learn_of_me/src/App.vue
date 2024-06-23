<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>LEARN OF ME</v-app-bar-title>

      <v-btn @click="$router.push('/Home')">Home</v-btn>
      <v-btn @click="$router.push('/About')">About</v-btn>
      <v-btn @click="$router.push('/BoM')">Book of Mormon</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>

    <v-overlay
      :model-value="overlay"
      class="align-center justify-center"
      opacity=".95"
    >
      <!-- <v-card-text class="text-h4">I am Alpha and Omega, Christ the Lord; yea, even I am he, the beginning and the end, the Redeemer of the world.</v-card-text> -->
       <v-card max-width="600" color="rgba(0,0,0,0)" flat>
        <v-card-text class="text-h4" style="color:grey"><b style="color:gold">I am Jesus Christ</b>.</v-card-text>
        <v-card-text class="text-h4" style="color:grey"><b style="color: yellowgreen">Learn of me</b>, and listen to my words; walk in the meekness of my Spirit, <b style="color:yellowgreen">and you shall have peace in me</b>.</v-card-text>
      </v-card>
    </v-overlay>
  </v-app>
</template>

<script>
  // import { useAppStore } from "@/stores/app.js";

  export default {
    data: () => ({
      overlay: false,
    }),
    mounted(){
      this.overlay = true;
      // this.appStore.get_data_vue();
    },

    // watch: {
    //   overlay (val) {
    //     val && setTimeout(() => {
    //       this.overlay = false
    //     }, 3000)
    //   },
    // },
 }
</script>
