

/******************/
/* AFTER PAGE LOADS
/*****************/
$(() => {
  const $textArea = $('.new-tweet-textbox');
  
  $textArea.on('input', function() {
    let charCount = 0;
    charCount = 140 - this.value.length;
    const $counter = $(this).parents().find('.new-tweet-lowerhalf-counter');

    charCount < 0 ? $counter.addClass('addRed') : $counter.removeClass('addRed');
    $counter.text(charCount);
  });

});
