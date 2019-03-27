(function () {
  'use strict';
  let windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

  // Navbar stick event
  $(document).on("scroll", function () {
    if ($(document).scrollTop() > 100) {
      $("#main-header").addClass("shrink");
    } else if (!($(".navbar-collapse").hasClass('show'))) {
      $("#main-header").removeClass("shrink");

    }

  });

  // toggles .stick on medium devices when navbar expanded
  $(".navbar-toggler").click(function () {
    if ($(document).scrollTop() < 100) {
      $("#main-header").toggleClass('shrink');
    }
  })

  //close navbar on mobile when clicked
  $('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });

  //home index animation on scroll
  const areaToGetScrolled = windowWidth > 576 ? 300 : 650;
  $(document).on("scroll", function () {
    if ($(document).scrollTop() > areaToGetScrolled) {
      $("#home").addClass("scrolled");
    } else {
      $("#home").removeClass("scrolled");
    }
  });

  // wow non mobile init
  new WOW({
    boxClass: 'wowNonMobile',
    mobile: false,
  }).init();

  //normal wow init
  new WOW().init();

  // Smooth Scroll
  $(document).ready(function () {
    $("a").on('click', function (event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function () {

          window.location.hash = hash;
        });
      }
    });
  });

  //Making collapse groups work
  const myGroup = $('#collapseGroup');
  myGroup.on('show.bs.collapse', '.collapse', function () {
    myGroup.find('.collapse.show').collapse('hide');
  });

  //Input type file mask
  $('.media-upload__input').change(function (e) {
    const fileName = e.target.files[0].name;
    $(this).closest('.media-upload').find('.media-upload__text').html(`Imagem selecionada: ${ fileName }`);
  });

  //starting bootstrap tooltip
  $('[data-toggle="tooltip"]').tooltip();

  //starting lazy load
  $('img.lazy').lazyload();

  //starting stars rating
  $('.starsrating[readonly="false"]').barrating({
    theme: 'fontawesome-stars'
  })

  //readonly  stars rating
  $('.starsrating[readonly="true"]').barrating({
    theme: 'fontawesome-stars',
    readonly: true
  })

  //show modals with data-show true
  $('.modal[data-show="true"]').modal('show');
  
})();