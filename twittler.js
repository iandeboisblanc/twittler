        var page = 'home';
        $(document).ready(function(){
          

          refreshTweets();
          $('#home').on('click', function() {
            page = 'home';
            refreshTweets();
          });
          $('button').on('click', refreshTweets);
          $(document).on('click', '.user', function() {
            page = $(this).text().slice(1);
            accessUserPage(page);
          });

        });

        //Functions:
        function createTweetHTML(tweet){
          var $tweet = $('<div class="tweet"></div>');
          $tweet.text(': ' + tweet.message);
          // Create timeStamp element:
          var timeStamp = tweet.created_at;
          var $timeStamp = $('<footer class="timeStamp"></footer>');
          $timeStamp.text(timeStamp);
          $timeStamp.appendTo($tweet);
          var $user = $('<a href="#" class="user">@' + tweet.user + '</a>');
          $user.prependTo($tweet);
          return $tweet;
        }

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
        }


        function accessUserPage(user){
          $('main').text('');
          var username = user;
          for(var index = 0; index < streams.users[username].length; index++) {
            var $tweet = createTweetHTML(streams.users[username][index]);
            $tweet.prependTo($('main'));
          }
        }