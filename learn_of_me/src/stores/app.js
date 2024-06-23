// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    //
  }),
  actions: () => ({
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
      let rownum = getRndInteger(this.min_value, this.max_value);
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
      
      let vol_abbr = api_transformation[volume].abbr; 
      let book_abbr = api_transformation[volume].books[book];
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
  })
})
