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
