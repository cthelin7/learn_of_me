<template>
    <v-card flat variant="tonal" color="blue-lighten-3" class="ma-3">
        <v-card-text v-if="openingQuote" class="text-h6" style="color:white">Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and <b style="color:gold">learn of me</b>; for I am meek and lowly in heart: and ye shall find rest unto your souls.</v-card-text>
        
        <v-card-text v-else class="text-h6" style="color:white">{{ quote.text }}</v-card-text>
        <a v-bind:href="quote.link" target="_blank">- {{ quote.linkText }}</a>

        <v-card-actions>
            <v-btn @click="next">Next</v-btn>
            <!-- We could have it go random vs in order vs Book filter, etc -->
            <!-- <v-btn @click="next">Random</v-btn> --> 
        </v-card-actions>
            
    </v-card>
</template>


<script>
  import JesusPic from "@/assets/images/carousel/pictures_of_jesus.jpeg";
  export default {
    name: 'QuoteCard',
    props: {
        quote: {type: Object, default: {text: "default", link: "www.google.com", linkText: "Google"}}
    },
    data() {
      return {
        JesusPic: JesusPic,
        openingQuote: true
      };
    },
    methods: {
        next(){
            console.log("Next, please...");
            this.openingQuote = false;
            this.$emit("next-btn-event");
        }
    }
  }
</script>
