<template>
  <v-img  height="100%" cover :src="JesusPic" class="background-image"></v-img>

  <div class="overlay-content" style="height:100%">
    <v-row class=" d-flex align-center ">
      <v-col cols="8">
      </v-col>
      <v-col cols="4">
        <div style="height:100">
          <QuoteCard :quote="currentQuote" v-on:next-btn-event="nextQuote"></QuoteCard>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import JesusPic from "@/assets/images/carousel/pictures_of_jesus.jpeg";
  import QuoteCard from "@/components/QuoteCard.vue";
  import $ from "jquery";
  import api_transformation from "@/assets/api_transformation.json"

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
        },

        data_loaded: "No data",
        sheetsdata: {},
        min_value: 1,
        max_value: 3000,
        
        api_transformation: api_transformation
      };
    },
    mounted(){
      this.get_data_vue();
    },
    methods: {
      nextQuote(){
        this.new_row();
        this.currentQuote.text = this.value;
        this.currentQuote.link = this.link;
        this.currentQuote.linkText = this.verse;
      },
      getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      },
      get_data_vue: function(){
        $.getJSON("https://sheets.googleapis.com/v4/spreadsheets/1UKRLEp73t7xWzL0IEyXzlXcc9B6G4RAk6lUj4z62huE/values/The%20Data?key=AIzaSyCPCmb3gwzxgdBvQ17Fy6wQ0IQ3eUq0SEc", this.set_data);
      },
      set_data: function(jsondata){
        this.sheetsdata = jsondata;
        this.data_loaded = "Data loaded";
      },
      get_stats_data: function(){
        $.getJSON("https://sheets.googleapis.com/v4/spreadsheets/1UKRLEp73t7xWzL0IEyXzlXcc9B6G4RAk6lUj4z62huE/values/UniqueRows?key=AIzaSyCPCmb3gwzxgdBvQ17Fy6wQ0IQ3eUq0SEc", this.set_unique_total);
        
        $.getJSON("https://sheets.googleapis.com/v4/spreadsheets/1UKRLEp73t7xWzL0IEyXzlXcc9B6G4RAk6lUj4z62huE/values/CountPerBook?key=AIzaSyCPCmb3gwzxgdBvQ17Fy6wQ0IQ3eUq0SEc", this.set_per_book_stats);
        
        $.getJSON("https://sheets.googleapis.com/v4/spreadsheets/1UKRLEp73t7xWzL0IEyXzlXcc9B6G4RAk6lUj4z62huE/values/CountPerVolume?key=AIzaSyCPCmb3gwzxgdBvQ17Fy6wQ0IQ3eUq0SEc", this.set_per_volume_stats);
      },
      set_unique_total: function(unique_json){
        //this.num_unique_insights = unique_json.feed.entry[0]["gsx$countuniqueofinsight"]["$t"];
        this.num_unique_insights = parseFloat(unique_json.values[1]);
      },
      set_per_book_stats: function(unique_json){
      // 				this.num_per_book = unique_json;
        this.num_per_book = unique_json.values.slice(1,-1);
        this.make_plot();
      },
      set_per_volume_stats: function(unique_json){
  // 				this.num_per_volume = unique_json;
        this.num_per_volume = unique_json.values.slice(1,-1);
        this.make_volumes_plot();
      },
      new_row: function(){
        let rownum = this.getRndInteger(this.min_value, this.max_value);
                  // console.log(rownum);
                  //let this_row = this.sheetsdata.feed.entry[rownum];
        let this_row = this.sheetsdata.values[rownum];
        let start = "";
      //             if (this_row["gsx$_cn6ca"] !== undefined){
      //               // console.log("not empty!");
      //               start = this_row["gsx$_cn6ca"]["$t"];
      //             };
        if (this_row[0] !== undefined){
                // console.log("not empty!");
          start = this_row[0];
        };
              // console.log(start);
  // 			this.value = start + " " + this_row["gsx$insight"]["$t"];
        this.value = start + " " + this_row[1];
        
  //             this.verse = this_row["gsx$verses"]["$t"];
  // 			var volume = this_row["gsx$volume"]["$t"];
  // 			var book = this_row["gsx$book"]["$t"];
        this.verse = this_row[2];
        var volume = this_row[4];
        var book = this_row[3];
        var chap_and_verse = this.verse.slice(book.length + 1);
        var pat = new RegExp("[^:]*");
        var chapter = pat.exec(chap_and_verse)[0];
        
        let vol_abbr = this.api_transformation[volume].abbr; 
        let book_abbr = this.api_transformation[volume].books[book];
        this.link = "https://www.churchofjesuschrist.org/study/scriptures/" + vol_abbr + "/" + book_abbr + "/" + chapter;
        var verse_numbers = chap_and_verse.slice(chapter.length);
        if (verse_numbers.length > 0){
          this.link = this.link + "." + verse_numbers.slice(1);
          
          // let first_verse_pattern = new RegExp("[*]-?");
          // let first_verse = verse_numbers.slice(1).match(/(\d+)-/)[1];
          let first_verse = verse_numbers.slice(1).match(/\d+/)[0];
          this.link = this.link + "?" + "#p" + first_verse + "#" + first_verse; 
        }
        //make all these computed properties, this just sets the new rownum
      },
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
