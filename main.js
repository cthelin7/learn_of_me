function get_data(){
$.getJSON("https://spreadsheets.google.com/feeds/list/1UKRLEp73t7xWzL0IEyXzlXcc9B6G4RAk6lUj4z62huE/2/public/full?alt=json", function(data) {
  //first row "title" column
  let rownum = getRndInteger(0, 500);
  console.log(data.feed.entry[rownum]["gsx$_cn6ca"]["$t"]);
  var sheets_data = data;
  
});
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}



var appVue = new Vue({
        el: '#container',
  vuetify: new Vuetify(),
        data: {
          value: '',
          verse: '',
          data_loaded: "No data",
          sheetsdata: {}
        },
        mounted() {
          this.get_data_vue();
        },
        methods: {
          simple_set: function(){
            this.value = "Chris";
          },
          get_data_vue: function(){
            
                                  $.getJSON("https://spreadsheets.google.com/feeds/list/1UKRLEp73t7xWzL0IEyXzlXcc9B6G4RAk6lUj4z62huE/2/public/full?alt=json", this.set_data);
            
          },
          set_data: function(jsondata){
  this.sheetsdata = jsondata;
  // console.log("sheetsdata set");
            this.data_loaded = "Data loaded";
},
          new_row: function(){
            let rownum = getRndInteger(0, 500);
            // console.log(rownum);
            let this_row = this.sheetsdata.feed.entry[rownum];
            let start = "";
            if (this_row["gsx$_cn6ca"] !== undefined){
              // console.log("not empty!");
              start = this_row["gsx$_cn6ca"]["$t"];
            };
            // console.log(start);
  this.value = start + " " + this_row["gsx$insight"]["$t"];
            this.verse = this_row["gsx$verses"]["$t"];
            
            //make all these computed properties, this just sets the new rownum
          }
        },
      });
