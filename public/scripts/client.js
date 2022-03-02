/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// WAIT TILL AFTER PAGE LOAD
$(() => {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        // "text": "If I have seen further it is by standing on the shoulders of giants"
        "text": "Bacon ipsum dolor amet short ribs landjaeger drumstick ground round t-bone tongue cow chuck corned beef short loin meatloaf swine tenderloi."
      },
      "created_at": 1645982106211
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1646068506211
    },
    {
      "user": {
        "name": "Cheese Man",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@Cheeseman420"
      },
      "content": {
        "text": "Queso pepper jack paneer. Squirty cheese danish fontina roquefort cheeseburger cheddar melted cheese when the cheese comes out everybody!"
      },
      "created_at": 1646068506211
    },
    {
      "user": {
        "name": "Jack the Pirate",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@JackPirate69"
      },
      "content": {
        "text": "Prow scuttle parrel provost Sail ho shrouds spirits!"
      },
      "created_at": 1646068506211
    }
  ];



  const createTweetElement = function(tweetObj) {
    const {name, avatars, handle} = tweetObj.user;
    const {text} = tweetObj.content;
    const timestampMs = tweetObj["created_at"];
    const timeSinceTweet = timeago.format(timestampMs);

    const $tweet = $(`
    <article class="tweet">
  
          <header>
            <div class="tweet-header-left">
              <img class="tweet-avatar" src="https://www.seekpng.com/png/full/402-4022635_avatar-generic-person-icon.png"> 
              <!--   <img class="tweet-avatar" src="../public/images/avatar-male.png"> -->
              <!--  <i class="fa-regular fa-face-grin-tongue-wink"></i> -->
              <p>${name}</p>
            </div>
            <div class="tweet-header-right">
              <p >${handle}</p>
            </div>
          </header>
  
          <div class="middle">
            <p>${text}</p>
          </div>
  
          <footer>
            <div class="tweet-footer-left">
              <p>${timeSinceTweet}</p>
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
    }
  };


  $('.new-tweet-form').submit(function(event) {
    event.preventDefault();
    const serializedText = $(this).serialize();

    $.ajax({
      url: '/tweets',
      method: "POST",
      data: serializedText
    })
      .then(() => {
        // console.log("Post sucess!");
      })
      .catch((error) => {
        console.log("Error:", error);
      });

  });

  renderTweets(data);

});