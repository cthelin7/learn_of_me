function get_data(){
$.getJSON("https://spreadsheets.google.com/feeds/list/1UKRLEp73t7xWzL0IEyXzlXcc9B6G4RAk6lUj4z62huE/2/public/full?alt=json", function(data) {
  //first row "title" column
  let rownum = getRndInteger(0, 800);
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
          value: 'Jesus knows and loves you, personally, today.',
          verse: '',
		  link: '',
		  num_unique_insights: 0,
		  num_per_book: {},
		  num_per_volume: {},
          data_loaded: "No data",
          sheetsdata: {},
		  images: [
			{src: "https://assets.ldscdn.org/f2/ca/f2ca4d710fb8bf2ace52f10093b883e84066f05e/pictures_of_jesus_with_a_child.jpeg"},
			{src: "https://assets.ldscdn.org/09/b9/09b9670bc51180a26db298d5b088701b4aed6e48/jesus_heals_lame_man.jpeg"},
			{src: "https://assets.ldscdn.org/fe/23/fe23d31a53817c116d81a9b67867b2ebbf3f44871050148/jesus_christ_consider_the_lilies.jpeg"},
			{src: "https://assets.ldscdn.org/1e/bc/1ebc9910d5a93c38a8030dc3c07bbc722dd74a4a/john_baptizes_jesus_river_jordan.jpeg"},
			{src: "https://assets.ldscdn.org/93/53/935346814dd8aacd646a535b8eda41dd184ed43b/bible_pictures_sermon_on_the_mount.jpeg"},
			{src: "https://assets.ldscdn.org/84/4c/844c966d5ffbab2e262269a7c9288e0f81754276/pictures_of_jesus.jpeg"},
			{src: "https://assets.ldscdn.org/59/71/59712039c5ec8068ea1081c22c3a0ae3de74cb2c/jesus_christ_teaching_sermon_mount.jpeg"},
			{src: "https://assets.ldscdn.org/26/9b/269b66348983e7ea4b7e42626556813f15042dd9/jesus_christ_children.jpeg"},
			{src: "https://assets.ldscdn.org/53/0f/530fc0c1730455a8ca247bfb57c8a2518771973a/pictures_of_jesus_smiling.jpeg"}
		  ], 
		  plottabs: "bofm"
        },
        mounted() {
          this.get_data_vue();
		  this.get_stats_data();
		  //this.make_plot();
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
			get_stats_data: function(){
				$.getJSON("https://spreadsheets.google.com/feeds/list/1UKRLEp73t7xWzL0IEyXzlXcc9B6G4RAk6lUj4z62huE/3/public/full?alt=json", this.set_unique_total);
				
				$.getJSON("https://spreadsheets.google.com/feeds/list/1UKRLEp73t7xWzL0IEyXzlXcc9B6G4RAk6lUj4z62huE/4/public/full?alt=json", this.set_per_book_stats);
				
				$.getJSON("https://spreadsheets.google.com/feeds/list/1UKRLEp73t7xWzL0IEyXzlXcc9B6G4RAk6lUj4z62huE/5/public/full?alt=json", this.set_per_volume_stats);

			},
			set_unique_total: function(unique_json){
				this.num_unique_insights = unique_json.feed.entry[0]["gsx$countuniqueofinsight"]["$t"];
			},
			set_per_book_stats: function(unique_json){
				this.num_per_book = unique_json;
				this.make_plot();
			},
			set_per_volume_stats: function(unique_json){
				this.num_per_volume = unique_json;
				this.make_volumes_plot();
			},
          new_row: function(){
            let rownum = getRndInteger(0, 1000);
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
			var volume = this_row["gsx$volume"]["$t"];
			var book = this_row["gsx$book"]["$t"];
			var chap_and_verse = this.verse.slice(book.length + 1);
			var pat = new RegExp("[^:]*");
			var chapter = pat.exec(chap_and_verse)[0];
			
			let vol_abbr = api_transformation[volume].abbr; 
			let book_abbr = api_transformation[volume].books[book];
            this.link = "https://www.churchofjesuschrist.org/study/scriptures/" + vol_abbr + "/" + book_abbr + "/" + chapter;
			var verse_numbers = chap_and_verse.slice(chapter.length);
			if (verse_numbers.length > 0){
				this.link = this.link + "." + verse_numbers.slice(1);
			}
            //make all these computed properties, this just sets the new rownum
          },
		  make_plot(){
			  var ot_books = [];
			  var ot_totals = [];
			  
			  var nt_books = [];
			  var nt_totals = [];
			  
			  var bofm_books = [];
			  var bofm_totals = [];
			  
			  var dc_books = [];
			  var dc_totals = [];
			  
			  for (let i=0; i < this.num_per_book.feed.entry.length - 1; i++){
				  let this_book = this.num_per_book.feed.entry[i]["gsx$book"]["$t"];
				  if(this_book in api_transformation["Book of Mormon"].books){
					  bofm_books.push(this_book);
					  bofm_totals.push(this.num_per_book.feed.entry[i]["gsx$countuniqueofinsight"]["$t"]);
				  } else if (this_book in api_transformation["Old Testament"].books) {
					  ot_books.push(this_book);
					  ot_totals.push(this.num_per_book.feed.entry[i]["gsx$countuniqueofinsight"]["$t"]);
				  } else if (this_book in api_transformation["New Testament"].books) {
					  nt_books.push(this_book);
					  nt_totals.push(this.num_per_book.feed.entry[i]["gsx$countuniqueofinsight"]["$t"]);
				  } else if (this_book in api_transformation["Doctrine and Covenants"].books) {
					  dc_books.push(this_book);
					  dc_totals.push(this.num_per_book.feed.entry[i]["gsx$countuniqueofinsight"]["$t"]);
				  }
			  }
			  
			  
			  
			  var ot_data = [
				  {
					x: ot_books,
					y: ot_totals,
					type: 'bar'
				  }
				];

			Plotly.newPlot('otPlot', ot_data);
				
			  
			  var nt_data = [
				  {
					x: nt_books,
					y: nt_totals,
					type: 'bar'
				  }
				];

			Plotly.newPlot('ntPlot', nt_data);
				
			  
			  var bofm_data = [
				  {
					x: bofm_books,
					y: bofm_totals,
					type: 'bar'
				  }
				];

			Plotly.newPlot('bofmPlot', bofm_data);
				
			var dc_data = [
				  {
					x: dc_books,
					y: dc_totals,
					type: 'bar'
				  }
				];

			Plotly.newPlot('dcPlot', dc_data);
        },
		make_volumes_plot(){
			var volumes = [];
			var vol_totals = [];
			  
			for (let i=0; i < this.num_per_volume.feed.entry.length - 1; i++){
				  volumes.push(this.num_per_volume.feed.entry[i]["gsx$volume"]["$t"]);
				  vol_totals.push(this.num_per_volume.feed.entry[i]["gsx$countuniqueofinsight"]["$t"]);
			  }
			  
			var volume_data = [
				  {
					x: volumes,
					y: vol_totals,
					type: 'bar'
				  }
				];

			Plotly.newPlot('volumePlot', volume_data);
		  }
		}
      });
