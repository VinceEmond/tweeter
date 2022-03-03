/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// WAIT TILL AFTER PAGE LOAD
$(() => {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetObj) {
    const {name, avatars, handle} = tweetObj.user;
    const {text} = tweetObj.content;
    const timestampMs = tweetObj["created_at"];
    const timeSinceTweet = timeago.format(timestampMs);



    const $tweet = $(`
    <article class="tweet">
  
          <header>
            <div class="tweet-header-left">

            <!--  <img class="tweet-avatar" src="${avatars}">-->
            <img class="tweet-avatar" src="https://www.seekpng.com/png/full/402-4022635_avatar-generic-person-icon.png"> 
              <!--   <img class="tweet-avatar" src="../public/images/avatar-male.png"> -->
              <!--  <i class="fa-regular fa-face-grin-tongue-wink"></i> -->
              <p>${escape(name)}</p>
            </div>
            <div class="tweet-header-right">
              <p >${escape(handle)}</p>
            </div>
          </header>
  
          <div class="middle">
            <p>${escape(text)}</p>
          </div>
  
          <footer>
            <div class="tweet-footer-left">
              <p>${escape(timeSinceTweet)}</p>
            </div>
            <div class="tweet-footer-right">
              <p><i class="fa-solid fa-flag"></i></p>
              <p><i class="fa-solid fa-retweet"></i></p>       
              <p><i class="fa-solid fa-heart"></i></p>
            </div>
          </footer>
  
        </article>
        `);

  
    return $tweet;
  };

  const renderTweets = function(tweetsDatabase) {
    for (const tweet of tweetsDatabase) {
      $('#tweets-container').prepend(createTweetElement(tweet));

      // $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };

 
  $('.new-tweet-form').submit(function(event) {
    event.preventDefault();

    // Slide-up Error message, THEN do the rest
    $('.validation-error').slideUp(400, () => {

      // Catch if new tweet textarea is empty
      if (!this.text.value) {
        console.log("Error: No text has been input!");
        // alert("Error: No text has been input!");
        $('.error-message').text("Error: No text has been input!");
        $('.validation-error').slideDown(400);
        return;
      }

      // Catch if new tweet textarea contains too many characters
      if (this.text.value.length > 140) {
        console.log("Error: You have entered too many characters!");
        // alert("Error: You have entered too many characters!");
        $('.error-message').text("Error: You have entered too many characters!");
        $('.validation-error').slideDown(400);
        return;
      }


      // Process AJAX POST request
      const serializedText = $(this).serialize();

      $.ajax({url: '/tweets', method: "POST", data: serializedText})
        .then(() => {
          console.log("Tweet AJAX post: sucess!");
          loadTweets();
        })
        .catch((error) => {
          console.log("Error:", error);
        });

    });

  });


  const loadTweets = function() {
    $.ajax({url: '/tweets', method: "GET"})
      .then(function(data) {
        renderTweets(data);
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  };

  $('.validation-error').hide();
  loadTweets();

});



// ***********************************
// Testing "fake" database bellow
// ***********************************

// const tweetDb = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       // "text": "If I have seen further it is by standing on the shoulders of giants"
//       "text": "Bacon ipsum dolor amet short ribs landjaeger drumstick ground round t-bone tongue cow chuck corned beef short loin meatloaf swine tenderloi."
//     },
//     "created_at": 1645982106211
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1646068506211
//   },
//   {
//     "user": {
//       "name": "Cheese Man",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@Cheeseman420"
//     },
//     "content": {
//       "text": "Queso pepper jack paneer. Squirty cheese danish fontina roquefort cheeseburger cheddar melted cheese when the cheese comes out everybody!"
//     },
//     "created_at": 1646068506211
//   },
//   {
//     "user": {
//       "name": "Jack the Pirate",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@JackPirate69"
//     },
//     "content": {
//       "text": "Prow scuttle parrel provost Sail ho shrouds spirits!"
//     },
//     "created_at": 1646068506211
//   }
// ];
