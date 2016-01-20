'use strict';
angular.module('portfolio', [])
  .constant('ENV', {
    API_URL: 'https://mandrillapp.com/api/1.0/messages/send.json',
    APIKEY: 'Zt9VJPNzZOrqVhOrUH3-Uw',
    MYEMAIL: 'benhalverson@me.com'

  })
  // .config(function($stateProvider, $urlRouteProvider) {
  //   $urlRouteProvider.otherwise('/');
  //
  //   $stateProvider
  //     .state('email',
  //     { url: '/email',
  //       controller: 'emailCtrl',
  //       templateUrl: 'templates/home.html'
  //     })
  //     .state('/portfolio',
  //     { url: '/portfolio',
  //       templateUrl: 'templates/portfolio.html'});
  // });

var mr_firstSectionHeight;
// var mr_nav,
		// mr_navOuterHeight,
var mr_navScrolled = false;
		// mr_navFixed = false,
		// mr_outOfSight = false,
var mr_floatingProjectSections;
var mr_scrollTop = 0;
$(document).ready(function() {
		"use strict";

		// Offscreen Nav

		if($('.offscreen-toggle').length){
			$('body').addClass('has-offscreen-nav');
		}
		else{
				$('body').removeClass('has-offscreen-nav');
		}

		$('.offscreen-toggle').click(function(){
			$('.main-container').toggleClass('reveal-nav');
      $('nav').toggleClass('reveal-nav');
			$('.offscreen-container').toggleClass('reveal-nav');
		});

		$('.main-container').click(function(){
			if($(this).hasClass('reveal-nav')){
				$(this).removeClass('reveal-nav');
				$('.offscreen-container').removeClass('reveal-nav');
				$('nav').removeClass('reveal-nav');
			}
		});

		$('.offscreen-container a').click(function(){
			$('.offscreen-container').removeClass('reveal-nav');
			$('.main-container').removeClass('reveal-nav');
			$('nav').removeClass('reveal-nav');
		});

		// Populate filters

		$('.projects').each(function() {

				var filters = "";

				$(this).find('.project').each(function() {

						var filterTags = $(this).attr('data-filter').split(',');

						filterTags.forEach(function(tagName) {
								if (filters.indexOf(tagName) == -1) {
										filters += '<li data-filter="' + tagName + '">' + capitaliseFirstLetter(tagName) + '</li>';
								}
						});
						$(this).closest('.projects')
								.find('ul.filters').empty().append('<li data-filter="all" class="active">All</li>').append(filters);
				});
		});

		$('.filters li').click(function() {
				var filter = $(this).attr('data-filter');
				$(this).closest('.filters').find('li').removeClass('active');
				$(this).addClass('active');

				$(this).closest('.projects').find('.project').each(function() {
						var filters = $(this).data('filter');

						if (filters.indexOf(filter) == -1) {
								$(this).addClass('inactive');
						} else {
								$(this).removeClass('inactive');
						}
				});

				if (filter == 'all') {
						$(this).closest('.projects').find('.project').removeClass('inactive');
				}
		});


		// Append .background-image-holder <img>'s as CSS backgrounds

		$('.background-image-holder').each(function() {
				var imgSrc = $(this).children('img').attr('src');
				$(this).css('background', 'url("' + imgSrc + '")');
				$(this).children('img').hide();
				$(this).css('background-position', 'initial');
		});

		// Fade in background images

		setTimeout(function() {
				$('.background-image-holder').each(function() {
						$(this).addClass('fadeIn');
				});
		}, 200);


		// Autoshow modals

	$('.foundry_modal[data-time-delay]').each(function(){
		var modal = $(this);
		var delay = modal.attr('data-time-delay');
		modal.prepend($('<i class="ti-close close-modal">'));
			if(typeof modal.attr('data-cookie') != "undefined"){
					if(!mr_cookies.hasItem(modal.attr('data-cookie'))){
								setTimeout(function(){
							modal.addClass('reveal-modal');
							$('.modal-screen').addClass('reveal-modal');
						},delay);
						}
				}else{
						setTimeout(function(){
								modal.addClass('reveal-modal');
								$('.modal-screen').addClass('reveal-modal');
						},delay);
				}
	});

		// Autoclose modals

		$('.foundry_modal[data-hide-after]').each(function(){
				var modal = $(this);
				var delay = modal.attr('data-hide-after');
				if(typeof modal.attr('data-cookie') != "undefined"){
						if(!mr_cookies.hasItem(modal.attr('data-cookie'))){
								setTimeout(function(){
								if(!modal.hasClass('modal-acknowledged')){
										modal.removeClass('reveal-modal');
										$('.modal-screen').removeClass('reveal-modal');
								}
								},delay);
						}
				}else{
						setTimeout(function(){
								if(!modal.hasClass('modal-acknowledged')){
										modal.removeClass('reveal-modal');
										$('.modal-screen').removeClass('reveal-modal');
								}
						},delay);
				}
		});

		jQuery('.close-modal:not(.modal-strip .close-modal)').unbind('click').click(function(){
			var modal = jQuery(this).closest('.foundry_modal');
				modal.toggleClass('reveal-modal');
				if(typeof modal.attr('data-cookie') !== "undefined"){
						mr_cookies.setItem(modal.attr('data-cookie'), "true", Infinity);
				}
			if(modal.find('iframe').length){
						modal.find('iframe').attr('src', '');
				}
				jQuery('.modal-screen').removeClass('reveal-modal');
		});

		jQuery('.modal-screen').unbind('click').click(function(){
				if(jQuery('.foundry_modal.reveal-modal').find('iframe').length){
						jQuery('.foundry_modal.reveal-modal').find('iframe').attr('src', '');
				}
			jQuery('.foundry_modal.reveal-modal').toggleClass('reveal-modal');
			jQuery(this).toggleClass('reveal-modal');
		});

		jQuery(document).keyup(function(e) {
      if (e.keyCode == 27) { // escape key maps to keycode `27`
						if(jQuery('.foundry_modal').find('iframe').length){
								jQuery('.foundry_modal').find('iframe').attr('src', '');
						}
			jQuery('.foundry_modal').removeClass('reveal-modal');
			jQuery('.modal-screen').removeClass('reveal-modal');
		}
	});

		// Modal Strips

		jQuery('.modal-strip').each(function(){
			if(!jQuery(this).find('.close-modal').length){
				jQuery(this).append(jQuery('<i class="ti-close close-modal">'));
			}
			var modal = jQuery(this);

				if(typeof modal.attr('data-cookie') != "undefined"){

						if(!mr_cookies.hasItem(modal.attr('data-cookie'))){
							setTimeout(function(){
								modal.addClass('reveal-modal');
							},1000);
						}
				}else{
						setTimeout(function(){
										modal.addClass('reveal-modal');
						},1000);
				}
		});

		jQuery('.modal-strip .close-modal').click(function(){
				var modal = jQuery(this).closest('.modal-strip');
				if(typeof modal.attr('data-cookie') != "undefined"){
						mr_cookies.setItem(modal.attr('data-cookie'), "true", Infinity);
				}
			jQuery(this).closest('.modal-strip').removeClass('reveal-modal');
			return false;
		});


		// Video Modals

		jQuery('.close-iframe').click(function() {
				jQuery(this).closest('.modal-video').removeClass('reveal-modal');
				jQuery(this).siblings('iframe').attr('src', '');
				jQuery(this).siblings('video').get(0).pause();
		});

		// Checkboxes

		$('.checkbox-option').on("click",function() {
				$(this).toggleClass('checked');
				var checkbox = $(this).find('input');
				if (checkbox.prop('checked') === false) {
						checkbox.prop('checked', true);
				} else {
						checkbox.prop('checked', false);
				}
		});

		// Radio Buttons

		$('.radio-option').click(function() {

				var checked = $(this).hasClass('checked'); // Get the current status of the radio

				var name = $(this).find('input').attr('name'); // Get the name of the input clicked

				if (!checked) {

						$('input[name="'+name+'"]').parent().removeClass('checked');

						$(this).addClass('checked');

						$(this).find('input').prop('checked', true);

				}

		});


		// Accordions

		// $('.accordion li').click(function() {
		//		 if ($(this).closest('.accordion').hasClass('one-open')) {
		//				 $(this).closest('.accordion').find('li').removeClass('active');
		//				 $(this).addClass('active');
		//		 } else {
		//				 $(this).toggleClass('active');
		//		 }
		//		 if(typeof window.mr_parallax !== "undefined"){
		//				 setTimeout(mr_parallax.windowLoad, 500);
		//		 }
		// });

		// Tabbed Content

		$('.tabbed-content').each(function() {
				$(this).append('<ul class="content"></ul>');
		});

		$('.tabs li').each(function() {
				var originalTab = $(this),
						activeClass = "";
				if (originalTab.is('.tabs>li:first-child')) {
						activeClass = ' class="active"';
				}
				var tabContent = originalTab.find('.tab-content').detach().wrap('<li' + activeClass + '></li>').parent();
				originalTab.closest('.tabbed-content').find('.content').append(tabContent);
		});

		$('.tabs li').click(function() {
				$(this).closest('.tabs').find('li').removeClass('active');
				$(this).addClass('active');
				var liIndex = $(this).index() + 1;
				$(this).closest('.tabbed-content').find('.content>li').removeClass('active');
				$(this).closest('.tabbed-content').find('.content>li:nth-of-type(' + liIndex + ')').addClass('active');
		});

		// Local Videos

		$('section').closest('body').find('.local-video-container .play-button').click(function() {
				$(this).siblings('.background-image-holder').removeClass('fadeIn');
				$(this).siblings('.background-image-holder').css('z-index', -1);
				$(this).css('opacity', 0);
				$(this).siblings('video').get(0).play();
		});


		// Interact with Map once the user has clicked (to prevent scrolling the page = zooming the map

		$('.map-holder').click(function() {
				$(this).addClass('interact');
		});

		if($('.map-holder').length){
			$(window).scroll(function() {
			if ($('.map-holder.interact').length) {
				$('.map-holder.interact').removeClass('interact');
			}
		});
		}

		// Countdown Timers

		if ($('.countdown').length) {
				$('.countdown').each(function() {
						var date = $(this).attr('data-date');
						$(this).countdown(date, function(event) {
								$(this).text(
										event.strftime('%D days %H:%M:%S')
								);
						});
				});
		}



		// Disable parallax on mobile

		if ((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
				$('section').removeClass('parallax');
		}



});

$(window).load(function() {
		"use strict";

		// Initialize Masonry

		if ($('.masonry').length) {
				var container = document.querySelector('.masonry');
				var msnry = new Masonry(container, {
						itemSelector: '.masonry-item'
				});

				msnry.on('layoutComplete', function() {

						mr_firstSectionHeight = $('.main-container section:nth-of-type(1)').outerHeight(true);

						// Fix floating project filters to bottom of projects container

						if ($('.filters.floating').length) {
								setupFloatingProjectFilters();
								updateFloatingFilters();
								window.addEventListener("scroll", updateFloatingFilters, false);
						}

						$('.masonry').addClass('fadeIn');
						$('.masonry-loader').addClass('fadeOut');
						if ($('.masonryFlyIn').length) {
								masonryFlyIn();
						}
				});

				msnry.layout();
		}

		// Initialize twitter feed

		var setUpTweets = setInterval(function() {
				if ($('.tweets-slider').find('li.flex-active-slide').length) {
						clearInterval(setUpTweets);
						return;
				} else {
						if ($('.tweets-slider').length) {
								$('.tweets-slider').flexslider({
										directionNav: false,
										controlNav: false
								});
						}
				}
		}, 500);

		mr_firstSectionHeight = $('.main-container section:nth-of-type(1)').outerHeight(true);


});

// function updateNav() {
//
//		 var scrollY = mr_scrollTop;
//
//		 if (scrollY <= 0) {
//				 if (mr_navFixed) {
//						 mr_navFixed = false;
//						 mr_nav.removeClass('fixed');
//				 }
//				 if (mr_outOfSight) {
//						 mr_outOfSight = false;
//						 mr_nav.removeClass('outOfSight');
//				 }
//				 if (mr_navScrolled) {
//						 mr_navScrolled = false;
//						 mr_nav.removeClass('scrolled');
//				 }
//				 return;
//		 }
//
//		 if (scrollY > mr_firstSectionHeight) {
//				 if (!mr_navScrolled) {
//						 mr_nav.addClass('scrolled');
//						 mr_navScrolled = true;
//						 return;
//				 }
//		 } else {
//				 if (scrollY > mr_navOuterHeight) {
//						 if (!mr_navFixed) {
//								 mr_nav.addClass('fixed');
//								 mr_navFixed = true;
//						 }
//
//						 if (scrollY > mr_navOuterHeight * 2) {
//								 if (!mr_outOfSight) {
//										 mr_nav.addClass('outOfSight');
//										 mr_outOfSight = true;
//								 }
//						 } else {
//								 if (mr_outOfSight) {
//										 mr_outOfSight = false;
//										 mr_nav.removeClass('outOfSight');
//								 }
//						 }
//				 } else {
//						 if (mr_navFixed) {
//								 mr_navFixed = false;
//								 mr_nav.removeClass('fixed');
//						 }
//						 if (mr_outOfSight) {
//								 mr_outOfSight = false;
//								 mr_nav.removeClass('outOfSight');
//						 }
//				 }
//
//				 if (mr_navScrolled) {
//						 mr_navScrolled = false;
//						 mr_nav.removeClass('scrolled');
//				 }
//
//		 }
// }

function capitaliseFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
}

function masonryFlyIn() {
		var $items = $('.masonryFlyIn .masonry-item');
		var time = 0;

		$items.each(function() {
				var item = $(this);
				setTimeout(function() {
						item.addClass('fadeIn');
				}, time);
				time += 170;
		});
}

function setupFloatingProjectFilters() {
		mr_floatingProjectSections = [];
		$('.filters.floating').closest('section').each(function() {
				var section = $(this);

				mr_floatingProjectSections.push({
						section: section.get(0),
						outerHeight: section.outerHeight(),
						elemTop: section.offset().top,
						elemBottom: section.offset().top + section.outerHeight(),
						filters: section.find('.filters.floating'),
						filersHeight: section.find('.filters.floating').outerHeight(true)
				});
		});
}

function updateFloatingFilters() {
		var l = mr_floatingProjectSections.length;
		while (l--) {
				var section = mr_floatingProjectSections[l];

				if ((section.elemTop < mr_scrollTop) && typeof window.mr_variant == "undefined" ) {
						section.filters.css({
								position: 'fixed',
								top: '16px',
								bottom: 'auto'
						});
						if (mr_navScrolled) {
								section.filters.css({
										transform: 'translate3d(-50%,48px,0)'
								});
						}
						if (mr_scrollTop > (section.elemBottom - 70)) {
								section.filters.css({
										position: 'absolute',
										bottom: '16px',
										top: 'auto'
								});
								section.filters.css({
										transform: 'translate3d(-50%,0,0)'
								});
						}
				} else {
						section.filters.css({
								position: 'absolute',
								transform: 'translate3d(-50%,0,0)'
						});
				}
		}
}

// window.initializeMaps = function(){
// 		if(typeof google !== "undefined"){
// 				if(typeof google.maps !== "undefined"){
// 						$('.map-canvas[data-maps-api-key]').each(function(){
// 										var mapInstance	 = this,
// 												mapJSON			 = typeof $(this).attr('data-map-style') !== "undefined" ? $(this).attr('data-map-style'): false,
// 												mapStyle			= JSON.parse(mapJSON) || [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],
// 												zoomLevel		 = (typeof $(this).attr('data-map-zoom') !== "undefined" && $(this).attr('data-map-zoom') !== "") ? $(this).attr('data-map-zoom') * 1: 17,
// 												latlong			 = typeof $(this).attr('data-latlong') != "undefined" ? $(this).attr('data-latlong') : false,
// 												latitude			= latlong ? 1 *latlong.substr(0, latlong.indexOf(',')) : false,
// 												longitude		 = latlong ? 1 * latlong.substr(latlong.indexOf(",") + 1) : false,
// 												geocoder			= new google.maps.Geocoder(),
// 												address			 = typeof $(this).attr('data-address') !== "undefined" ? $(this).attr('data-address').split(';'): false,
// 												markerTitle	 = "We Are Here",
// 												isDraggable = $(document).width() > 766 ? true : false,
// 												map, marker, markerImage,
// 												mapOptions = {
// 														draggable: isDraggable,
// 														scrollwheel: false,
// 														zoom: zoomLevel,
// 														disableDefaultUI: true,
// 														styles: mapStyle
// 												};
//
// 										if($(this).attr('data-marker-title') != undefined && $(this).attr('data-marker-title') != "" )
// 										{
// 												markerTitle = $(this).attr('data-marker-title');
// 										}
//
// 										if(address != undefined && address[0] != ""){
// 														geocoder.geocode( { 'address': address[0].replace('[nomarker]','')}, function(results, status) {
// 																if (status == google.maps.GeocoderStatus.OK) {
// 																var map = new google.maps.Map(mapInstance, mapOptions);
// 																map.setCenter(results[0].geometry.location);
//
// 																address.forEach(function(address){
// 																		var markerGeoCoder;
//
// 																		markerImage = {url: window.mr_variant == undefined ? 'img/mapmarker.png' : '../img/mapmarker.png', size: new google.maps.Size(50,50), scaledSize: new google.maps.Size(50,50)};
// 																		if(/(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)/.test(address) ){
// 																				var latlong = address.split(','),
// 																				marker = new google.maps.Marker({
// 																												position: { lat: 1*latlong[0], lng: 1*latlong[1] },
// 																												map: map,
// 																												icon: markerImage,
// 																												title: markerTitle,
// 																												optimised: false
// 																										});
// 																		}
// 																		else if(address.indexOf('[nomarker]') < 0){
// 																				markerGeoCoder = new google.maps.Geocoder();
// 																				markerGeoCoder.geocode( { 'address': address.replace('[nomarker]','')}, function(results, status) {
// 																						if (status == google.maps.GeocoderStatus.OK) {
// 																								marker = new google.maps.Marker({
// 																										map: map,
// 																										icon: markerImage,
// 																										title: markerTitle,
// 																										position: results[0].geometry.location,
// 																										optimised: false
// 																								});
// 																						}
// 																				});
// 																		}
//
// 																});
// 														} else {
// 																console.log('There was a problem geocoding the address.');
// 														}
// 												});
// 										}
// 										else if(latitude != undefined && latitude != "" && latitude != false && longitude != undefined && longitude != "" && longitude != false ){
// 												mapOptions.center	 = { lat: latitude, lng: longitude};
// 												map = new google.maps.Map(mapInstance, mapOptions);
// 												marker							= new google.maps.Marker({
// 																										position: { lat: latitude, lng: longitude },
// 																										map: map,
// 																										icon: markerImage,
// 																										title: markerTitle
// 																								});
//
// 										}
//
// 								});
// 				}
// 		}
// }
// initializeMaps();

// End of Maps




// Prepare Signup Form - It is used to retrieve form details from an iframe Mail Chimp or Campaign Monitor form.

// function prepareSignup(iFrame){
// 		var form	 = jQuery('<form />'),
// 				action = iFrame.contents().find('form').attr('action');
//
// 		// Alter action for a Mail Chimp-compatible ajax request url.
// 		if(/list-manage\.com/.test(action)){
//       action = action.replace('/post?', '/post-json?') + "&c=?";
//         if(action.substr(0,2) == "//"){
//           action = 'http:' + action;
//         }
//       }
//
//       // Alter action for a Campaign Monitor-compatible ajax request url.
//       if(/createsend\.com/.test(action)){
//         action = action + '?callback=?';
//         }
//
//
// 		// Set action on the form
// 		form.attr('action', action);
//
// 		// Clone form input fields from
// 		iFrame.contents().find('input, select, textarea').not('input[type="submit"]').each(function(){
// 				$(this).clone().appendTo(form);
//
// 		});
//
// 		return form;
//
//
// }



/*\
|*|	COOKIE LIBRARY THANKS TO MDN
|*|
|*|	A complete cookies reader/writer framework with full unicode support.
|*|
|*|	Revision #1 - September 4, 2014
|*|
|*|	https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|	https://developer.mozilla.org/User:fusionchess
|*|
|*|	This framework is released under the GNU Public License, version 3 or later.
|*|	http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|	Syntaxes:
|*|
|*|	* mr_cookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|	* mr_cookies.getItem(name)
|*|	* mr_cookies.removeItem(name[, path[, domain]])
|*|	* mr_cookies.hasItem(name)
|*|	* mr_cookies.keys()
|*|
\*/

// var mr_cookies = {
// 	getItem: function (sKey) {
// 		if (!sKey) { return null; }
// 		return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
// 	},
// 	setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
// 		if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
// 		var sExpires = "";
// 		if (vEnd) {
// 			switch (vEnd.constructor) {
// 				case Number:
// 					sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
// 					break;
// 				case String:
// 					sExpires = "; expires=" + vEnd;
// 					break;
// 				case Date:
// 					sExpires = "; expires=" + vEnd.toUTCString();
// 					break;
// 			}
// 		}
// 		document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
// 		return true;
// 	},
// 	removeItem: function (sKey, sPath, sDomain) {
// 		if (!this.hasItem(sKey)) { return false; }
// 		document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
// 		return true;
// 	},
// 	hasItem: function (sKey) {
// 		if (!sKey) { return false; }
// 		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
// 	},
// 	keys: function () {
// 		var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
// 		for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
// 		return aKeys;
// 	}
// };

/*\
|*|	END COOKIE LIBRARY
\*/

angular.module('portfolio')

  .controller('EmailController', function($scope, $timeout, email, ENV) {
    $scope.successful = false;
    $scope.sendEmail = function(form) {
      email.mandrill(ENV.APIKEY, ENV.MYEMAIL, form.email, form.message, form.subject, form.name)
        .then(function(response) {
          $scope.successful = true;
          console.log('response', response);

          $scope.response = response;
          $timeout(clear, 3000)
        .catch(function(error) {
          console.log('Error', error);
        });
        });
    };

    function clear() {
      $scope.successful = false;
      $scope.form.name = '';
    }
  });

angular.module('portfolio')
  .service('email', ['$http', 'ENV', function($http, ENV) {
    this.mandrill = function (key, to, from, message, subject, name) {
      var data = {
        'key': key,
        'message': {
          'from-email': from,
          'to': [
            {
              'email': to,
              'to': 'to'
            }
          ],
          'autotext': true,
          'subject': name + " - " + subject,
          'html': message
        }
      };
      return  $http.post(ENV.API_URL, data)
    }
  }]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2FwcC5qcyIsImpzL3NjcmlwdHMuanMiLCJqcy9jb250cm9sbGVycy9FbWFpbENvbnRyb2xsZXIuanMiLCJqcy9zZXJ2aWNlcy9lbWFpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbmFuZ3VsYXIubW9kdWxlKCdwb3J0Zm9saW8nLCBbXSlcbiAgLmNvbnN0YW50KCdFTlYnLCB7XG4gICAgQVBJX1VSTDogJ2h0dHBzOi8vbWFuZHJpbGxhcHAuY29tL2FwaS8xLjAvbWVzc2FnZXMvc2VuZC5qc29uJyxcbiAgICBBUElLRVk6ICdadDlWSlBOelpPcnFWaE9yVUgzLVV3JyxcbiAgICBNWUVNQUlMOiAnYmVuaGFsdmVyc29uQG1lLmNvbSdcblxuICB9KVxuICAvLyAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVQcm92aWRlcikge1xuICAvLyAgICR1cmxSb3V0ZVByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuICAvL1xuICAvLyAgICRzdGF0ZVByb3ZpZGVyXG4gIC8vICAgICAuc3RhdGUoJ2VtYWlsJyxcbiAgLy8gICAgIHsgdXJsOiAnL2VtYWlsJyxcbiAgLy8gICAgICAgY29udHJvbGxlcjogJ2VtYWlsQ3RybCcsXG4gIC8vICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2hvbWUuaHRtbCdcbiAgLy8gICAgIH0pXG4gIC8vICAgICAuc3RhdGUoJy9wb3J0Zm9saW8nLFxuICAvLyAgICAgeyB1cmw6ICcvcG9ydGZvbGlvJyxcbiAgLy8gICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvcG9ydGZvbGlvLmh0bWwnfSk7XG4gIC8vIH0pO1xuIiwidmFyIG1yX2ZpcnN0U2VjdGlvbkhlaWdodDtcbi8vIHZhciBtcl9uYXYsXG5cdFx0Ly8gbXJfbmF2T3V0ZXJIZWlnaHQsXG52YXIgbXJfbmF2U2Nyb2xsZWQgPSBmYWxzZTtcblx0XHQvLyBtcl9uYXZGaXhlZCA9IGZhbHNlLFxuXHRcdC8vIG1yX291dE9mU2lnaHQgPSBmYWxzZSxcbnZhciBtcl9mbG9hdGluZ1Byb2plY3RTZWN0aW9ucztcbnZhciBtcl9zY3JvbGxUb3AgPSAwO1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cdFx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0XHQvLyBPZmZzY3JlZW4gTmF2XG5cblx0XHRpZigkKCcub2Zmc2NyZWVuLXRvZ2dsZScpLmxlbmd0aCl7XG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ2hhcy1vZmZzY3JlZW4tbmF2Jyk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGFzLW9mZnNjcmVlbi1uYXYnKTtcblx0XHR9XG5cblx0XHQkKCcub2Zmc2NyZWVuLXRvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCcubWFpbi1jb250YWluZXInKS50b2dnbGVDbGFzcygncmV2ZWFsLW5hdicpO1xuICAgICAgJCgnbmF2JykudG9nZ2xlQ2xhc3MoJ3JldmVhbC1uYXYnKTtcblx0XHRcdCQoJy5vZmZzY3JlZW4tY29udGFpbmVyJykudG9nZ2xlQ2xhc3MoJ3JldmVhbC1uYXYnKTtcblx0XHR9KTtcblxuXHRcdCQoJy5tYWluLWNvbnRhaW5lcicpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cdFx0XHRpZigkKHRoaXMpLmhhc0NsYXNzKCdyZXZlYWwtbmF2Jykpe1xuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdyZXZlYWwtbmF2Jyk7XG5cdFx0XHRcdCQoJy5vZmZzY3JlZW4tY29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ3JldmVhbC1uYXYnKTtcblx0XHRcdFx0JCgnbmF2JykucmVtb3ZlQ2xhc3MoJ3JldmVhbC1uYXYnKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdCQoJy5vZmZzY3JlZW4tY29udGFpbmVyIGEnKS5jbGljayhmdW5jdGlvbigpe1xuXHRcdFx0JCgnLm9mZnNjcmVlbi1jb250YWluZXInKS5yZW1vdmVDbGFzcygncmV2ZWFsLW5hdicpO1xuXHRcdFx0JCgnLm1haW4tY29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ3JldmVhbC1uYXYnKTtcblx0XHRcdCQoJ25hdicpLnJlbW92ZUNsYXNzKCdyZXZlYWwtbmF2Jyk7XG5cdFx0fSk7XG5cblx0XHQvLyBQb3B1bGF0ZSBmaWx0ZXJzXG5cblx0XHQkKCcucHJvamVjdHMnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdHZhciBmaWx0ZXJzID0gXCJcIjtcblxuXHRcdFx0XHQkKHRoaXMpLmZpbmQoJy5wcm9qZWN0JykuZWFjaChmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0dmFyIGZpbHRlclRhZ3MgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtZmlsdGVyJykuc3BsaXQoJywnKTtcblxuXHRcdFx0XHRcdFx0ZmlsdGVyVGFncy5mb3JFYWNoKGZ1bmN0aW9uKHRhZ05hbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZmlsdGVycy5pbmRleE9mKHRhZ05hbWUpID09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZpbHRlcnMgKz0gJzxsaSBkYXRhLWZpbHRlcj1cIicgKyB0YWdOYW1lICsgJ1wiPicgKyBjYXBpdGFsaXNlRmlyc3RMZXR0ZXIodGFnTmFtZSkgKyAnPC9saT4nO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcucHJvamVjdHMnKVxuXHRcdFx0XHRcdFx0XHRcdC5maW5kKCd1bC5maWx0ZXJzJykuZW1wdHkoKS5hcHBlbmQoJzxsaSBkYXRhLWZpbHRlcj1cImFsbFwiIGNsYXNzPVwiYWN0aXZlXCI+QWxsPC9saT4nKS5hcHBlbmQoZmlsdGVycyk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0JCgnLmZpbHRlcnMgbGknKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGZpbHRlciA9ICQodGhpcykuYXR0cignZGF0YS1maWx0ZXInKTtcblx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcuZmlsdGVycycpLmZpbmQoJ2xpJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuXHRcdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5wcm9qZWN0cycpLmZpbmQoJy5wcm9qZWN0JykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBmaWx0ZXJzID0gJCh0aGlzKS5kYXRhKCdmaWx0ZXInKTtcblxuXHRcdFx0XHRcdFx0aWYgKGZpbHRlcnMuaW5kZXhPZihmaWx0ZXIpID09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnaW5hY3RpdmUnKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnaW5hY3RpdmUnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKGZpbHRlciA9PSAnYWxsJykge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcucHJvamVjdHMnKS5maW5kKCcucHJvamVjdCcpLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xuXHRcdFx0XHR9XG5cdFx0fSk7XG5cblxuXHRcdC8vIEFwcGVuZCAuYmFja2dyb3VuZC1pbWFnZS1ob2xkZXIgPGltZz4ncyBhcyBDU1MgYmFja2dyb3VuZHNcblxuXHRcdCQoJy5iYWNrZ3JvdW5kLWltYWdlLWhvbGRlcicpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBpbWdTcmMgPSAkKHRoaXMpLmNoaWxkcmVuKCdpbWcnKS5hdHRyKCdzcmMnKTtcblx0XHRcdFx0JCh0aGlzKS5jc3MoJ2JhY2tncm91bmQnLCAndXJsKFwiJyArIGltZ1NyYyArICdcIiknKTtcblx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbignaW1nJykuaGlkZSgpO1xuXHRcdFx0XHQkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1wb3NpdGlvbicsICdpbml0aWFsJyk7XG5cdFx0fSk7XG5cblx0XHQvLyBGYWRlIGluIGJhY2tncm91bmQgaW1hZ2VzXG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkKCcuYmFja2dyb3VuZC1pbWFnZS1ob2xkZXInKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnZmFkZUluJyk7XG5cdFx0XHRcdH0pO1xuXHRcdH0sIDIwMCk7XG5cblxuXHRcdC8vIEF1dG9zaG93IG1vZGFsc1xuXG5cdCQoJy5mb3VuZHJ5X21vZGFsW2RhdGEtdGltZS1kZWxheV0nKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0dmFyIG1vZGFsID0gJCh0aGlzKTtcblx0XHR2YXIgZGVsYXkgPSBtb2RhbC5hdHRyKCdkYXRhLXRpbWUtZGVsYXknKTtcblx0XHRtb2RhbC5wcmVwZW5kKCQoJzxpIGNsYXNzPVwidGktY2xvc2UgY2xvc2UtbW9kYWxcIj4nKSk7XG5cdFx0XHRpZih0eXBlb2YgbW9kYWwuYXR0cignZGF0YS1jb29raWUnKSAhPSBcInVuZGVmaW5lZFwiKXtcblx0XHRcdFx0XHRpZighbXJfY29va2llcy5oYXNJdGVtKG1vZGFsLmF0dHIoJ2RhdGEtY29va2llJykpKXtcblx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRcdG1vZGFsLmFkZENsYXNzKCdyZXZlYWwtbW9kYWwnKTtcblx0XHRcdFx0XHRcdFx0JCgnLm1vZGFsLXNjcmVlbicpLmFkZENsYXNzKCdyZXZlYWwtbW9kYWwnKTtcblx0XHRcdFx0XHRcdH0sZGVsYXkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdFx0XHRtb2RhbC5hZGRDbGFzcygncmV2ZWFsLW1vZGFsJyk7XG5cdFx0XHRcdFx0XHRcdFx0JCgnLm1vZGFsLXNjcmVlbicpLmFkZENsYXNzKCdyZXZlYWwtbW9kYWwnKTtcblx0XHRcdFx0XHRcdH0sZGVsYXkpO1xuXHRcdFx0XHR9XG5cdH0pO1xuXG5cdFx0Ly8gQXV0b2Nsb3NlIG1vZGFsc1xuXG5cdFx0JCgnLmZvdW5kcnlfbW9kYWxbZGF0YS1oaWRlLWFmdGVyXScpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyIG1vZGFsID0gJCh0aGlzKTtcblx0XHRcdFx0dmFyIGRlbGF5ID0gbW9kYWwuYXR0cignZGF0YS1oaWRlLWFmdGVyJyk7XG5cdFx0XHRcdGlmKHR5cGVvZiBtb2RhbC5hdHRyKCdkYXRhLWNvb2tpZScpICE9IFwidW5kZWZpbmVkXCIpe1xuXHRcdFx0XHRcdFx0aWYoIW1yX2Nvb2tpZXMuaGFzSXRlbShtb2RhbC5hdHRyKCdkYXRhLWNvb2tpZScpKSl7XG5cdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRcdGlmKCFtb2RhbC5oYXNDbGFzcygnbW9kYWwtYWNrbm93bGVkZ2VkJykpe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRtb2RhbC5yZW1vdmVDbGFzcygncmV2ZWFsLW1vZGFsJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQoJy5tb2RhbC1zY3JlZW4nKS5yZW1vdmVDbGFzcygncmV2ZWFsLW1vZGFsJyk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0sZGVsYXkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdFx0XHRpZighbW9kYWwuaGFzQ2xhc3MoJ21vZGFsLWFja25vd2xlZGdlZCcpKXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kYWwucmVtb3ZlQ2xhc3MoJ3JldmVhbC1tb2RhbCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkKCcubW9kYWwtc2NyZWVuJykucmVtb3ZlQ2xhc3MoJ3JldmVhbC1tb2RhbCcpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0sZGVsYXkpO1xuXHRcdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRqUXVlcnkoJy5jbG9zZS1tb2RhbDpub3QoLm1vZGFsLXN0cmlwIC5jbG9zZS1tb2RhbCknKS51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24oKXtcblx0XHRcdHZhciBtb2RhbCA9IGpRdWVyeSh0aGlzKS5jbG9zZXN0KCcuZm91bmRyeV9tb2RhbCcpO1xuXHRcdFx0XHRtb2RhbC50b2dnbGVDbGFzcygncmV2ZWFsLW1vZGFsJyk7XG5cdFx0XHRcdGlmKHR5cGVvZiBtb2RhbC5hdHRyKCdkYXRhLWNvb2tpZScpICE9PSBcInVuZGVmaW5lZFwiKXtcblx0XHRcdFx0XHRcdG1yX2Nvb2tpZXMuc2V0SXRlbShtb2RhbC5hdHRyKCdkYXRhLWNvb2tpZScpLCBcInRydWVcIiwgSW5maW5pdHkpO1xuXHRcdFx0XHR9XG5cdFx0XHRpZihtb2RhbC5maW5kKCdpZnJhbWUnKS5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0bW9kYWwuZmluZCgnaWZyYW1lJykuYXR0cignc3JjJywgJycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGpRdWVyeSgnLm1vZGFsLXNjcmVlbicpLnJlbW92ZUNsYXNzKCdyZXZlYWwtbW9kYWwnKTtcblx0XHR9KTtcblxuXHRcdGpRdWVyeSgnLm1vZGFsLXNjcmVlbicpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbigpe1xuXHRcdFx0XHRpZihqUXVlcnkoJy5mb3VuZHJ5X21vZGFsLnJldmVhbC1tb2RhbCcpLmZpbmQoJ2lmcmFtZScpLmxlbmd0aCl7XG5cdFx0XHRcdFx0XHRqUXVlcnkoJy5mb3VuZHJ5X21vZGFsLnJldmVhbC1tb2RhbCcpLmZpbmQoJ2lmcmFtZScpLmF0dHIoJ3NyYycsICcnKTtcblx0XHRcdFx0fVxuXHRcdFx0alF1ZXJ5KCcuZm91bmRyeV9tb2RhbC5yZXZlYWwtbW9kYWwnKS50b2dnbGVDbGFzcygncmV2ZWFsLW1vZGFsJyk7XG5cdFx0XHRqUXVlcnkodGhpcykudG9nZ2xlQ2xhc3MoJ3JldmVhbC1tb2RhbCcpO1xuXHRcdH0pO1xuXG5cdFx0alF1ZXJ5KGRvY3VtZW50KS5rZXl1cChmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09IDI3KSB7IC8vIGVzY2FwZSBrZXkgbWFwcyB0byBrZXljb2RlIGAyN2Bcblx0XHRcdFx0XHRcdGlmKGpRdWVyeSgnLmZvdW5kcnlfbW9kYWwnKS5maW5kKCdpZnJhbWUnKS5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeSgnLmZvdW5kcnlfbW9kYWwnKS5maW5kKCdpZnJhbWUnKS5hdHRyKCdzcmMnLCAnJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRqUXVlcnkoJy5mb3VuZHJ5X21vZGFsJykucmVtb3ZlQ2xhc3MoJ3JldmVhbC1tb2RhbCcpO1xuXHRcdFx0alF1ZXJ5KCcubW9kYWwtc2NyZWVuJykucmVtb3ZlQ2xhc3MoJ3JldmVhbC1tb2RhbCcpO1xuXHRcdH1cblx0fSk7XG5cblx0XHQvLyBNb2RhbCBTdHJpcHNcblxuXHRcdGpRdWVyeSgnLm1vZGFsLXN0cmlwJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0aWYoIWpRdWVyeSh0aGlzKS5maW5kKCcuY2xvc2UtbW9kYWwnKS5sZW5ndGgpe1xuXHRcdFx0XHRqUXVlcnkodGhpcykuYXBwZW5kKGpRdWVyeSgnPGkgY2xhc3M9XCJ0aS1jbG9zZSBjbG9zZS1tb2RhbFwiPicpKTtcblx0XHRcdH1cblx0XHRcdHZhciBtb2RhbCA9IGpRdWVyeSh0aGlzKTtcblxuXHRcdFx0XHRpZih0eXBlb2YgbW9kYWwuYXR0cignZGF0YS1jb29raWUnKSAhPSBcInVuZGVmaW5lZFwiKXtcblxuXHRcdFx0XHRcdFx0aWYoIW1yX2Nvb2tpZXMuaGFzSXRlbShtb2RhbC5hdHRyKCdkYXRhLWNvb2tpZScpKSl7XG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdFx0XHRtb2RhbC5hZGRDbGFzcygncmV2ZWFsLW1vZGFsJyk7XG5cdFx0XHRcdFx0XHRcdH0sMTAwMCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRtb2RhbC5hZGRDbGFzcygncmV2ZWFsLW1vZGFsJyk7XG5cdFx0XHRcdFx0XHR9LDEwMDApO1xuXHRcdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRqUXVlcnkoJy5tb2RhbC1zdHJpcCAuY2xvc2UtbW9kYWwnKS5jbGljayhmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgbW9kYWwgPSBqUXVlcnkodGhpcykuY2xvc2VzdCgnLm1vZGFsLXN0cmlwJyk7XG5cdFx0XHRcdGlmKHR5cGVvZiBtb2RhbC5hdHRyKCdkYXRhLWNvb2tpZScpICE9IFwidW5kZWZpbmVkXCIpe1xuXHRcdFx0XHRcdFx0bXJfY29va2llcy5zZXRJdGVtKG1vZGFsLmF0dHIoJ2RhdGEtY29va2llJyksIFwidHJ1ZVwiLCBJbmZpbml0eSk7XG5cdFx0XHRcdH1cblx0XHRcdGpRdWVyeSh0aGlzKS5jbG9zZXN0KCcubW9kYWwtc3RyaXAnKS5yZW1vdmVDbGFzcygncmV2ZWFsLW1vZGFsJyk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cblxuXHRcdC8vIFZpZGVvIE1vZGFsc1xuXG5cdFx0alF1ZXJ5KCcuY2xvc2UtaWZyYW1lJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGpRdWVyeSh0aGlzKS5jbG9zZXN0KCcubW9kYWwtdmlkZW8nKS5yZW1vdmVDbGFzcygncmV2ZWFsLW1vZGFsJyk7XG5cdFx0XHRcdGpRdWVyeSh0aGlzKS5zaWJsaW5ncygnaWZyYW1lJykuYXR0cignc3JjJywgJycpO1xuXHRcdFx0XHRqUXVlcnkodGhpcykuc2libGluZ3MoJ3ZpZGVvJykuZ2V0KDApLnBhdXNlKCk7XG5cdFx0fSk7XG5cblx0XHQvLyBDaGVja2JveGVzXG5cblx0XHQkKCcuY2hlY2tib3gtb3B0aW9uJykub24oXCJjbGlja1wiLGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdjaGVja2VkJyk7XG5cdFx0XHRcdHZhciBjaGVja2JveCA9ICQodGhpcykuZmluZCgnaW5wdXQnKTtcblx0XHRcdFx0aWYgKGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnKSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIFJhZGlvIEJ1dHRvbnNcblxuXHRcdCQoJy5yYWRpby1vcHRpb24nKS5jbGljayhmdW5jdGlvbigpIHtcblxuXHRcdFx0XHR2YXIgY2hlY2tlZCA9ICQodGhpcykuaGFzQ2xhc3MoJ2NoZWNrZWQnKTsgLy8gR2V0IHRoZSBjdXJyZW50IHN0YXR1cyBvZiB0aGUgcmFkaW9cblxuXHRcdFx0XHR2YXIgbmFtZSA9ICQodGhpcykuZmluZCgnaW5wdXQnKS5hdHRyKCduYW1lJyk7IC8vIEdldCB0aGUgbmFtZSBvZiB0aGUgaW5wdXQgY2xpY2tlZFxuXG5cdFx0XHRcdGlmICghY2hlY2tlZCkge1xuXG5cdFx0XHRcdFx0XHQkKCdpbnB1dFtuYW1lPVwiJytuYW1lKydcIl0nKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdjaGVja2VkJyk7XG5cblx0XHRcdFx0XHRcdCQodGhpcykuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cblx0XHRcdFx0fVxuXG5cdFx0fSk7XG5cblxuXHRcdC8vIEFjY29yZGlvbnNcblxuXHRcdC8vICQoJy5hY2NvcmRpb24gbGknKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHQvL1x0XHQgaWYgKCQodGhpcykuY2xvc2VzdCgnLmFjY29yZGlvbicpLmhhc0NsYXNzKCdvbmUtb3BlbicpKSB7XG5cdFx0Ly9cdFx0XHRcdCAkKHRoaXMpLmNsb3Nlc3QoJy5hY2NvcmRpb24nKS5maW5kKCdsaScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHQvL1x0XHRcdFx0ICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdC8vXHRcdCB9IGVsc2Uge1xuXHRcdC8vXHRcdFx0XHQgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG5cdFx0Ly9cdFx0IH1cblx0XHQvL1x0XHQgaWYodHlwZW9mIHdpbmRvdy5tcl9wYXJhbGxheCAhPT0gXCJ1bmRlZmluZWRcIil7XG5cdFx0Ly9cdFx0XHRcdCBzZXRUaW1lb3V0KG1yX3BhcmFsbGF4LndpbmRvd0xvYWQsIDUwMCk7XG5cdFx0Ly9cdFx0IH1cblx0XHQvLyB9KTtcblxuXHRcdC8vIFRhYmJlZCBDb250ZW50XG5cblx0XHQkKCcudGFiYmVkLWNvbnRlbnQnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkKHRoaXMpLmFwcGVuZCgnPHVsIGNsYXNzPVwiY29udGVudFwiPjwvdWw+Jyk7XG5cdFx0fSk7XG5cblx0XHQkKCcudGFicyBsaScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBvcmlnaW5hbFRhYiA9ICQodGhpcyksXG5cdFx0XHRcdFx0XHRhY3RpdmVDbGFzcyA9IFwiXCI7XG5cdFx0XHRcdGlmIChvcmlnaW5hbFRhYi5pcygnLnRhYnM+bGk6Zmlyc3QtY2hpbGQnKSkge1xuXHRcdFx0XHRcdFx0YWN0aXZlQ2xhc3MgPSAnIGNsYXNzPVwiYWN0aXZlXCInO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciB0YWJDb250ZW50ID0gb3JpZ2luYWxUYWIuZmluZCgnLnRhYi1jb250ZW50JykuZGV0YWNoKCkud3JhcCgnPGxpJyArIGFjdGl2ZUNsYXNzICsgJz48L2xpPicpLnBhcmVudCgpO1xuXHRcdFx0XHRvcmlnaW5hbFRhYi5jbG9zZXN0KCcudGFiYmVkLWNvbnRlbnQnKS5maW5kKCcuY29udGVudCcpLmFwcGVuZCh0YWJDb250ZW50KTtcblx0XHR9KTtcblxuXHRcdCQoJy50YWJzIGxpJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCQodGhpcykuY2xvc2VzdCgnLnRhYnMnKS5maW5kKCdsaScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdHZhciBsaUluZGV4ID0gJCh0aGlzKS5pbmRleCgpICsgMTtcblx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcudGFiYmVkLWNvbnRlbnQnKS5maW5kKCcuY29udGVudD5saScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcudGFiYmVkLWNvbnRlbnQnKS5maW5kKCcuY29udGVudD5saTpudGgtb2YtdHlwZSgnICsgbGlJbmRleCArICcpJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gTG9jYWwgVmlkZW9zXG5cblx0XHQkKCdzZWN0aW9uJykuY2xvc2VzdCgnYm9keScpLmZpbmQoJy5sb2NhbC12aWRlby1jb250YWluZXIgLnBsYXktYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCQodGhpcykuc2libGluZ3MoJy5iYWNrZ3JvdW5kLWltYWdlLWhvbGRlcicpLnJlbW92ZUNsYXNzKCdmYWRlSW4nKTtcblx0XHRcdFx0JCh0aGlzKS5zaWJsaW5ncygnLmJhY2tncm91bmQtaW1hZ2UtaG9sZGVyJykuY3NzKCd6LWluZGV4JywgLTEpO1xuXHRcdFx0XHQkKHRoaXMpLmNzcygnb3BhY2l0eScsIDApO1xuXHRcdFx0XHQkKHRoaXMpLnNpYmxpbmdzKCd2aWRlbycpLmdldCgwKS5wbGF5KCk7XG5cdFx0fSk7XG5cblxuXHRcdC8vIEludGVyYWN0IHdpdGggTWFwIG9uY2UgdGhlIHVzZXIgaGFzIGNsaWNrZWQgKHRvIHByZXZlbnQgc2Nyb2xsaW5nIHRoZSBwYWdlID0gem9vbWluZyB0aGUgbWFwXG5cblx0XHQkKCcubWFwLWhvbGRlcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdpbnRlcmFjdCcpO1xuXHRcdH0pO1xuXG5cdFx0aWYoJCgnLm1hcC1ob2xkZXInKS5sZW5ndGgpe1xuXHRcdFx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcblx0XHRcdGlmICgkKCcubWFwLWhvbGRlci5pbnRlcmFjdCcpLmxlbmd0aCkge1xuXHRcdFx0XHQkKCcubWFwLWhvbGRlci5pbnRlcmFjdCcpLnJlbW92ZUNsYXNzKCdpbnRlcmFjdCcpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIENvdW50ZG93biBUaW1lcnNcblxuXHRcdGlmICgkKCcuY291bnRkb3duJykubGVuZ3RoKSB7XG5cdFx0XHRcdCQoJy5jb3VudGRvd24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dmFyIGRhdGUgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtZGF0ZScpO1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5jb3VudGRvd24oZGF0ZSwgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0XHQkKHRoaXMpLnRleHQoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGV2ZW50LnN0cmZ0aW1lKCclRCBkYXlzICVIOiVNOiVTJylcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblxuXG5cblx0XHQvLyBEaXNhYmxlIHBhcmFsbGF4IG9uIG1vYmlsZVxuXG5cdFx0aWYgKCgvQW5kcm9pZHxpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8V2luZG93cyBQaG9uZS9pKS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmEpKSB7XG5cdFx0XHRcdCQoJ3NlY3Rpb24nKS5yZW1vdmVDbGFzcygncGFyYWxsYXgnKTtcblx0XHR9XG5cblxuXG59KTtcblxuJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XG5cdFx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0XHQvLyBJbml0aWFsaXplIE1hc29ucnlcblxuXHRcdGlmICgkKCcubWFzb25yeScpLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hc29ucnknKTtcblx0XHRcdFx0dmFyIG1zbnJ5ID0gbmV3IE1hc29ucnkoY29udGFpbmVyLCB7XG5cdFx0XHRcdFx0XHRpdGVtU2VsZWN0b3I6ICcubWFzb25yeS1pdGVtJ1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRtc25yeS5vbignbGF5b3V0Q29tcGxldGUnLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0bXJfZmlyc3RTZWN0aW9uSGVpZ2h0ID0gJCgnLm1haW4tY29udGFpbmVyIHNlY3Rpb246bnRoLW9mLXR5cGUoMSknKS5vdXRlckhlaWdodCh0cnVlKTtcblxuXHRcdFx0XHRcdFx0Ly8gRml4IGZsb2F0aW5nIHByb2plY3QgZmlsdGVycyB0byBib3R0b20gb2YgcHJvamVjdHMgY29udGFpbmVyXG5cblx0XHRcdFx0XHRcdGlmICgkKCcuZmlsdGVycy5mbG9hdGluZycpLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdHNldHVwRmxvYXRpbmdQcm9qZWN0RmlsdGVycygpO1xuXHRcdFx0XHRcdFx0XHRcdHVwZGF0ZUZsb2F0aW5nRmlsdGVycygpO1xuXHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHVwZGF0ZUZsb2F0aW5nRmlsdGVycywgZmFsc2UpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQkKCcubWFzb25yeScpLmFkZENsYXNzKCdmYWRlSW4nKTtcblx0XHRcdFx0XHRcdCQoJy5tYXNvbnJ5LWxvYWRlcicpLmFkZENsYXNzKCdmYWRlT3V0Jyk7XG5cdFx0XHRcdFx0XHRpZiAoJCgnLm1hc29ucnlGbHlJbicpLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdG1hc29ucnlGbHlJbigpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRtc25yeS5sYXlvdXQoKTtcblx0XHR9XG5cblx0XHQvLyBJbml0aWFsaXplIHR3aXR0ZXIgZmVlZFxuXG5cdFx0dmFyIHNldFVwVHdlZXRzID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICgkKCcudHdlZXRzLXNsaWRlcicpLmZpbmQoJ2xpLmZsZXgtYWN0aXZlLXNsaWRlJykubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRjbGVhckludGVydmFsKHNldFVwVHdlZXRzKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmICgkKCcudHdlZXRzLXNsaWRlcicpLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdCQoJy50d2VldHMtc2xpZGVyJykuZmxleHNsaWRlcih7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRpcmVjdGlvbk5hdjogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRyb2xOYXY6IGZhbHNlXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHR9LCA1MDApO1xuXG5cdFx0bXJfZmlyc3RTZWN0aW9uSGVpZ2h0ID0gJCgnLm1haW4tY29udGFpbmVyIHNlY3Rpb246bnRoLW9mLXR5cGUoMSknKS5vdXRlckhlaWdodCh0cnVlKTtcblxuXG59KTtcblxuLy8gZnVuY3Rpb24gdXBkYXRlTmF2KCkge1xuLy9cbi8vXHRcdCB2YXIgc2Nyb2xsWSA9IG1yX3Njcm9sbFRvcDtcbi8vXG4vL1x0XHQgaWYgKHNjcm9sbFkgPD0gMCkge1xuLy9cdFx0XHRcdCBpZiAobXJfbmF2Rml4ZWQpIHtcbi8vXHRcdFx0XHRcdFx0IG1yX25hdkZpeGVkID0gZmFsc2U7XG4vL1x0XHRcdFx0XHRcdCBtcl9uYXYucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG4vL1x0XHRcdFx0IH1cbi8vXHRcdFx0XHQgaWYgKG1yX291dE9mU2lnaHQpIHtcbi8vXHRcdFx0XHRcdFx0IG1yX291dE9mU2lnaHQgPSBmYWxzZTtcbi8vXHRcdFx0XHRcdFx0IG1yX25hdi5yZW1vdmVDbGFzcygnb3V0T2ZTaWdodCcpO1xuLy9cdFx0XHRcdCB9XG4vL1x0XHRcdFx0IGlmIChtcl9uYXZTY3JvbGxlZCkge1xuLy9cdFx0XHRcdFx0XHQgbXJfbmF2U2Nyb2xsZWQgPSBmYWxzZTtcbi8vXHRcdFx0XHRcdFx0IG1yX25hdi5yZW1vdmVDbGFzcygnc2Nyb2xsZWQnKTtcbi8vXHRcdFx0XHQgfVxuLy9cdFx0XHRcdCByZXR1cm47XG4vL1x0XHQgfVxuLy9cbi8vXHRcdCBpZiAoc2Nyb2xsWSA+IG1yX2ZpcnN0U2VjdGlvbkhlaWdodCkge1xuLy9cdFx0XHRcdCBpZiAoIW1yX25hdlNjcm9sbGVkKSB7XG4vL1x0XHRcdFx0XHRcdCBtcl9uYXYuYWRkQ2xhc3MoJ3Njcm9sbGVkJyk7XG4vL1x0XHRcdFx0XHRcdCBtcl9uYXZTY3JvbGxlZCA9IHRydWU7XG4vL1x0XHRcdFx0XHRcdCByZXR1cm47XG4vL1x0XHRcdFx0IH1cbi8vXHRcdCB9IGVsc2Uge1xuLy9cdFx0XHRcdCBpZiAoc2Nyb2xsWSA+IG1yX25hdk91dGVySGVpZ2h0KSB7XG4vL1x0XHRcdFx0XHRcdCBpZiAoIW1yX25hdkZpeGVkKSB7XG4vL1x0XHRcdFx0XHRcdFx0XHQgbXJfbmF2LmFkZENsYXNzKCdmaXhlZCcpO1xuLy9cdFx0XHRcdFx0XHRcdFx0IG1yX25hdkZpeGVkID0gdHJ1ZTtcbi8vXHRcdFx0XHRcdFx0IH1cbi8vXG4vL1x0XHRcdFx0XHRcdCBpZiAoc2Nyb2xsWSA+IG1yX25hdk91dGVySGVpZ2h0ICogMikge1xuLy9cdFx0XHRcdFx0XHRcdFx0IGlmICghbXJfb3V0T2ZTaWdodCkge1xuLy9cdFx0XHRcdFx0XHRcdFx0XHRcdCBtcl9uYXYuYWRkQ2xhc3MoJ291dE9mU2lnaHQnKTtcbi8vXHRcdFx0XHRcdFx0XHRcdFx0XHQgbXJfb3V0T2ZTaWdodCA9IHRydWU7XG4vL1x0XHRcdFx0XHRcdFx0XHQgfVxuLy9cdFx0XHRcdFx0XHQgfSBlbHNlIHtcbi8vXHRcdFx0XHRcdFx0XHRcdCBpZiAobXJfb3V0T2ZTaWdodCkge1xuLy9cdFx0XHRcdFx0XHRcdFx0XHRcdCBtcl9vdXRPZlNpZ2h0ID0gZmFsc2U7XG4vL1x0XHRcdFx0XHRcdFx0XHRcdFx0IG1yX25hdi5yZW1vdmVDbGFzcygnb3V0T2ZTaWdodCcpO1xuLy9cdFx0XHRcdFx0XHRcdFx0IH1cbi8vXHRcdFx0XHRcdFx0IH1cbi8vXHRcdFx0XHQgfSBlbHNlIHtcbi8vXHRcdFx0XHRcdFx0IGlmIChtcl9uYXZGaXhlZCkge1xuLy9cdFx0XHRcdFx0XHRcdFx0IG1yX25hdkZpeGVkID0gZmFsc2U7XG4vL1x0XHRcdFx0XHRcdFx0XHQgbXJfbmF2LnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xuLy9cdFx0XHRcdFx0XHQgfVxuLy9cdFx0XHRcdFx0XHQgaWYgKG1yX291dE9mU2lnaHQpIHtcbi8vXHRcdFx0XHRcdFx0XHRcdCBtcl9vdXRPZlNpZ2h0ID0gZmFsc2U7XG4vL1x0XHRcdFx0XHRcdFx0XHQgbXJfbmF2LnJlbW92ZUNsYXNzKCdvdXRPZlNpZ2h0Jyk7XG4vL1x0XHRcdFx0XHRcdCB9XG4vL1x0XHRcdFx0IH1cbi8vXG4vL1x0XHRcdFx0IGlmIChtcl9uYXZTY3JvbGxlZCkge1xuLy9cdFx0XHRcdFx0XHQgbXJfbmF2U2Nyb2xsZWQgPSBmYWxzZTtcbi8vXHRcdFx0XHRcdFx0IG1yX25hdi5yZW1vdmVDbGFzcygnc2Nyb2xsZWQnKTtcbi8vXHRcdFx0XHQgfVxuLy9cbi8vXHRcdCB9XG4vLyB9XG5cbmZ1bmN0aW9uIGNhcGl0YWxpc2VGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xufVxuXG5mdW5jdGlvbiBtYXNvbnJ5Rmx5SW4oKSB7XG5cdFx0dmFyICRpdGVtcyA9ICQoJy5tYXNvbnJ5Rmx5SW4gLm1hc29ucnktaXRlbScpO1xuXHRcdHZhciB0aW1lID0gMDtcblxuXHRcdCRpdGVtcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgaXRlbSA9ICQodGhpcyk7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpdGVtLmFkZENsYXNzKCdmYWRlSW4nKTtcblx0XHRcdFx0fSwgdGltZSk7XG5cdFx0XHRcdHRpbWUgKz0gMTcwO1xuXHRcdH0pO1xufVxuXG5mdW5jdGlvbiBzZXR1cEZsb2F0aW5nUHJvamVjdEZpbHRlcnMoKSB7XG5cdFx0bXJfZmxvYXRpbmdQcm9qZWN0U2VjdGlvbnMgPSBbXTtcblx0XHQkKCcuZmlsdGVycy5mbG9hdGluZycpLmNsb3Nlc3QoJ3NlY3Rpb24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc2VjdGlvbiA9ICQodGhpcyk7XG5cblx0XHRcdFx0bXJfZmxvYXRpbmdQcm9qZWN0U2VjdGlvbnMucHVzaCh7XG5cdFx0XHRcdFx0XHRzZWN0aW9uOiBzZWN0aW9uLmdldCgwKSxcblx0XHRcdFx0XHRcdG91dGVySGVpZ2h0OiBzZWN0aW9uLm91dGVySGVpZ2h0KCksXG5cdFx0XHRcdFx0XHRlbGVtVG9wOiBzZWN0aW9uLm9mZnNldCgpLnRvcCxcblx0XHRcdFx0XHRcdGVsZW1Cb3R0b206IHNlY3Rpb24ub2Zmc2V0KCkudG9wICsgc2VjdGlvbi5vdXRlckhlaWdodCgpLFxuXHRcdFx0XHRcdFx0ZmlsdGVyczogc2VjdGlvbi5maW5kKCcuZmlsdGVycy5mbG9hdGluZycpLFxuXHRcdFx0XHRcdFx0ZmlsZXJzSGVpZ2h0OiBzZWN0aW9uLmZpbmQoJy5maWx0ZXJzLmZsb2F0aW5nJykub3V0ZXJIZWlnaHQodHJ1ZSlcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUZsb2F0aW5nRmlsdGVycygpIHtcblx0XHR2YXIgbCA9IG1yX2Zsb2F0aW5nUHJvamVjdFNlY3Rpb25zLmxlbmd0aDtcblx0XHR3aGlsZSAobC0tKSB7XG5cdFx0XHRcdHZhciBzZWN0aW9uID0gbXJfZmxvYXRpbmdQcm9qZWN0U2VjdGlvbnNbbF07XG5cblx0XHRcdFx0aWYgKChzZWN0aW9uLmVsZW1Ub3AgPCBtcl9zY3JvbGxUb3ApICYmIHR5cGVvZiB3aW5kb3cubXJfdmFyaWFudCA9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0XHRcdFx0c2VjdGlvbi5maWx0ZXJzLmNzcyh7XG5cdFx0XHRcdFx0XHRcdFx0cG9zaXRpb246ICdmaXhlZCcsXG5cdFx0XHRcdFx0XHRcdFx0dG9wOiAnMTZweCcsXG5cdFx0XHRcdFx0XHRcdFx0Ym90dG9tOiAnYXV0bydcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0aWYgKG1yX25hdlNjcm9sbGVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2VjdGlvbi5maWx0ZXJzLmNzcyh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKC01MCUsNDhweCwwKSdcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChtcl9zY3JvbGxUb3AgPiAoc2VjdGlvbi5lbGVtQm90dG9tIC0gNzApKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2VjdGlvbi5maWx0ZXJzLmNzcyh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRib3R0b206ICcxNnB4Jyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG9wOiAnYXV0bydcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRzZWN0aW9uLmZpbHRlcnMuY3NzKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTUwJSwwLDApJ1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c2VjdGlvbi5maWx0ZXJzLmNzcyh7XG5cdFx0XHRcdFx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0XHRcdFx0XHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTUwJSwwLDApJ1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHR9XG59XG5cbi8vIHdpbmRvdy5pbml0aWFsaXplTWFwcyA9IGZ1bmN0aW9uKCl7XG4vLyBcdFx0aWYodHlwZW9mIGdvb2dsZSAhPT0gXCJ1bmRlZmluZWRcIil7XG4vLyBcdFx0XHRcdGlmKHR5cGVvZiBnb29nbGUubWFwcyAhPT0gXCJ1bmRlZmluZWRcIil7XG4vLyBcdFx0XHRcdFx0XHQkKCcubWFwLWNhbnZhc1tkYXRhLW1hcHMtYXBpLWtleV0nKS5lYWNoKGZ1bmN0aW9uKCl7XG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBtYXBJbnN0YW5jZVx0ID0gdGhpcyxcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1hcEpTT05cdFx0XHQgPSB0eXBlb2YgJCh0aGlzKS5hdHRyKCdkYXRhLW1hcC1zdHlsZScpICE9PSBcInVuZGVmaW5lZFwiID8gJCh0aGlzKS5hdHRyKCdkYXRhLW1hcC1zdHlsZScpOiBmYWxzZSxcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1hcFN0eWxlXHRcdFx0PSBKU09OLnBhcnNlKG1hcEpTT04pIHx8IFt7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjotMTAwfSx7XCJsaWdodG5lc3NcIjo2NX0se1widmlzaWJpbGl0eVwiOlwib25cIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjotMTAwfSx7XCJsaWdodG5lc3NcIjo1MX0se1widmlzaWJpbGl0eVwiOlwic2ltcGxpZmllZFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOi0xMDB9LHtcInZpc2liaWxpdHlcIjpcInNpbXBsaWZpZWRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5hcnRlcmlhbFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6LTEwMH0se1wibGlnaHRuZXNzXCI6MzB9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQubG9jYWxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOi0xMDB9LHtcImxpZ2h0bmVzc1wiOjQwfSx7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ0cmFuc2l0XCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjotMTAwfSx7XCJ2aXNpYmlsaXR5XCI6XCJzaW1wbGlmaWVkXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlLnByb3ZpbmNlXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVsc1wiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifSx7XCJsaWdodG5lc3NcIjotMjV9LHtcInNhdHVyYXRpb25cIjotMTAwfV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImh1ZVwiOlwiI2ZmZmYwMFwifSx7XCJsaWdodG5lc3NcIjotMjV9LHtcInNhdHVyYXRpb25cIjotOTd9XX1dLFxuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0em9vbUxldmVsXHRcdCA9ICh0eXBlb2YgJCh0aGlzKS5hdHRyKCdkYXRhLW1hcC16b29tJykgIT09IFwidW5kZWZpbmVkXCIgJiYgJCh0aGlzKS5hdHRyKCdkYXRhLW1hcC16b29tJykgIT09IFwiXCIpID8gJCh0aGlzKS5hdHRyKCdkYXRhLW1hcC16b29tJykgKiAxOiAxNyxcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhdGxvbmdcdFx0XHQgPSB0eXBlb2YgJCh0aGlzKS5hdHRyKCdkYXRhLWxhdGxvbmcnKSAhPSBcInVuZGVmaW5lZFwiID8gJCh0aGlzKS5hdHRyKCdkYXRhLWxhdGxvbmcnKSA6IGZhbHNlLFxuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGF0aXR1ZGVcdFx0XHQ9IGxhdGxvbmcgPyAxICpsYXRsb25nLnN1YnN0cigwLCBsYXRsb25nLmluZGV4T2YoJywnKSkgOiBmYWxzZSxcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxvbmdpdHVkZVx0XHQgPSBsYXRsb25nID8gMSAqIGxhdGxvbmcuc3Vic3RyKGxhdGxvbmcuaW5kZXhPZihcIixcIikgKyAxKSA6IGZhbHNlLFxuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Z2VvY29kZXJcdFx0XHQ9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpLFxuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YWRkcmVzc1x0XHRcdCA9IHR5cGVvZiAkKHRoaXMpLmF0dHIoJ2RhdGEtYWRkcmVzcycpICE9PSBcInVuZGVmaW5lZFwiID8gJCh0aGlzKS5hdHRyKCdkYXRhLWFkZHJlc3MnKS5zcGxpdCgnOycpOiBmYWxzZSxcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1hcmtlclRpdGxlXHQgPSBcIldlIEFyZSBIZXJlXCIsXG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpc0RyYWdnYWJsZSA9ICQoZG9jdW1lbnQpLndpZHRoKCkgPiA3NjYgPyB0cnVlIDogZmFsc2UsXG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtYXAsIG1hcmtlciwgbWFya2VySW1hZ2UsXG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtYXBPcHRpb25zID0ge1xuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRyYWdnYWJsZTogaXNEcmFnZ2FibGUsXG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2Nyb2xsd2hlZWw6IGZhbHNlLFxuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHpvb206IHpvb21MZXZlbCxcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlczogbWFwU3R5bGVcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH07XG4vL1xuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRpZigkKHRoaXMpLmF0dHIoJ2RhdGEtbWFya2VyLXRpdGxlJykgIT0gdW5kZWZpbmVkICYmICQodGhpcykuYXR0cignZGF0YS1tYXJrZXItdGl0bGUnKSAhPSBcIlwiIClcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0e1xuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWFya2VyVGl0bGUgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtbWFya2VyLXRpdGxlJyk7XG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdH1cbi8vXG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdGlmKGFkZHJlc3MgIT0gdW5kZWZpbmVkICYmIGFkZHJlc3NbMF0gIT0gXCJcIil7XG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Z2VvY29kZXIuZ2VvY29kZSggeyAnYWRkcmVzcyc6IGFkZHJlc3NbMF0ucmVwbGFjZSgnW25vbWFya2VyXScsJycpfSwgZnVuY3Rpb24ocmVzdWx0cywgc3RhdHVzKSB7XG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChzdGF0dXMgPT0gZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMuT0spIHtcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwSW5zdGFuY2UsIG1hcE9wdGlvbnMpO1xuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtYXAuc2V0Q2VudGVyKHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24pO1xuLy9cbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YWRkcmVzcy5mb3JFYWNoKGZ1bmN0aW9uKGFkZHJlc3Mpe1xuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIG1hcmtlckdlb0NvZGVyO1xuLy9cbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1hcmtlckltYWdlID0ge3VybDogd2luZG93Lm1yX3ZhcmlhbnQgPT0gdW5kZWZpbmVkID8gJ2ltZy9tYXBtYXJrZXIucG5nJyA6ICcuLi9pbWcvbWFwbWFya2VyLnBuZycsIHNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDUwLDUwKSwgc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoNTAsNTApfTtcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmKC8oXFwtP1xcZCsoXFwuXFxkKyk/KSxcXHMqKFxcLT9cXGQrKFxcLlxcZCspPykvLnRlc3QoYWRkcmVzcykgKXtcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgbGF0bG9uZyA9IGFkZHJlc3Muc3BsaXQoJywnKSxcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cG9zaXRpb246IHsgbGF0OiAxKmxhdGxvbmdbMF0sIGxuZzogMSpsYXRsb25nWzFdIH0sXG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1hcDogbWFwLFxuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpY29uOiBtYXJrZXJJbWFnZSxcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGl0bGU6IG1hcmtlclRpdGxlLFxuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpbWlzZWQ6IGZhbHNlXG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmKGFkZHJlc3MuaW5kZXhPZignW25vbWFya2VyXScpIDwgMCl7XG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWFya2VyR2VvQ29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtYXJrZXJHZW9Db2Rlci5nZW9jb2RlKCB7ICdhZGRyZXNzJzogYWRkcmVzcy5yZXBsYWNlKCdbbm9tYXJrZXJdJywnJyl9LCBmdW5jdGlvbihyZXN1bHRzLCBzdGF0dXMpIHtcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHN0YXR1cyA9PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWFwOiBtYXAsXG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWNvbjogbWFya2VySW1hZ2UsXG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGl0bGU6IG1hcmtlclRpdGxlLFxuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiByZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLFxuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGltaXNlZDogZmFsc2Vcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG4vL1xuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnVGhlcmUgd2FzIGEgcHJvYmxlbSBnZW9jb2RpbmcgdGhlIGFkZHJlc3MuJyk7XG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdH1cbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZihsYXRpdHVkZSAhPSB1bmRlZmluZWQgJiYgbGF0aXR1ZGUgIT0gXCJcIiAmJiBsYXRpdHVkZSAhPSBmYWxzZSAmJiBsb25naXR1ZGUgIT0gdW5kZWZpbmVkICYmIGxvbmdpdHVkZSAhPSBcIlwiICYmIGxvbmdpdHVkZSAhPSBmYWxzZSApe1xuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWFwT3B0aW9ucy5jZW50ZXJcdCA9IHsgbGF0OiBsYXRpdHVkZSwgbG5nOiBsb25naXR1ZGV9O1xuLy8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChtYXBJbnN0YW5jZSwgbWFwT3B0aW9ucyk7XG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtYXJrZXJcdFx0XHRcdFx0XHRcdD0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4vLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cG9zaXRpb246IHsgbGF0OiBsYXRpdHVkZSwgbG5nOiBsb25naXR1ZGUgfSxcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtYXA6IG1hcCxcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpY29uOiBtYXJrZXJJbWFnZSxcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aXRsZTogbWFya2VyVGl0bGVcbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuLy9cbi8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuLy9cbi8vIFx0XHRcdFx0XHRcdFx0XHR9KTtcbi8vIFx0XHRcdFx0fVxuLy8gXHRcdH1cbi8vIH1cbi8vIGluaXRpYWxpemVNYXBzKCk7XG5cbi8vIEVuZCBvZiBNYXBzXG5cblxuXG5cbi8vIFByZXBhcmUgU2lnbnVwIEZvcm0gLSBJdCBpcyB1c2VkIHRvIHJldHJpZXZlIGZvcm0gZGV0YWlscyBmcm9tIGFuIGlmcmFtZSBNYWlsIENoaW1wIG9yIENhbXBhaWduIE1vbml0b3IgZm9ybS5cblxuLy8gZnVuY3Rpb24gcHJlcGFyZVNpZ251cChpRnJhbWUpe1xuLy8gXHRcdHZhciBmb3JtXHQgPSBqUXVlcnkoJzxmb3JtIC8+JyksXG4vLyBcdFx0XHRcdGFjdGlvbiA9IGlGcmFtZS5jb250ZW50cygpLmZpbmQoJ2Zvcm0nKS5hdHRyKCdhY3Rpb24nKTtcbi8vXG4vLyBcdFx0Ly8gQWx0ZXIgYWN0aW9uIGZvciBhIE1haWwgQ2hpbXAtY29tcGF0aWJsZSBhamF4IHJlcXVlc3QgdXJsLlxuLy8gXHRcdGlmKC9saXN0LW1hbmFnZVxcLmNvbS8udGVzdChhY3Rpb24pKXtcbi8vICAgICAgIGFjdGlvbiA9IGFjdGlvbi5yZXBsYWNlKCcvcG9zdD8nLCAnL3Bvc3QtanNvbj8nKSArIFwiJmM9P1wiO1xuLy8gICAgICAgICBpZihhY3Rpb24uc3Vic3RyKDAsMikgPT0gXCIvL1wiKXtcbi8vICAgICAgICAgICBhY3Rpb24gPSAnaHR0cDonICsgYWN0aW9uO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vL1xuLy8gICAgICAgLy8gQWx0ZXIgYWN0aW9uIGZvciBhIENhbXBhaWduIE1vbml0b3ItY29tcGF0aWJsZSBhamF4IHJlcXVlc3QgdXJsLlxuLy8gICAgICAgaWYoL2NyZWF0ZXNlbmRcXC5jb20vLnRlc3QoYWN0aW9uKSl7XG4vLyAgICAgICAgIGFjdGlvbiA9IGFjdGlvbiArICc/Y2FsbGJhY2s9Pyc7XG4vLyAgICAgICAgIH1cbi8vXG4vL1xuLy8gXHRcdC8vIFNldCBhY3Rpb24gb24gdGhlIGZvcm1cbi8vIFx0XHRmb3JtLmF0dHIoJ2FjdGlvbicsIGFjdGlvbik7XG4vL1xuLy8gXHRcdC8vIENsb25lIGZvcm0gaW5wdXQgZmllbGRzIGZyb21cbi8vIFx0XHRpRnJhbWUuY29udGVudHMoKS5maW5kKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpLm5vdCgnaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScpLmVhY2goZnVuY3Rpb24oKXtcbi8vIFx0XHRcdFx0JCh0aGlzKS5jbG9uZSgpLmFwcGVuZFRvKGZvcm0pO1xuLy9cbi8vIFx0XHR9KTtcbi8vXG4vLyBcdFx0cmV0dXJuIGZvcm07XG4vL1xuLy9cbi8vIH1cblxuXG5cbi8qXFxcbnwqfFx0Q09PS0lFIExJQlJBUlkgVEhBTktTIFRPIE1ETlxufCp8XG58KnxcdEEgY29tcGxldGUgY29va2llcyByZWFkZXIvd3JpdGVyIGZyYW1ld29yayB3aXRoIGZ1bGwgdW5pY29kZSBzdXBwb3J0LlxufCp8XG58KnxcdFJldmlzaW9uICMxIC0gU2VwdGVtYmVyIDQsIDIwMTRcbnwqfFxufCp8XHRodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvZG9jdW1lbnQuY29va2llXG58KnxcdGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL1VzZXI6ZnVzaW9uY2hlc3NcbnwqfFxufCp8XHRUaGlzIGZyYW1ld29yayBpcyByZWxlYXNlZCB1bmRlciB0aGUgR05VIFB1YmxpYyBMaWNlbnNlLCB2ZXJzaW9uIDMgb3IgbGF0ZXIuXG58KnxcdGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9ncGwtMy4wLXN0YW5kYWxvbmUuaHRtbFxufCp8XG58KnxcdFN5bnRheGVzOlxufCp8XG58KnxcdCogbXJfY29va2llcy5zZXRJdGVtKG5hbWUsIHZhbHVlWywgZW5kWywgcGF0aFssIGRvbWFpblssIHNlY3VyZV1dXV0pXG58KnxcdCogbXJfY29va2llcy5nZXRJdGVtKG5hbWUpXG58KnxcdCogbXJfY29va2llcy5yZW1vdmVJdGVtKG5hbWVbLCBwYXRoWywgZG9tYWluXV0pXG58KnxcdCogbXJfY29va2llcy5oYXNJdGVtKG5hbWUpXG58KnxcdCogbXJfY29va2llcy5rZXlzKClcbnwqfFxuXFwqL1xuXG4vLyB2YXIgbXJfY29va2llcyA9IHtcbi8vIFx0Z2V0SXRlbTogZnVuY3Rpb24gKHNLZXkpIHtcbi8vIFx0XHRpZiAoIXNLZXkpIHsgcmV0dXJuIG51bGw7IH1cbi8vIFx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoPzooPzpefC4qOylcXFxccypcIiArIGVuY29kZVVSSUNvbXBvbmVudChzS2V5KS5yZXBsYWNlKC9bXFwtXFwuXFwrXFwqXS9nLCBcIlxcXFwkJlwiKSArIFwiXFxcXHMqXFxcXD1cXFxccyooW147XSopLiokKXxeLiokXCIpLCBcIiQxXCIpKSB8fCBudWxsO1xuLy8gXHR9LFxuLy8gXHRzZXRJdGVtOiBmdW5jdGlvbiAoc0tleSwgc1ZhbHVlLCB2RW5kLCBzUGF0aCwgc0RvbWFpbiwgYlNlY3VyZSkge1xuLy8gXHRcdGlmICghc0tleSB8fCAvXig/OmV4cGlyZXN8bWF4XFwtYWdlfHBhdGh8ZG9tYWlufHNlY3VyZSkkL2kudGVzdChzS2V5KSkgeyByZXR1cm4gZmFsc2U7IH1cbi8vIFx0XHR2YXIgc0V4cGlyZXMgPSBcIlwiO1xuLy8gXHRcdGlmICh2RW5kKSB7XG4vLyBcdFx0XHRzd2l0Y2ggKHZFbmQuY29uc3RydWN0b3IpIHtcbi8vIFx0XHRcdFx0Y2FzZSBOdW1iZXI6XG4vLyBcdFx0XHRcdFx0c0V4cGlyZXMgPSB2RW5kID09PSBJbmZpbml0eSA/IFwiOyBleHBpcmVzPUZyaSwgMzEgRGVjIDk5OTkgMjM6NTk6NTkgR01UXCIgOiBcIjsgbWF4LWFnZT1cIiArIHZFbmQ7XG4vLyBcdFx0XHRcdFx0YnJlYWs7XG4vLyBcdFx0XHRcdGNhc2UgU3RyaW5nOlxuLy8gXHRcdFx0XHRcdHNFeHBpcmVzID0gXCI7IGV4cGlyZXM9XCIgKyB2RW5kO1xuLy8gXHRcdFx0XHRcdGJyZWFrO1xuLy8gXHRcdFx0XHRjYXNlIERhdGU6XG4vLyBcdFx0XHRcdFx0c0V4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIHZFbmQudG9VVENTdHJpbmcoKTtcbi8vIFx0XHRcdFx0XHRicmVhaztcbi8vIFx0XHRcdH1cbi8vIFx0XHR9XG4vLyBcdFx0ZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoc1ZhbHVlKSArIHNFeHBpcmVzICsgKHNEb21haW4gPyBcIjsgZG9tYWluPVwiICsgc0RvbWFpbiA6IFwiXCIpICsgKHNQYXRoID8gXCI7IHBhdGg9XCIgKyBzUGF0aCA6IFwiXCIpICsgKGJTZWN1cmUgPyBcIjsgc2VjdXJlXCIgOiBcIlwiKTtcbi8vIFx0XHRyZXR1cm4gdHJ1ZTtcbi8vIFx0fSxcbi8vIFx0cmVtb3ZlSXRlbTogZnVuY3Rpb24gKHNLZXksIHNQYXRoLCBzRG9tYWluKSB7XG4vLyBcdFx0aWYgKCF0aGlzLmhhc0l0ZW0oc0tleSkpIHsgcmV0dXJuIGZhbHNlOyB9XG4vLyBcdFx0ZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpICsgXCI9OyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UXCIgKyAoc0RvbWFpbiA/IFwiOyBkb21haW49XCIgKyBzRG9tYWluIDogXCJcIikgKyAoc1BhdGggPyBcIjsgcGF0aD1cIiArIHNQYXRoIDogXCJcIik7XG4vLyBcdFx0cmV0dXJuIHRydWU7XG4vLyBcdH0sXG4vLyBcdGhhc0l0ZW06IGZ1bmN0aW9uIChzS2V5KSB7XG4vLyBcdFx0aWYgKCFzS2V5KSB7IHJldHVybiBmYWxzZTsgfVxuLy8gXHRcdHJldHVybiAobmV3IFJlZ0V4cChcIig/Ol58O1xcXFxzKilcIiArIGVuY29kZVVSSUNvbXBvbmVudChzS2V5KS5yZXBsYWNlKC9bXFwtXFwuXFwrXFwqXS9nLCBcIlxcXFwkJlwiKSArIFwiXFxcXHMqXFxcXD1cIikpLnRlc3QoZG9jdW1lbnQuY29va2llKTtcbi8vIFx0fSxcbi8vIFx0a2V5czogZnVuY3Rpb24gKCkge1xuLy8gXHRcdHZhciBhS2V5cyA9IGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKC8oKD86XnxcXHMqOylbXlxcPV0rKSg/PTt8JCl8Xlxccyp8XFxzKig/OlxcPVteO10qKT8oPzpcXDF8JCkvZywgXCJcIikuc3BsaXQoL1xccyooPzpcXD1bXjtdKik/O1xccyovKTtcbi8vIFx0XHRmb3IgKHZhciBuTGVuID0gYUtleXMubGVuZ3RoLCBuSWR4ID0gMDsgbklkeCA8IG5MZW47IG5JZHgrKykgeyBhS2V5c1tuSWR4XSA9IGRlY29kZVVSSUNvbXBvbmVudChhS2V5c1tuSWR4XSk7IH1cbi8vIFx0XHRyZXR1cm4gYUtleXM7XG4vLyBcdH1cbi8vIH07XG5cbi8qXFxcbnwqfFx0RU5EIENPT0tJRSBMSUJSQVJZXG5cXCovXG4iLCJhbmd1bGFyLm1vZHVsZSgncG9ydGZvbGlvJylcblxuICAuY29udHJvbGxlcignRW1haWxDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkdGltZW91dCwgZW1haWwsIEVOVikge1xuICAgICRzY29wZS5zdWNjZXNzZnVsID0gZmFsc2U7XG4gICAgJHNjb3BlLnNlbmRFbWFpbCA9IGZ1bmN0aW9uKGZvcm0pIHtcbiAgICAgIGVtYWlsLm1hbmRyaWxsKEVOVi5BUElLRVksIEVOVi5NWUVNQUlMLCBmb3JtLmVtYWlsLCBmb3JtLm1lc3NhZ2UsIGZvcm0uc3ViamVjdCwgZm9ybS5uYW1lKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICRzY29wZS5zdWNjZXNzZnVsID0gdHJ1ZTtcbiAgICAgICAgICBjb25zb2xlLmxvZygncmVzcG9uc2UnLCByZXNwb25zZSk7XG5cbiAgICAgICAgICAkc2NvcGUucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgICAkdGltZW91dChjbGVhciwgMzAwMClcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yJywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgJHNjb3BlLnN1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICAgICRzY29wZS5mb3JtLm5hbWUgPSAnJztcbiAgICB9XG4gIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ3BvcnRmb2xpbycpXG4gIC5zZXJ2aWNlKCdlbWFpbCcsIFsnJGh0dHAnLCAnRU5WJywgZnVuY3Rpb24oJGh0dHAsIEVOVikge1xuICAgIHRoaXMubWFuZHJpbGwgPSBmdW5jdGlvbiAoa2V5LCB0bywgZnJvbSwgbWVzc2FnZSwgc3ViamVjdCwgbmFtZSkge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICdrZXknOiBrZXksXG4gICAgICAgICdtZXNzYWdlJzoge1xuICAgICAgICAgICdmcm9tLWVtYWlsJzogZnJvbSxcbiAgICAgICAgICAndG8nOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICdlbWFpbCc6IHRvLFxuICAgICAgICAgICAgICAndG8nOiAndG8nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICAnYXV0b3RleHQnOiB0cnVlLFxuICAgICAgICAgICdzdWJqZWN0JzogbmFtZSArIFwiIC0gXCIgKyBzdWJqZWN0LFxuICAgICAgICAgICdodG1sJzogbWVzc2FnZVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuICAkaHR0cC5wb3N0KEVOVi5BUElfVVJMLCBkYXRhKVxuICAgIH1cbiAgfV0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
