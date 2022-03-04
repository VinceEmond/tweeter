
/******************/
/* AFTER PAGE LOADS
/*****************/
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
  
          <div class="tweet-text-body">
            <p>${escape(text)}</p>
          </div>
  
          <footer>
            <div class="tweet-footer-left">
              <p>${escape(timeSinceTweet)}</p>
            </div>
            <div class="tweet-footer-right">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>       
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
  
        </article>
        `);

    return $tweet;
  };



  $(window).scroll(function() {
    scrollFunction();
  });

  $(".back-to-top-circle").on('click', function() {
    $(window).scrollTop("top");
    $(".new-tweet-textbox").focus();
  });

  const scrollFunction = function() {
    if ($(window).scrollTop() > 400) {
      $(".back-to-top-wrapper").show();
    } else {
      $(".back-to-top-wrapper").hide();
    }
  };


  const renderTweets = function(tweetsDatabase) {
    for (const tweet of tweetsDatabase) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };


  $(".nav-bar-right").on("click", function() {

    //If not a top of page, go to top
    if ($(window).scrollTop() !== 0) {
      $(window).scrollTop("top");
      $('.validation-error').slideUp(400);


      // Slide down the new tweet dialog and set focus
      $(".new-tweet").slideDown("slow").promise().done(() => {
        $(".new-tweet-textbox").focus();
        $('.validation-error').slideUp(400);
      });
      
    // If already at top, toggle new tweet section
    } else {
      $('.validation-error').slideUp(400);
      $(".new-tweet").slideToggle("slow").promise().done(() => {
        $(".new-tweet-textbox").focus();
      });
    }


  });
 

  // Setup textbox to submit on enter
  // Allows for shift-enter to create a new line
  $(".new-tweet-textbox").keypress(function(e) {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      $(this).closest("form").submit();
    }
  });

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
        $(".new-tweet-textbox").focus();
        return;
      }

      // Catch if new tweet textarea contains too many characters
      if (this.text.value.length > 140) {
        console.log("Error: You have entered too many characters!");
        // alert("Error: You have entered too many characters!");
        $('.error-message').text("Error: You have entered too many characters!");
        $('.validation-error').slideDown(400);
        $(".new-tweet-textbox").focus();
        return;
      }


      // Process AJAX POST request
      const serializedText = $(this).serialize();

      $.ajax({url: '/tweets', method: "POST", data: serializedText})
        .then(() => {
          // console.log("Tweet AJAX post: sucess!");
          this.text.value = "";
          $('.new-tweet-lowerhalf-counter').text("140");
          $('.new-tweet-textbox').removeClass('addRed');
          $(".new-tweet-textbox").focus();
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
        $(".new-tweet-textbox").focus();
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  };

  $('.validation-error').hide();
  loadTweets();

});
