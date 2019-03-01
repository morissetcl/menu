// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require jquery_ujs
//= require activestorage
//= require jquery-ui/widgets/autocomplete
//= require autocomplete-rails
//= require iziToast

$(document).ready(function(){
  M.updateTextFields();
  $('.collapsible').collapsible();
  $('.tabs').tabs();
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if ($(window).width() < 920) {
      $(".map-wrapper").addClass("fixed");
      $(".map-wrapper").css('margin-top',90);
    }
    else {
      if (scroll >= 21) {
        $(".map-wrapper").addClass("fixed");
      } else {
        $(".map-wrapper").removeClass("fixed");
      }
    }
  });
});
