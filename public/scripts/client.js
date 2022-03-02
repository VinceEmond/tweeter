/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {




  const tweetsDb = [
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
    }
  ];

  console.log("Hello from the client.js File!");
  // console.log("tweetsDb.user", tweetsDb.user);

  const createTweetElement = function(tweetObj) {
    const {name, avatars, handle} = tweetObj.user;
    const {text} = tweetObj.content;
    const timestampMs = tweetObj["created_at"];
    // const timeInDays = Math.round((Date.now() - timestampMs) / 86400000);
    const timeInDays = timeago.format(timestampMs);


    const $tweet = $(`
    <article class="tweet">
  
          <header>
            <div class="tweet-header-left">
              <!-- <img class="tweet-avatar" src="../public/images/profile-hex.png">  -->
              <i class="fa-regular fa-face-grin-tongue-wink"></i>
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
              <p>${timeInDays}</p>
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

  $('#tweets-container').prepend(createTweetElement(tweetsDb[0]));

});