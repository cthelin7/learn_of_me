<template>
  <v-img  height="100%" cover :src="JesusPic" class="background-image"></v-img>

  <div class="overlay-content" style="height:100%">
    <v-row class=" d-flex align-center ">
      <v-col cols="8">
      </v-col>
      <v-col cols="4">
        <div style="height:100">
          <QuoteCard :quote="currentQuote"></QuoteCard>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import JesusPic from "@/assets/images/carousel/pictures_of_jesus.jpeg";
  import QuoteCard from "@/components/QuoteCard.vue"
  export default {
    name: 'MyComponent',
    components: [
      QuoteCard
    ],
    data() {
      return {
        JesusPic: JesusPic,
        currentQuote: {
          "text": "This is a quote",
          "link": "www.wikipedia.com",
          "linkText": "Wikipedia"
        }
      };
    }
  }
</script>


<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.background-image {
  width: 100%; /* Adjust as needed */
  height: auto; /* Maintain aspect ratio */
  position: absolute;
  top: 0;
  left: 0;
  /* z-index: -1; Ensure the image is behind other content */
}

.overlay-content {
  z-index: 1; /* Ensure the content is above the image */
  text-align: center; /* Optional: Center align content */
  color: white; /* Optional: Text color */
}
</style>
