

var keys = require("./keys.js");
var nodeArgs = process.argv;
//var omdbAPI = require("./omdbi.js")
//console.log(nodeArgs)
var queryName = "";

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 3; i < nodeArgs.length; i++) ////command will be the 2nd index value
  {

    if (i > 3 && i < nodeArgs.length) {

      queryName = queryName + "+" + nodeArgs[i];

    }

    else {

      queryName += nodeArgs[i];

    }
  }



var command = process.argv[2]

switch (command) {
  case "my-tweets":

    tweets();
    break;

  case "spotify-this-song":
    spotify(queryName);
    break;

  case "movie-this":
    omdbAPI(queryName);
    break;

  case "do-what-it-says":
    followCommand();
    break;
}// Closing switch/case

///////////////////////////////////////////////////Twitter API/////////////////////////////////////////////////////////////////////
function tweets()
{
  var keys = require("./keys.js");
  var Twitter = require('twitter');
  // console.log(keys)
  var client = new Twitter(keys);
   
  var params = {user_id: 'yenigma124',
                count:20};
                

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error)
     {
      for (var i= 0;i<tweets.length ; i++)
      {

        
        
        console.log("********************Tweet Data*********************************")
        console.log("Tweeted on :"+ tweets[i].created_at)
        console.log("Tweet Text :"+ tweets[i].text)
        console.log("****************************************************************")
    }
    }else{
      
            
      console.log("error")
    }
  });
}//tweet function closing


//////////////////////////////////////////////////Spotify API/////////////////////////////////////////////////////////////////////////
function spotify(songName)
{
  var spotify = require('node-spotify-api');
//console.log("spotify function")
 
var spotifyobj = new spotify({
    id: '015369de0e2e41be93af809370ec7d95', //id: <your spotify client id>,
    secret: 'c0976963eaa64d35a03f391943d2a772' //secret: <your spotify client secret>
  });



 
spotifyobj.search({ type: 'track', query: songName ,limit: '5'}, function(err, data) 
{
  if (err) 
  {
    return console.log('Error occurred: ' + err);
  }
   

  // console.log(data);
     console.log("*************************Track Data************************************")
     console.log("Artists name :" + data.tracks.items[0].album.artists[0].name); 
     console.log("Album name :" + data.tracks.items[0].album.name); 
     console.log("Track name :" + data.tracks.items[0].name); 
     console.log("Track URL :" + data.tracks.items[0].external_urls.spotify);  
     console.log("***********************************************************************")
  });//.search closing
  
}//Close spotify function


///////////////////////////////////////////////OMDB API function/////////////////////////////////////////////////////////////////////////

function omdbAPI(movieName)
{

  var request = require("request");

 
  if(movieName!= "")
  {

  // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    // This line is just to help us debug against the actual URL.
   // console.log(queryUrl);

    request(queryUrl, function(error, response, body)
     {

      // If the request is successful
        if (!error && response.statusCode === 200) 
        {

         // console.log(JSON.parse(body))

          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("***********************Movie Data *********************************")
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Release Year: " + JSON.parse(body).Year);
          console.log("IMDB rating : " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("Release Year: " + JSON.parse(body).Country);
          console.log("Release Year: " + JSON.parse(body).Language);
          console.log("Release Year: " + JSON.parse(body).Plot);
          console.log("Release Year: " + JSON.parse(body).Actors);
          console.log("***********************************************************************")


        }//second if close
    });
  }//first if close
  else
  {
    var queryUrl = "http://www.omdbapi.com/?t=" + "Mr. NObody" + "&y=&plot=short&apikey=40e9cece";

    // This line is just to help us debug against the actual URL.
    //console.log(queryUrl);

    request(queryUrl, function(error, response, body)
     {

      // If the request is successful
        if (!error && response.statusCode === 200) 
        {

         // Movie data for Mr. Nobody
          console.log("***********************************************************************")
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Release Year: " + JSON.parse(body).Year);
          console.log("IMDB rating : " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("Release Year: " + JSON.parse(body).Country);
          console.log("Release Year: " + JSON.parse(body).Language);
          console.log("Release Year: " + JSON.parse(body).Plot);
          console.log("Release Year: " + JSON.parse(body).Actors);
          console.log("***********************************************************************")

        }//second if close
    });
  }//else close

} //Omdbi function end

//////////////////////////////////////////////////Follow Command Function /////////////////////////////////////////////////////////////

function followCommand()
{
 var fs = require("fs");
  
 var output=[];
  
readline = require('readline');

var instream = fs.createReadStream('random.txt');


var rl = readline.createInterface
({
    input: instream,
    terminal: false
});
///Reading random.txt line by line
rl.on('line', function(line) 
{
    // console.log(line);
    //Then write to outstream
    // Break the string down by comma separation and store the contents into the output array.
      
    output = line.split(",");
      //console.log(line);
    var commandTxt=output[0];
    var commandContent = output[1];
    
    if(commandTxt=== "spotify-this-song")
    {
      spotify(commandContent)
    }
    else if(commandTxt=="movie-this")
    {
      omdbAPI(commandContent)
    }else if(commandTxt==="my-tweets")
    {
      tweets()
    }//else closing



});///rl.on function closing



} ///CFollow Command function closing







