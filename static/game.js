$(document).ready(function () {
    getTemplates();
  });
  
  function getTemplates() {
    $.ajax({
      url: '/get-template',
      type: 'get',
      success: function (result) {
        fillBlanks(result.word);
      },
      error: function (result) {
        alert(result.responseJSON.message);
      },
    });
  }
  
  $(document).ready(function () {
    fillBlanks();
  });
  
  function fillBlanks(randomWord) {
    //Make sure blanks are empty to begin with
    $('#blanks').empty();
  
    //Show blanks uisng <span>
    for (let i = 0; i < randomWord.inputs; i++) {
      let input_html = `<span class="fill_blanks" id="input_${i}">_</span>`;
      $('#blanks').append(input_html);
    }
  
    //Show Hint
    $('#hint').html(randomWord.question);
  
    var gameOver = false;
    //Fill blanks only if the character match is found
    $('.clickable').click(function () {
      var correctGuess = false;
  
      let id = $(this).attr('id');
      var life = $('#life').text();
      var len = life.length;
      console.log(len);
      // console.log(life)
  
      for (var i = 0; i < randomWord.word.length; i++) {
        if (randomWord.word.charAt(i).toLowerCase() == id) {
          if (
            len > 0 &&
            ($('.fill_blanks').eq(i).html() == '_' ||
              $('.fill_blanks').eq(i).html() == id)
          ) {
            $('.fill_blanks').eq(i).html(id);
            correctGuess = true;
  
            //Check if the word guess is complete
            if ($('#blanks').text() === randomWord.word.toLowerCase()) {
                swal({
                    title: '😃',
                    text: 'Good Job!',
                    confirmButtonText:'Play Again'
        
                  }).then(function () {
                    location.reload();
                  });
              correctGuess = true;
              gameOver = true;
            }
          }
        }
      }
  
      if (len > 0 && correctGuess != true && gameOver != true) {
        len = len - 2;
        if (len === 8) {
          $('#life').text('❤️❤️❤️❤️');
        } else if (len === 6) {
          $('#life').text('❤️❤️❤️');
        } else if (len === 4) {
          $('#life').text('❤️❤️');
        } else if (len === 2) {
          $('#life').text('❤️');
        } else if (len === 0) {
          $('#life').text('');
        }
        if (len === 0) {
          swal({
            title: '☹️',
            text: 'Better luck next time!',
            confirmButtonText:'Try Again'

          }).then(function () {
            location.reload();
          });
        }
      }
    });
  }
  