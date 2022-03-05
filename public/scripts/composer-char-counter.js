/****************************/
/*     AFTER HTML LOADS     */
/****************************/

$(() => {

  /* CHARACTER COUNTER LISTENER */
  const $newTweetTextbox = $('.new-tweet-textbox');
  $newTweetTextbox.on('input', function() {
    let charsRemaining = 140 - this.value.length;
    const $counter = $(this).parents().find('.new-tweet-lowerhalf-counter');

    /* Change text to red when over limit */
    charsRemaining < 0 ? $counter.addClass('textColorRed') : $counter.removeClass('textColorRed');
    $counter.text(charsRemaining);
  });
});
