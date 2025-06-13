/*
	Drift by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$banner = $('#banner'),
		$header = $('#header');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Smooth scroll for anchor links
		$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
				location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					event.preventDefault();
					$('html, body').animate({
						scrollTop: target.offset().top - $header.outerHeight()
					}, 1000);
				}
			}
		});

	// Header styling on scroll
		$window.on('scroll', function() {
			if ($window.scrollTop() > $banner.outerHeight()) {
				$header.removeClass('alt');
			} else {
				$header.addClass('alt');
			}
		});

	// Simple dropdown menu
		$('#nav > ul > li').hover(
			function() { $(this).find('ul').stop().slideDown(200); },
			function() { $(this).find('ul').stop().slideUp(200); }
		);

	// Nav Panel
		var $navButton = $('<div id="navButton"><a href="#navPanel" class="toggle"></a></div>').appendTo($body);
		var $navPanel = $('<div id="navPanel"><nav>' + $('#nav').navList() + '</nav></div>').appendTo($body);

		$navButton.on('click', function(e) {
			e.preventDefault();
			$navPanel.toggleClass('visible');
		});

	// Simple image slider
		var $sliders = $('.slider');
		if ($sliders.length > 0) {
			var currentSlide = 0;
			var slideCount = $sliders.find('.slide').length;
			
			function showSlide(index) {
				$sliders.find('.slide').css('opacity', 0);
				$sliders.find('.slide').eq(index).css('opacity', 1);
			}

			$sliders.find('.nav-previous').on('click', function() {
				currentSlide = (currentSlide - 1 + slideCount) % slideCount;
				showSlide(currentSlide);
			});

			$sliders.find('.nav-next').on('click', function() {
				currentSlide = (currentSlide + 1) % slideCount;
				showSlide(currentSlide);
			});

			// Auto-advance slides every 5 seconds
			setInterval(function() {
				currentSlide = (currentSlide + 1) % slideCount;
				showSlide(currentSlide);
			}, 5000);

			// Show first slide
			showSlide(0);
		}

	// Order Info Popup
		var $popup = $('#orderInfoPopup'),
			$popupIcon = $('#orderInfoIcon'),
			$closePopup = $('.close-popup');

		// Show popup on page load
		$window.on('load', function() {
			window.setTimeout(function() {
				$popup.fadeIn(300);
			}, 500);
		});

		// Close popup when clicking the close button
		$closePopup.on('click', function() {
			$popup.fadeOut(300);
		});

		// Show popup when clicking the info icon
		$popupIcon.on('click', function() {
			$popup.fadeIn(300);
		});

		// Close popup when clicking outside
		$(document).on('click', function(e) {
			if ($(e.target).closest('.popup-content, .order-info-icon').length === 0) {
				$popup.fadeOut(300);
			}
		});

})(jQuery);