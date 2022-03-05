
/****************************/
/*     AFTER PAGE LOADS     */
/****************************/
$(() => {


  /****************************/
  /*        VARIABLES         */
  /****************************/
  const $window = $(window);
  const $newTweetWrapper = $(".new-tweet-wrapper");
  const $newTweetTextBox = $(".new-tweet-textbox");
  const $newTweetForm = $('.new-tweet-form');
  const $validationError = $('.validation-error');
  const $backToTopButton = $(".back-to-top-wrapper");
  const $tweetsContainer = $('#tweets-container');
  const $createNewTweetButton = $(".nav-bar-right");
  const $errorMessage = $('.error-message');
  const $charCounter = $('.new-tweet-lowerhalf-counter');


  /****************************/
  /*        FUNCTIONS         */
  /****************************/
  const escape = function(textString) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(textString));
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

  const toggleBackToTopButton = function() {
    $window.scrollTop() > 400 ? $backToTopButton.show() : $backToTopButton.hide();
  };

  const renderTweets = function(tweetsDatabase) {
    for (const tweet of tweetsDatabase) {
      $tweetsContainer.prepend(createTweetElement(tweet));
    }
  };

  const resetNewTweetForm = function(textArea) {
    textArea.text.value = "";
    $charCounter.text("140");
    $newTweetTextBox.focus();
  };

  const showValidationError = function(errorMsg) {
    $errorMessage.text(errorMsg);
    $validationError.slideDown(400);
    $newTweetTextBox.focus();
  };

  $newTweetForm.submit(function(event) {
    event.preventDefault();

    // Slide-up error message before attempting to submit
    $validationError.slideUp(400, () => {

      // Catch if new tweet textarea is empty
      if (!this.text.value) {
        showValidationError("Error: No text has been input!");
        return;
      }

      // Catch if new tweet textarea contains too many characters
      if (this.text.value.length > 140) {
        showValidationError("Error: You have entered too many characters!");
        return;
      }

      // Process AJAX POST request
      const serializedText = $(this).serialize();
      $.ajax({url: '/tweets', method: "POST", data: serializedText})
        .then(() => {
          resetNewTweetForm(this);
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
        $newTweetTextBox.focus();
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  };


  /****************************/
  /*      EVENT LISTENERS     */
  /****************************/
  $window.scroll(function() {
    toggleBackToTopButton();
  });

  $backToTopButton.on('click', function() {
    $window.scrollTop("top");
    $newTweetTextBox.focus();
  });

  // Enable enter key to submit new tweets
  // (Also allows for shift-enter to create a new line)
  $newTweetTextBox.keypress(function(e) {
    const enterKey = 13;
    if (e.which === enterKey && !e.shiftKey) {
      e.preventDefault();
      $newTweetForm.submit();
    }
  });

  $createNewTweetButton.on("click", function() {
    //If not a top of page, go to top
    if ($window.scrollTop() !== 0) {
      $window.scrollTop("top");
      $validationError.slideUp(400);

      // Slide down the new tweet dialog and set focus
      $newTweetWrapper.slideDown("slow").promise().done(() => {
        $newTweetTextBox.focus();
        $validationError.slideUp(400);
      });
      
    // If already at top, toggle new tweet section
    } else {
      $validationError.slideUp(400);
      $newTweetWrapper.slideToggle("slow").promise().done(() => {
        $newTweetTextBox.focus();
      });
    }
  });


  /****************************/
  /*        INITIAL LOAD      */
  /****************************/
  $validationError.hide();
  loadTweets();
});
