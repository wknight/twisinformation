var OAuth = require('oauth');
var utoken = '72083806-SyqLWTdhdH0wkgKhvMHlo9IEEgbN1wnN45CsW3a6o'; //user token
var usecret = 'TqkgBV32973bqLg4edk0CyTv3ru3YalwAVSIYN0YqA'; // user secret

oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'zw8MoOzd3TCvrtfxpVKBw', //app consumer key
  'zYhxfW40eyFAsYHQNzxHjFj5yiKEGlU8TxFvEsqSGw', //app secret
  '1.0A',
  null,
  'HMAC-SHA1'
);


//function for performing a simple twitter query
exports.tSearch = function(query){
  oauth.get(
  'https://api.twitter.com/1.1/search/tweets.json?q='+query+'&count=10', //twitter REST API query
  utoken, //user token
  usecret, //user secret            
  function (e, data, res){
    if (e) console.error(e);        
    data = JSON.parse(data);
    for (var i=0;i<data.statuses.length;i++){
      console.log(data.statuses[i].text);
    }     
  });
};

//see who reweteeded a particular tweet; returns 
exports.tRetweetby = function(tweetID){
  oauth.get(
  'https://api.twitter.com/1.1/statuses/retweets/'+tweetID+'.json', //twitter REST API query
  utoken, //user token
  usecret, //user secret            
  function (e, data, res){
    if (e) console.error(e);
    data = JSON.parse(data);
    for (var i=0;i<data.length;i++){
      console.log(data[i].user.screen_name);
    }
  });
};

exports.tInfluence = function(tweetID){
  oauth.get(
  'https://api.twitter.com/1.1/statuses/retweets/'+tweetID+'.json', //twitter REST API query
  utoken, //user token
  usecret, //user secret            
  function (e, data, res){
    if (e) console.error(e);        
    data = JSON.parse(data);
    console.log(data[0].retweet_count);
    console.log("Number of retweets: "+data.length);//why are so few retweets listed in data??!
    for (var i=0;i<data.length;i++){
        console.log(data[i].user.followers_count);
    }
  });
};


exports.tUpdate = function(update){
  oauth.post(
  'https://api.twitter.com/1.1/statuses/update.json',
  utoken, //user token
  usecret, //user secret
  {"status":update},
  "application/json",
  function (e, data, res) { 
    if (e) console.error(e)                 
    console.log(data);
  });    
};


exports.tDM = function(username, message){
  oauth.post(
  'https://api.twitter.com/1.1/direct_messages/new.json',
  utoken, //user token
  usecret, //user secret
  {"screen_name":username, "text":message},
  "application/json",
  function (e, data, res) { 
    if (e) console.error(e)                 
    console.log(data);
  });    
};