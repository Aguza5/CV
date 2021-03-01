//start change lang
var langs = ['en', 'es'];
var current_lang_index = 1;
var current_lang = langs[current_lang_index];

var request = new XMLHttpRequest();
request.responseType = 'json';
request.open("GET", "./langs/es.json", true);
request.onload  = function() {
   translate(request);
};
request.send(null)

window.change_lang = function() {
  current_lang_index = ++current_lang_index % langs.length;
  current_lang = langs[current_lang_index];
  request.open("GET", "./langs/" + current_lang + ".json", true)
  request.onload  = function() {
    translate(request);
 };
 request.send(null)
}

function translate(request) {
  $("[data-translate]").each(function(){
    var key = $(this).data('translate');
    $(this).html(request.response[key] || "N/A");

    document.getElementById('button_linkedin').setAttribute('data-original-title', request.response["button_linkedin_title"]);
    document.getElementById('button_github').setAttribute('data-original-title', request.response["button_github_title"]);
    document.getElementById('button_gitlab').setAttribute('data-original-title', request.response["button_gitlab_title"]);
  });
}

$("#change_lang").click(function(e){
  e.preventDefault();
  change_lang();
});

// end change lang

$(document).ready(function() {
  AOS.init( {
    // uncomment below for on-scroll animations to played only once
    // once: true  
  }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    if (this.hash != "") {target = target.length ? target : $('[name=' + this.hash.slice(1) + ']'); }
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});
