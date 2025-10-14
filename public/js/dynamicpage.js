var colors = new Array();
colors[0] = "#dc3f36";
colors[1] = "#dc3f36";
colors[2] = "#ab2040";
colors[3] = "#348f10";
colors[4] = "#dc3f36";
colors[5] = "#80306a";
colors[6] = "#1e6c83";
colors[7] = "#dc3f36";

var scrollHandler;

$("body").css("opacity", 0);

$(document).ready(function () {
  $("body").delay(500).animate({ opacity: 1 }, 1000);

  $(".navbar-inner").addClass("hide_filters");
  $(".navbar-inner").addClass("remove_filters");
  $(".navbar-inner").addClass("show_nav");

  init_about();
});
$(function () {
  var newHash = "",
    $mainContent = $("#content"),
    $footer = $("#footer");

  var gallery_init = "false";
  var about_init = "false";
  var contact_init = "false";
  var intro_init = "false";
  $("#preloader").hide();
  $("#preloader").css({ opacity: "0.8" });

  $(".navbar").delegate("a", "click", function () {
    window.location.hash = $(this).attr("href");

    $(".navbar-inner").removeClass("sticky");
    $(window).unbind("scroll", scrollHandler);

    after_intro();
    $(".nav1 a").removeClass("urlactive");
    $('.nav1 a[href="' + window.location.hash.substring(1) + '"]').addClass(
      "urlactive"
    );

    return false;
  });

  $(window).bind("hashchange", function () {
    newHash = window.location.hash.substring(1);

    if (newHash) {
      $mainContent.addClass("up").fadeOut(500, function () {
        $("#preloader").show();

        $mainContent.load(newHash + " #content0", function () {
          $("#preloader").hide();
          $mainContent.fadeIn(500).removeClass("up");
          $footer.fadeIn(500);

          if (newHash == "?id=portfolio") {
            if (gallery_init == "false") {
              init_gallery();
              gallery_init == "true";
            }
          } else {
            $(".navbar-inner").addClass("hide_filters");
            $(".navbar-inner").addClass("remove_filters");
            $(".navbar-inner").addClass("show_nav");
          }
          if (newHash == "?id=omnie") {
            if (about_init == "false") {
              init_about();
              about_init == "true";
            }
          }
          if (newHash == "?id=kontakt") {
            if (contact_init == "false") {
              //init_contact();
              contact_init == "true";
            }
          }
          if (newHash == "?id=start") {
            if (intro_init == "false") {
              init_intro();
              intro_init == "true";
            }
          }

          $(".navbar-inner").css("border-bottom-color", colors[0]);

          jQuery("html, body").animate({ scrollTop: 0 }, "fast");

          /* Hide all elements outside the visible window */

          $("#footer .container").addClass("hideme").css({ opacity: "0" });

          /* Every time the window is scrolled ... */
          $(window).scroll(function () {
            var bottom_of_object = $(".hideme").position().top;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if (bottom_of_window > bottom_of_object + 100) {
              $(".hideme").removeClass("hideme").animate({ opacity: "1" }, 500);
            }
          });
          $(".nav1 a").removeClass("urlactive");
          $('.nav1 a[href="' + newHash + '"]').addClass("urlactive");
        });
      });
      $footer.fadeOut(100);
    }
  });
  $(window).trigger("hashchange");

  $(window).scroll(function () {
    if ($(".navbar").offset().top > 100 && window.innerWidth > 480) {
      $(".navbar-inner").addClass("sticky");
    } else {
      $(".navbar-inner").removeClass("sticky");
    }
  });
});

function after_intro() {
  $("#intro").animate({ height: 0 }, 1000, function () {
    $(this).hide();
    $(".brand").fadeIn(500);
  });
  $("#intro").animate({ opacity: 0 }, 1000);
  $(".navbar-inner").removeClass("sticky");
}
function init_gallery() {
  $(".navbar-inner").removeClass("show_nav");
  setTimeout(function () {
    $(".navbar-inner").removeClass("hide_filters");
    $(".navbar-inner").removeClass("remove_filters");

    var $container = $(".gallery_container"),
      $filters = $(".filters a");

    $container.imagesLoaded(function () {
      $container.isotope({
        itemSelector: ".photo",
        masonry: {
          columnWidth: 72,
        },
      });
    });

    // filter items when filter link is clicked
    $filters.click(function () {
      $filters.removeClass("active");
      $(this).addClass("active");
      var selector = $(this).data("filter");
      $container.isotope({ filter: selector });
      jQuery("html, body").animate({ scrollTop: 0 }, "fast");
      return false;
    });
  }, 200);

  $(".portfolio_gallery")
    .attr("rel", "media-gallery")
    .fancybox({
      helpers: {
        media: {},
        buttons: {},
      },
    });
}
function init_intro() {
  initScrolls();
}

function init_about() {
  initScrolls();

  $(".progressBar").css({ opacity: 0 });
  $(window).scroll(function () {
    /* Check the location of each desired element */
    $(".progressBar").each(function (i) {
      var bottom_of_object = $(this).position().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      /* If the object is completely visible in the window, fade it it */
      if (bottom_of_window > bottom_of_object) {
        if ($(this).data("trigered") != 1) {
          /*console.log($(this).data("trigered"));*/
          progress($(this).find("span").text(), $(this));
          $(this).animate({ opacity: "1" }, 500);
          $(this).data("trigered", 1);
        }
      }
    });
  });
  /*$('#progressBar').waypoint(function() {
		alert('Basic example callback triggered.');
		progress(80, $('#progressBar'));
	});*/
}

function initScrolls() {
  $(".full-page1").css("min-height", $(window).height() - 160);
  $(".full-page").css("min-height", $(window).height() - 60);
  $(".subsectionrow").each(function (i, obj) {
    if (($(".subsection").height() - $(this).height()) / 2 > 50) {
      $(this).css({
        "margin-top": ($(".subsection").height() - $(this).height()) / 2,
      });
    } else {
      $(this).css({ "margin-top": 50 });
    }
  });

  $(".goto1").click(function () {
    $("html, body").animate(
      {
        scrollTop: $(".section2").offset().top - 60,
      },
      2000
    );
  });
  $(".goto2").click(function () {
    $("html, body").animate(
      {
        scrollTop: $(".section3").offset().top - 60,
      },
      2000
    );
  });
  $(".goto3").click(function () {
    $("html, body").animate(
      {
        scrollTop: $(".section4").offset().top - 60,
      },
      2000
    );
  });
}

function progress(percent, $element) {
  var progressBarWidth = (percent * $element.width()) / 100;
  $element.find("div").animate({ width: progressBarWidth }, 2000);
  /*$element.find('div').animate({ width: progressBarWidth }, 2000).html("<h2>" + percent + "%&nbsp;</h2>");*/
}

// By Chris Coyier & tweaked by Mathias Bynens
$(function () {
  // Find all YouTube videos
  var $allVideos = $("iframe[src^='//www.youtube.com']"),
    // The element that is fluid width
    $fluidEl = $(".ytv");

  // Figure out and save aspect ratio for each video
  $allVideos.each(function () {
    $(this)
      .data("aspectRatio", this.height / this.width)

      // and remove the hard coded width/height
      .removeAttr("height")
      .removeAttr("width");
  });

  // When the window is resized
  // (You'll probably want to debounce this)
  $(window)
    .resize(function () {
      var newWidth = $fluidEl.width();

      // Resize all videos according to their own aspect ratio
      $allVideos.each(function () {
        var $el = $(this);
        $el.width(newWidth).height(newWidth * $el.data("aspectRatio"));
      });

      // Kick off one resize to fix all videos on page load
    })
    .resize();
});
