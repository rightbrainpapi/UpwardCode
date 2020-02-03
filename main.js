/**
	Only class, handles the image overlay and banner scrolling
	@class js
**/

/**
	Executed when the page is ready
	@method document.ready
**/
$(document).ready(function() {
	addPopupListeners();
	addBannerListener();
});


/**
	Adds listeners to image anchors for a nice popup, and a listener to close it again
	@method addPopupListeners
**/

function addPopupListeners() {
	// Select all the links leading to an image
	var imageLinks = $('a[href$=".png"], a[href$=".jpg"], a[href$=".gif"], a[href$=".bmp"]');
	// Check if they contain an image
	if (imageLinks.children('img').length) {
		// Give them a proper title
		imageLinks.children('img').each(function() {
			$(this).attr('title', 'Click to enlarge');
		});
		// Give them a clicklistener to open to overlay
		imageLinks.click(function(e) {
			e.preventDefault();
      // Dirty codepen hack, replace the long url with $(this).context if you plan on using this anywhere else
			$('#overlay-wrapper img').attr('src', 'https://raw.github.com/Snacksnack/snacksnack.github.com/master/template/' + $(this).context.pathname.split('/pen/')[1]);
			$('#overlay-wrapper').fadeIn(300);
			$('#overlay-wrapper img').attr('title', 'Click anywhere to close');
			$('#overlay-wrapper img').css({
				'margin-left': ($(window)[0].innerWidth - $('#overlay-wrapper img').width()) / 2,
				'margin-top': ($(window)[0].innerHeight - $('#overlay-wrapper img').height()) / 2
			})
		});
	}

	// Add listener to overlay to close it
	$('#overlay-wrapper').click(function() {
		$(this).fadeOut(300);
	});
}

/**
	Adds a listener to the banner for a nice scrolling effect
	@method addBannerListener
**/
function addBannerListener() {
	$('full-body').scroll(function() {
		// Scroll the banner
		var diff = ($(this)[0].innerHeight / $('#banner-text').height()) * 2;
		scrollPos = $(this).scrollTop();
		var opacity = 1 - (scrollPos/($('#banner-text').height() * (diff / 8)));
		$('#banner').css({
			'background-position': '50% ' + (-scrollPos / diff) + 'px'
		});
		$('#banner-text').css({
			'margin-top': (scrollPos / diff) + 'px',
			'opacity': opacity
        });
        
		// Hide the banner if it's opacity <= 0
		if (opacity <= 0) {
			$('#banner-text').hide();
		} else {
			$('#banner-text').show();
		}
    });
    

	// Make the banner redirect to my github
	$('#banner-text').click(function() {
		location.href = '#';
    })
    
	// Make the more button scroll down
	$('#banner-button').click(function() {
		$('html,body').animate({
			scrollTop: $('#full-body')[0].innerHeight
		}, 1000);
    });
    
}







////////////////////////////////////////////////////
//////////////////// Slide Show ////////////////////
////////////////////////////////////////////////////


var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    // .img-anchor:hover:after
    var slidesCon = document.getElementById("slideCon");
    slidesCon.classList.remove("img-anchor");
        // slides[i].classList.remove("img-anchor");
      slides[i].style.display = "none";  
      setTimeout(mySlideTimer, 5000);
      
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

function mySlideTimer() {
    var slidesCon = document.getElementById("slideCon");
    slidesCon.classList.add("img-anchor");
    console.log("We are working")
  }