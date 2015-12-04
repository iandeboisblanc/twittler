        $(document).ready(function(){

          refreshTweets();
          $('button').on('click', refreshTweets);
          $('.user').on('click', accessUserPage);

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
          $('main').text('');
          for(var index = 0; index < streams.home.length; index++) {
            var $tweet = createTweetHTML(streams.home[index]);
            $tweet.prependTo($('main'));
          }
          currentIndex = streams.home.length;
        }

        function accessUserPage(){
            $('main').text('');
            var username = $(this).text().slice(1);
            for(var index = 0; index < streams.users[username].length; index++) {
              var $tweet = createTweetHTML(streams.users[username][index]);
              $tweet.prependTo($('main'));
            }
          }