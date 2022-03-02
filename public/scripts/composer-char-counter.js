

$(() => {

  const $textArea = $('.new-tweet-textbox');
  
  let charCount = 0;

  $textArea.on('input', function() {
    charCount = 140 - this.value.length;
    
    

    // ********************************
    // THREE WAYS TO DO THE SAME THING
    // ********************************
    //$('.new-tweet-lowerhalf-counter').text(charCount);
    // const $counter = $(this).parent().siblings().first().children().last();
    const $counter = $(this).parents().find('.new-tweet-lowerhalf-counter');

    charCount <= 0 ? $counter.addClass('addRed') : $counter.removeClass('addRed');
    $counter.text(charCount);
  });

});