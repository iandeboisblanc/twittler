
// Global variable. Indicates whether on home page or a user page. Default is home:
var page = 'home';

$(document).ready(function(){
  // Once the page is ready, it will load all available tweets:
  refreshTweets(); 
  // The refresh icon will load the tweets for the current page:
  $(document).on('click', '#refresh', refreshTweets);
  // The home link returns to the home page and loads all available tweets:
  $('#home').on('click', function() {
    page = 'home';
    refreshTweets();
  });
  // Clicking on a username switches to that user's page then loads all his/her tweets:
  $(document).on('click', '.user', function() {
    page = $(this).text().slice(1);
    refreshTweets();
  });
});

// This func takes a tweet object and wraps it in HTML to create a <div> element:
function createTweetHTML(tweet){
  var $tweet = $('<div class="tweet"></div>');
  $tweet.text(': ' + tweet.message);
  // Create timeStamp element and appends to tweet:
  var timeStamp = tweet.created_at;
  var $timeStamp = $('<footer class="timeStamp"></footer>');
  $timeStamp.text(jQuery.timeago(timeStamp));
  $timeStamp.appendTo($tweet);
  // Create user element and prepend to tweet:
  var $user = $('<a href="#" class="user">@' + tweet.user + '</a>');
  $user.prependTo($tweet);
  return $tweet;
}

// This func loads all available tweets based on the current page (home vs user):
function refreshTweets(){
  var tweetStream;
  $('main').text('');          
  if(page === 'home') {
    tweetStream = streams.home;
    }
  else {
    tweetStream = streams.users[page];
  }
  for(var index = 0; index < tweetStream.length; index++) {
    var $tweet = createTweetHTML(tweetStream[index]);
    $tweet.prependTo($('main'));  
  }
  $('#refreshTracker').find($('abbr')).attr('title', new Date().toISOString());
  jQuery("abbr.timeago").timeago();
}

