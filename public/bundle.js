'use strict';
angular.module('portfolio', ['ui.router'])
  .constant('ENV', {
    API_URL: 'https://mandrillapp.com/api/1.0/messages/send.json',
    APIKEY: 'Zt9VJPNzZOrqVhOrUH3-Uw',
    SENDGRID_URL: 'url',
    MYEMAIL: 'benhalverson@me.com'
  })
  .config(function($stateProvider, $urlRouteProvider) {
    $urlRouteProvider.otherwise('/');

    $stateProvider
      .state('home',
      { url: '/',
        controller: 'EmailController',
        templateUrl: 'templates/home.html'
      })
      .state('/portfolio',
      { url: '/portfolio',
        templateUrl: 'templates/portfolio.html'});
  });

var mr_firstSectionHeight,
    mr_nav,
    mr_navOuterHeight,
    mr_navScrolled = false,
    mr_navFixed = false,
    mr_outOfSight = false,
    mr_floatingProjectSections,
    mr_scrollTop = 0;
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

    $('.accordion li').click(function() {
        if ($(this).closest('.accordion').hasClass('one-open')) {
            $(this).closest('.accordion').find('li').removeClass('active');
            $(this).addClass('active');
        } else {
            $(this).toggleClass('active');
        }
        if(typeof window.mr_parallax !== "undefined"){
            setTimeout(mr_parallax.windowLoad, 500);
        }
    });

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

    // Youtube Videos

    $('section').closest('body').find('.player').each(function() {
        var section = $(this).closest('section');
        section.find('.container').addClass('fadeOut');
        var src = $(this).attr('data-video-id');
        var startat = $(this).attr('data-start-at');
        $(this).attr('data-property', "{videoURL:'http://youtu.be/" + src + "',containment:'self',autoPlay:true, mute:true, startAt:" + startat + ", opacity:1, showControls:false}");
    });

	if($('.player').length){
        $('.player').each(function(){

            var section = $(this).closest('section');
            var player = section.find('.player');
            player.YTPlayer();
            player.on("YTPStart",function(e){
                section.find('.container').removeClass('fadeOut');
                section.find('.masonry-loader').addClass('fadeOut');
            });

        });
    }

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


    // Get referrer from URL string
    if (getURLParameter("ref")) {
        $('form.form-email').append('<input type="text" name="referrer" class="hidden" value="' + getURLParameter("ref") + '"/>');
    }

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    // Disable parallax on mobile

    if ((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        $('section').removeClass('parallax');
    }

    // Disqus Comments

    if($('.disqus-comments').length){
		/* * * CONFIGURATION VARIABLES * * */
		var disqus_shortname = $('.disqus-comments').attr('data-shortname');

		/* * * DON'T EDIT BELOW THIS LINE * * */
		(function() {
			var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
			dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
		})();
    }

    // Load Google MAP API JS with callback to initialise when fully loaded
    if(document.querySelector('[data-maps-api-key]') && !document.querySelector('.gMapsAPI')){
        if($('[data-maps-api-key]').length){
            var script = document.createElement('script');
            var apiKey = $('[data-maps-api-key]:first').attr('data-maps-api-key');
            script.type = 'text/javascript';
            script.src = 'https://maps.googleapis.com/maps/api/js?key='+apiKey+'&callback=initializeMaps';
            script.className = 'gMapsAPI';
            document.body.appendChild(script);
        }
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

function updateNav() {

    var scrollY = mr_scrollTop;

    if (scrollY <= 0) {
        if (mr_navFixed) {
            mr_navFixed = false;
            mr_nav.removeClass('fixed');
        }
        if (mr_outOfSight) {
            mr_outOfSight = false;
            mr_nav.removeClass('outOfSight');
        }
        if (mr_navScrolled) {
            mr_navScrolled = false;
            mr_nav.removeClass('scrolled');
        }
        return;
    }

    if (scrollY > mr_firstSectionHeight) {
        if (!mr_navScrolled) {
            mr_nav.addClass('scrolled');
            mr_navScrolled = true;
            return;
        }
    } else {
        if (scrollY > mr_navOuterHeight) {
            if (!mr_navFixed) {
                mr_nav.addClass('fixed');
                mr_navFixed = true;
            }

            if (scrollY > mr_navOuterHeight * 2) {
                if (!mr_outOfSight) {
                    mr_nav.addClass('outOfSight');
                    mr_outOfSight = true;
                }
            } else {
                if (mr_outOfSight) {
                    mr_outOfSight = false;
                    mr_nav.removeClass('outOfSight');
                }
            }
        } else {
            if (mr_navFixed) {
                mr_navFixed = false;
                mr_nav.removeClass('fixed');
            }
            if (mr_outOfSight) {
                mr_outOfSight = false;
                mr_nav.removeClass('outOfSight');
            }
        }

        if (mr_navScrolled) {
            mr_navScrolled = false;
            mr_nav.removeClass('scrolled');
        }

    }
}

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

window.initializeMaps = function(){
    if(typeof google !== "undefined"){
        if(typeof google.maps !== "undefined"){
            $('.map-canvas[data-maps-api-key]').each(function(){
                    var mapInstance   = this,
                        mapJSON       = typeof $(this).attr('data-map-style') !== "undefined" ? $(this).attr('data-map-style'): false,
                        mapStyle      = JSON.parse(mapJSON) || [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],
                        zoomLevel     = (typeof $(this).attr('data-map-zoom') !== "undefined" && $(this).attr('data-map-zoom') !== "") ? $(this).attr('data-map-zoom') * 1: 17,
                        latlong       = typeof $(this).attr('data-latlong') != "undefined" ? $(this).attr('data-latlong') : false,
                        latitude      = latlong ? 1 *latlong.substr(0, latlong.indexOf(',')) : false,
                        longitude     = latlong ? 1 * latlong.substr(latlong.indexOf(",") + 1) : false,
                        geocoder      = new google.maps.Geocoder(),
                        address       = typeof $(this).attr('data-address') !== "undefined" ? $(this).attr('data-address').split(';'): false,
                        markerTitle   = "We Are Here",
                        isDraggable = $(document).width() > 766 ? true : false,
                        map, marker, markerImage,
                        mapOptions = {
                            draggable: isDraggable,
                            scrollwheel: false,
                            zoom: zoomLevel,
                            disableDefaultUI: true,
                            styles: mapStyle
                        };

                    if($(this).attr('data-marker-title') != undefined && $(this).attr('data-marker-title') != "" )
                    {
                        markerTitle = $(this).attr('data-marker-title');
                    }

                    if(address != undefined && address[0] != ""){
                            geocoder.geocode( { 'address': address[0].replace('[nomarker]','')}, function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                var map = new google.maps.Map(mapInstance, mapOptions);
                                map.setCenter(results[0].geometry.location);

                                address.forEach(function(address){
                                    var markerGeoCoder;

                                    markerImage = {url: window.mr_variant == undefined ? 'img/mapmarker.png' : '../img/mapmarker.png', size: new google.maps.Size(50,50), scaledSize: new google.maps.Size(50,50)};
                                    if(/(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)/.test(address) ){
                                        var latlong = address.split(','),
                                        marker = new google.maps.Marker({
                                                        position: { lat: 1*latlong[0], lng: 1*latlong[1] },
                                                        map: map,
                                                        icon: markerImage,
                                                        title: markerTitle,
                                                        optimised: false
                                                    });
                                    }
                                    else if(address.indexOf('[nomarker]') < 0){
                                        markerGeoCoder = new google.maps.Geocoder();
                                        markerGeoCoder.geocode( { 'address': address.replace('[nomarker]','')}, function(results, status) {
                                            if (status == google.maps.GeocoderStatus.OK) {
                                                marker = new google.maps.Marker({
                                                    map: map,
                                                    icon: markerImage,
                                                    title: markerTitle,
                                                    position: results[0].geometry.location,
                                                    optimised: false
                                                });
                                            }
                                        });
                                    }

                                });
                            } else {
                                console.log('There was a problem geocoding the address.');
                            }
                        });
                    }
                    else if(latitude != undefined && latitude != "" && latitude != false && longitude != undefined && longitude != "" && longitude != false ){
                        mapOptions.center   = { lat: latitude, lng: longitude};
                        map = new google.maps.Map(mapInstance, mapOptions);
                        marker              = new google.maps.Marker({
                                                    position: { lat: latitude, lng: longitude },
                                                    map: map,
                                                    icon: markerImage,
                                                    title: markerTitle
                                                });

                    }

                });
        }
    }
}
initializeMaps();

// End of Maps




// Prepare Signup Form - It is used to retrieve form details from an iframe Mail Chimp or Campaign Monitor form.

function prepareSignup(iFrame){
    var form   = jQuery('<form />'),
        action = iFrame.contents().find('form').attr('action');

    // Alter action for a Mail Chimp-compatible ajax request url.
    if(/list-manage\.com/.test(action)){
       action = action.replace('/post?', '/post-json?') + "&c=?";
       if(action.substr(0,2) == "//"){
           action = 'http:' + action;
       }
    }

    // Alter action for a Campaign Monitor-compatible ajax request url.
    if(/createsend\.com/.test(action)){
       action = action + '?callback=?';
    }


    // Set action on the form
    form.attr('action', action);

    // Clone form input fields from
    iFrame.contents().find('input, select, textarea').not('input[type="submit"]').each(function(){
        $(this).clone().appendTo(form);

    });

    return form;


}



/*\
|*|  COOKIE LIBRARY THANKS TO MDN
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  Revision #1 - September 4, 2014
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|  https://developer.mozilla.org/User:fusionchess
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * mr_cookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * mr_cookies.getItem(name)
|*|  * mr_cookies.removeItem(name[, path[, domain]])
|*|  * mr_cookies.hasItem(name)
|*|  * mr_cookies.keys()
|*|
\*/

var mr_cookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};

/*\
|*|  END COOKIE LIBRARY
\*/

angular.module('portfolio', ['email'])

  .controller('EmailController', ['$scope', '$timeout', 'email', function($scope, $timeout, email) {
debugger;
    console.log('controller loaded');
    $scope.successful = false;
    $scope.sendEmail = function(form) {
      console.log('form button clicked');
      email.mandrill('ENV.APIKEY', 'ENV.MYEMAIL', form.email, form.message, form.subject, form.name)
      .then(function(data) {
        $scope.successful = true;
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
  },]);

angular.module('portfolio', [])
  .factory('email', ['$http', function($http) {

    function mailgun(key, to, from, message) {
      //do stuff
    }

    function mandrill(key, to, from, message, subject, name) {
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
      }
      return $http.post('ENV.API_URL', data);
      console.log('factory data', data);
    }

    function sendgrid(user, key, to, from, message, subject) {
      return $http.jsonp('ENV.SENDGRID_URL');
    }
  }]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2FwcC5qcyIsImpzL3NjcmlwdHMuanMiLCJqcy9jb250cm9sbGVycy9FbWFpbENvbnRyb2xsZXIuanMiLCJqcy9zZXJ2aWNlcy9lbWFpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDandCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5hbmd1bGFyLm1vZHVsZSgncG9ydGZvbGlvJywgWyd1aS5yb3V0ZXInXSlcbiAgLmNvbnN0YW50KCdFTlYnLCB7XG4gICAgQVBJX1VSTDogJ2h0dHBzOi8vbWFuZHJpbGxhcHAuY29tL2FwaS8xLjAvbWVzc2FnZXMvc2VuZC5qc29uJyxcbiAgICBBUElLRVk6ICdadDlWSlBOelpPcnFWaE9yVUgzLVV3JyxcbiAgICBTRU5ER1JJRF9VUkw6ICd1cmwnLFxuICAgIE1ZRU1BSUw6ICdiZW5oYWx2ZXJzb25AbWUuY29tJ1xuICB9KVxuICAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVQcm92aWRlcikge1xuICAgICR1cmxSb3V0ZVByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgIC5zdGF0ZSgnaG9tZScsXG4gICAgICB7IHVybDogJy8nLFxuICAgICAgICBjb250cm9sbGVyOiAnRW1haWxDb250cm9sbGVyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvaG9tZS5odG1sJ1xuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnL3BvcnRmb2xpbycsXG4gICAgICB7IHVybDogJy9wb3J0Zm9saW8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9wb3J0Zm9saW8uaHRtbCd9KTtcbiAgfSk7XG4iLCJ2YXIgbXJfZmlyc3RTZWN0aW9uSGVpZ2h0LFxuICAgIG1yX25hdixcbiAgICBtcl9uYXZPdXRlckhlaWdodCxcbiAgICBtcl9uYXZTY3JvbGxlZCA9IGZhbHNlLFxuICAgIG1yX25hdkZpeGVkID0gZmFsc2UsXG4gICAgbXJfb3V0T2ZTaWdodCA9IGZhbHNlLFxuICAgIG1yX2Zsb2F0aW5nUHJvamVjdFNlY3Rpb25zLFxuICAgIG1yX3Njcm9sbFRvcCA9IDA7XG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIE9mZnNjcmVlbiBOYXZcblxuICAgIGlmKCQoJy5vZmZzY3JlZW4tdG9nZ2xlJykubGVuZ3RoKXtcbiAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaGFzLW9mZnNjcmVlbi1uYXYnKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdoYXMtb2Zmc2NyZWVuLW5hdicpO1xuICAgIH1cblxuICAgICQoJy5vZmZzY3JlZW4tdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICQoJy5tYWluLWNvbnRhaW5lcicpLnRvZ2dsZUNsYXNzKCdyZXZlYWwtbmF2Jyk7XG4gICAgXHQkKCduYXYnKS50b2dnbGVDbGFzcygncmV2ZWFsLW5hdicpO1xuICAgIFx0JCgnLm9mZnNjcmVlbi1jb250YWluZXInKS50b2dnbGVDbGFzcygncmV2ZWFsLW5hdicpO1xuICAgIH0pO1xuXG4gICAgJCgnLm1haW4tY29udGFpbmVyJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICBcdGlmKCQodGhpcykuaGFzQ2xhc3MoJ3JldmVhbC1uYXYnKSl7XG4gICAgXHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ3JldmVhbC1uYXYnKTtcbiAgICBcdFx0JCgnLm9mZnNjcmVlbi1jb250YWluZXInKS5yZW1vdmVDbGFzcygncmV2ZWFsLW5hdicpO1xuICAgIFx0XHQkKCduYXYnKS5yZW1vdmVDbGFzcygncmV2ZWFsLW5hdicpO1xuICAgIFx0fVxuICAgIH0pO1xuXG4gICAgJCgnLm9mZnNjcmVlbi1jb250YWluZXIgYScpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgXHQkKCcub2Zmc2NyZWVuLWNvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdyZXZlYWwtbmF2Jyk7XG4gICAgXHQkKCcubWFpbi1jb250YWluZXInKS5yZW1vdmVDbGFzcygncmV2ZWFsLW5hdicpO1xuICAgIFx0JCgnbmF2JykucmVtb3ZlQ2xhc3MoJ3JldmVhbC1uYXYnKTtcbiAgICB9KTtcblxuICAgIC8vIFBvcHVsYXRlIGZpbHRlcnNcblxuICAgICQoJy5wcm9qZWN0cycpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIGZpbHRlcnMgPSBcIlwiO1xuXG4gICAgICAgICQodGhpcykuZmluZCgnLnByb2plY3QnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICB2YXIgZmlsdGVyVGFncyA9ICQodGhpcykuYXR0cignZGF0YS1maWx0ZXInKS5zcGxpdCgnLCcpO1xuXG4gICAgICAgICAgICBmaWx0ZXJUYWdzLmZvckVhY2goZnVuY3Rpb24odGFnTmFtZSkge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJzLmluZGV4T2YodGFnTmFtZSkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVycyArPSAnPGxpIGRhdGEtZmlsdGVyPVwiJyArIHRhZ05hbWUgKyAnXCI+JyArIGNhcGl0YWxpc2VGaXJzdExldHRlcih0YWdOYW1lKSArICc8L2xpPic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5wcm9qZWN0cycpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ3VsLmZpbHRlcnMnKS5lbXB0eSgpLmFwcGVuZCgnPGxpIGRhdGEtZmlsdGVyPVwiYWxsXCIgY2xhc3M9XCJhY3RpdmVcIj5BbGw8L2xpPicpLmFwcGVuZChmaWx0ZXJzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKCcuZmlsdGVycyBsaScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsdGVyID0gJCh0aGlzKS5hdHRyKCdkYXRhLWZpbHRlcicpO1xuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5maWx0ZXJzJykuZmluZCgnbGknKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLnByb2plY3RzJykuZmluZCgnLnByb2plY3QnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGZpbHRlcnMgPSAkKHRoaXMpLmRhdGEoJ2ZpbHRlcicpO1xuXG4gICAgICAgICAgICBpZiAoZmlsdGVycy5pbmRleE9mKGZpbHRlcikgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZmlsdGVyID09ICdhbGwnKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5wcm9qZWN0cycpLmZpbmQoJy5wcm9qZWN0JykucmVtb3ZlQ2xhc3MoJ2luYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLy8gQXBwZW5kIC5iYWNrZ3JvdW5kLWltYWdlLWhvbGRlciA8aW1nPidzIGFzIENTUyBiYWNrZ3JvdW5kc1xuXG4gICAgJCgnLmJhY2tncm91bmQtaW1hZ2UtaG9sZGVyJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGltZ1NyYyA9ICQodGhpcykuY2hpbGRyZW4oJ2ltZycpLmF0dHIoJ3NyYycpO1xuICAgICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZCcsICd1cmwoXCInICsgaW1nU3JjICsgJ1wiKScpO1xuICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCdpbWcnKS5oaWRlKCk7XG4gICAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLXBvc2l0aW9uJywgJ2luaXRpYWwnKTtcbiAgICB9KTtcblxuICAgIC8vIEZhZGUgaW4gYmFja2dyb3VuZCBpbWFnZXNcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5iYWNrZ3JvdW5kLWltYWdlLWhvbGRlcicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmYWRlSW4nKTtcbiAgICAgICAgfSk7XG4gICAgfSwgMjAwKTtcblxuXG4gICAgLy8gQXV0b3Nob3cgbW9kYWxzXG5cblx0JCgnLmZvdW5kcnlfbW9kYWxbZGF0YS10aW1lLWRlbGF5XScpLmVhY2goZnVuY3Rpb24oKXtcblx0XHR2YXIgbW9kYWwgPSAkKHRoaXMpO1xuXHRcdHZhciBkZWxheSA9IG1vZGFsLmF0dHIoJ2RhdGEtdGltZS1kZWxheScpO1xuXHRcdG1vZGFsLnByZXBlbmQoJCgnPGkgY2xhc3M9XCJ0aS1jbG9zZSBjbG9zZS1tb2RhbFwiPicpKTtcbiAgICBcdGlmKHR5cGVvZiBtb2RhbC5hdHRyKCdkYXRhLWNvb2tpZScpICE9IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICBcdGlmKCFtcl9jb29raWVzLmhhc0l0ZW0obW9kYWwuYXR0cignZGF0YS1jb29raWUnKSkpe1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgXHRcdFx0bW9kYWwuYWRkQ2xhc3MoJ3JldmVhbC1tb2RhbCcpO1xuICAgICAgICBcdFx0XHQkKCcubW9kYWwtc2NyZWVuJykuYWRkQ2xhc3MoJ3JldmVhbC1tb2RhbCcpO1xuICAgICAgICBcdFx0fSxkZWxheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIG1vZGFsLmFkZENsYXNzKCdyZXZlYWwtbW9kYWwnKTtcbiAgICAgICAgICAgICAgICAkKCcubW9kYWwtc2NyZWVuJykuYWRkQ2xhc3MoJ3JldmVhbC1tb2RhbCcpO1xuICAgICAgICAgICAgfSxkZWxheSk7XG4gICAgICAgIH1cblx0fSk7XG5cbiAgICAvLyBBdXRvY2xvc2UgbW9kYWxzXG5cbiAgICAkKCcuZm91bmRyeV9tb2RhbFtkYXRhLWhpZGUtYWZ0ZXJdJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgbW9kYWwgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgZGVsYXkgPSBtb2RhbC5hdHRyKCdkYXRhLWhpZGUtYWZ0ZXInKTtcbiAgICAgICAgaWYodHlwZW9mIG1vZGFsLmF0dHIoJ2RhdGEtY29va2llJykgIT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgICAgICBpZighbXJfY29va2llcy5oYXNJdGVtKG1vZGFsLmF0dHIoJ2RhdGEtY29va2llJykpKXtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYoIW1vZGFsLmhhc0NsYXNzKCdtb2RhbC1hY2tub3dsZWRnZWQnKSl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGFsLnJlbW92ZUNsYXNzKCdyZXZlYWwtbW9kYWwnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLm1vZGFsLXNjcmVlbicpLnJlbW92ZUNsYXNzKCdyZXZlYWwtbW9kYWwnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxkZWxheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGlmKCFtb2RhbC5oYXNDbGFzcygnbW9kYWwtYWNrbm93bGVkZ2VkJykpe1xuICAgICAgICAgICAgICAgICAgICBtb2RhbC5yZW1vdmVDbGFzcygncmV2ZWFsLW1vZGFsJyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5tb2RhbC1zY3JlZW4nKS5yZW1vdmVDbGFzcygncmV2ZWFsLW1vZGFsJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxkZWxheSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGpRdWVyeSgnLmNsb3NlLW1vZGFsOm5vdCgubW9kYWwtc3RyaXAgLmNsb3NlLW1vZGFsKScpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbigpe1xuICAgIFx0dmFyIG1vZGFsID0galF1ZXJ5KHRoaXMpLmNsb3Nlc3QoJy5mb3VuZHJ5X21vZGFsJyk7XG4gICAgICAgIG1vZGFsLnRvZ2dsZUNsYXNzKCdyZXZlYWwtbW9kYWwnKTtcbiAgICAgICAgaWYodHlwZW9mIG1vZGFsLmF0dHIoJ2RhdGEtY29va2llJykgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICAgICAgbXJfY29va2llcy5zZXRJdGVtKG1vZGFsLmF0dHIoJ2RhdGEtY29va2llJyksIFwidHJ1ZVwiLCBJbmZpbml0eSk7XG4gICAgICAgIH1cbiAgICBcdGlmKG1vZGFsLmZpbmQoJ2lmcmFtZScpLmxlbmd0aCl7XG4gICAgICAgICAgICBtb2RhbC5maW5kKCdpZnJhbWUnKS5hdHRyKCdzcmMnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgalF1ZXJ5KCcubW9kYWwtc2NyZWVuJykucmVtb3ZlQ2xhc3MoJ3JldmVhbC1tb2RhbCcpO1xuICAgIH0pO1xuXG4gICAgalF1ZXJ5KCcubW9kYWwtc2NyZWVuJykudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKGpRdWVyeSgnLmZvdW5kcnlfbW9kYWwucmV2ZWFsLW1vZGFsJykuZmluZCgnaWZyYW1lJykubGVuZ3RoKXtcbiAgICAgICAgICAgIGpRdWVyeSgnLmZvdW5kcnlfbW9kYWwucmV2ZWFsLW1vZGFsJykuZmluZCgnaWZyYW1lJykuYXR0cignc3JjJywgJycpO1xuICAgICAgICB9XG4gICAgXHRqUXVlcnkoJy5mb3VuZHJ5X21vZGFsLnJldmVhbC1tb2RhbCcpLnRvZ2dsZUNsYXNzKCdyZXZlYWwtbW9kYWwnKTtcbiAgICBcdGpRdWVyeSh0aGlzKS50b2dnbGVDbGFzcygncmV2ZWFsLW1vZGFsJyk7XG4gICAgfSk7XG5cbiAgICBqUXVlcnkoZG9jdW1lbnQpLmtleXVwKGZ1bmN0aW9uKGUpIHtcblx0XHQgaWYgKGUua2V5Q29kZSA9PSAyNykgeyAvLyBlc2NhcGUga2V5IG1hcHMgdG8ga2V5Y29kZSBgMjdgXG4gICAgICAgICAgICBpZihqUXVlcnkoJy5mb3VuZHJ5X21vZGFsJykuZmluZCgnaWZyYW1lJykubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBqUXVlcnkoJy5mb3VuZHJ5X21vZGFsJykuZmluZCgnaWZyYW1lJykuYXR0cignc3JjJywgJycpO1xuICAgICAgICAgICAgfVxuXHRcdFx0alF1ZXJ5KCcuZm91bmRyeV9tb2RhbCcpLnJlbW92ZUNsYXNzKCdyZXZlYWwtbW9kYWwnKTtcblx0XHRcdGpRdWVyeSgnLm1vZGFsLXNjcmVlbicpLnJlbW92ZUNsYXNzKCdyZXZlYWwtbW9kYWwnKTtcblx0XHR9XG5cdH0pO1xuXG4gICAgLy8gTW9kYWwgU3RyaXBzXG5cbiAgICBqUXVlcnkoJy5tb2RhbC1zdHJpcCcpLmVhY2goZnVuY3Rpb24oKXtcbiAgICBcdGlmKCFqUXVlcnkodGhpcykuZmluZCgnLmNsb3NlLW1vZGFsJykubGVuZ3RoKXtcbiAgICBcdFx0alF1ZXJ5KHRoaXMpLmFwcGVuZChqUXVlcnkoJzxpIGNsYXNzPVwidGktY2xvc2UgY2xvc2UtbW9kYWxcIj4nKSk7XG4gICAgXHR9XG4gICAgXHR2YXIgbW9kYWwgPSBqUXVlcnkodGhpcyk7XG5cbiAgICAgICAgaWYodHlwZW9mIG1vZGFsLmF0dHIoJ2RhdGEtY29va2llJykgIT0gXCJ1bmRlZmluZWRcIil7XG5cbiAgICAgICAgICAgIGlmKCFtcl9jb29raWVzLmhhc0l0ZW0obW9kYWwuYXR0cignZGF0YS1jb29raWUnKSkpe1xuICAgICAgICAgICAgXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBcdFx0bW9kYWwuYWRkQ2xhc3MoJ3JldmVhbC1tb2RhbCcpO1xuICAgICAgICAgICAgXHR9LDEwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgbW9kYWwuYWRkQ2xhc3MoJ3JldmVhbC1tb2RhbCcpO1xuICAgICAgICAgICAgfSwxMDAwKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgalF1ZXJ5KCcubW9kYWwtc3RyaXAgLmNsb3NlLW1vZGFsJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIG1vZGFsID0galF1ZXJ5KHRoaXMpLmNsb3Nlc3QoJy5tb2RhbC1zdHJpcCcpO1xuICAgICAgICBpZih0eXBlb2YgbW9kYWwuYXR0cignZGF0YS1jb29raWUnKSAhPSBcInVuZGVmaW5lZFwiKXtcbiAgICAgICAgICAgIG1yX2Nvb2tpZXMuc2V0SXRlbShtb2RhbC5hdHRyKCdkYXRhLWNvb2tpZScpLCBcInRydWVcIiwgSW5maW5pdHkpO1xuICAgICAgICB9XG4gICAgXHRqUXVlcnkodGhpcykuY2xvc2VzdCgnLm1vZGFsLXN0cmlwJykucmVtb3ZlQ2xhc3MoJ3JldmVhbC1tb2RhbCcpO1xuICAgIFx0cmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG5cbiAgICAvLyBWaWRlbyBNb2RhbHNcblxuICAgIGpRdWVyeSgnLmNsb3NlLWlmcmFtZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkodGhpcykuY2xvc2VzdCgnLm1vZGFsLXZpZGVvJykucmVtb3ZlQ2xhc3MoJ3JldmVhbC1tb2RhbCcpO1xuICAgICAgICBqUXVlcnkodGhpcykuc2libGluZ3MoJ2lmcmFtZScpLmF0dHIoJ3NyYycsICcnKTtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnNpYmxpbmdzKCd2aWRlbycpLmdldCgwKS5wYXVzZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gQ2hlY2tib3hlc1xuXG4gICAgJCgnLmNoZWNrYm94LW9wdGlvbicpLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgICB2YXIgY2hlY2tib3ggPSAkKHRoaXMpLmZpbmQoJ2lucHV0Jyk7XG4gICAgICAgIGlmIChjaGVja2JveC5wcm9wKCdjaGVja2VkJykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjaGVja2JveC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVja2JveC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBSYWRpbyBCdXR0b25zXG5cbiAgICAkKCcucmFkaW8tb3B0aW9uJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIGNoZWNrZWQgPSAkKHRoaXMpLmhhc0NsYXNzKCdjaGVja2VkJyk7IC8vIEdldCB0aGUgY3VycmVudCBzdGF0dXMgb2YgdGhlIHJhZGlvXG5cbiAgICAgICAgdmFyIG5hbWUgPSAkKHRoaXMpLmZpbmQoJ2lucHV0JykuYXR0cignbmFtZScpOyAvLyBHZXQgdGhlIG5hbWUgb2YgdGhlIGlucHV0IGNsaWNrZWRcblxuICAgICAgICBpZiAoIWNoZWNrZWQpIHtcblxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cIicrbmFtZSsnXCJdJykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcblxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnY2hlY2tlZCcpO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG5cbiAgICAvLyBBY2NvcmRpb25zXG5cbiAgICAkKCcuYWNjb3JkaW9uIGxpJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmNsb3Nlc3QoJy5hY2NvcmRpb24nKS5oYXNDbGFzcygnb25lLW9wZW4nKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuYWNjb3JkaW9uJykuZmluZCgnbGknKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHR5cGVvZiB3aW5kb3cubXJfcGFyYWxsYXggIT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICAgICAgc2V0VGltZW91dChtcl9wYXJhbGxheC53aW5kb3dMb2FkLCA1MDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBUYWJiZWQgQ29udGVudFxuXG4gICAgJCgnLnRhYmJlZC1jb250ZW50JykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5hcHBlbmQoJzx1bCBjbGFzcz1cImNvbnRlbnRcIj48L3VsPicpO1xuICAgIH0pO1xuXG4gICAgJCgnLnRhYnMgbGknKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3JpZ2luYWxUYWIgPSAkKHRoaXMpLFxuICAgICAgICAgICAgYWN0aXZlQ2xhc3MgPSBcIlwiO1xuICAgICAgICBpZiAob3JpZ2luYWxUYWIuaXMoJy50YWJzPmxpOmZpcnN0LWNoaWxkJykpIHtcbiAgICAgICAgICAgIGFjdGl2ZUNsYXNzID0gJyBjbGFzcz1cImFjdGl2ZVwiJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGFiQ29udGVudCA9IG9yaWdpbmFsVGFiLmZpbmQoJy50YWItY29udGVudCcpLmRldGFjaCgpLndyYXAoJzxsaScgKyBhY3RpdmVDbGFzcyArICc+PC9saT4nKS5wYXJlbnQoKTtcbiAgICAgICAgb3JpZ2luYWxUYWIuY2xvc2VzdCgnLnRhYmJlZC1jb250ZW50JykuZmluZCgnLmNvbnRlbnQnKS5hcHBlbmQodGFiQ29udGVudCk7XG4gICAgfSk7XG5cbiAgICAkKCcudGFicyBsaScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy50YWJzJykuZmluZCgnbGknKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB2YXIgbGlJbmRleCA9ICQodGhpcykuaW5kZXgoKSArIDE7XG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLnRhYmJlZC1jb250ZW50JykuZmluZCgnLmNvbnRlbnQ+bGknKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLnRhYmJlZC1jb250ZW50JykuZmluZCgnLmNvbnRlbnQ+bGk6bnRoLW9mLXR5cGUoJyArIGxpSW5kZXggKyAnKScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcblxuICAgIC8vIExvY2FsIFZpZGVvc1xuXG4gICAgJCgnc2VjdGlvbicpLmNsb3Nlc3QoJ2JvZHknKS5maW5kKCcubG9jYWwtdmlkZW8tY29udGFpbmVyIC5wbGF5LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCcuYmFja2dyb3VuZC1pbWFnZS1ob2xkZXInKS5yZW1vdmVDbGFzcygnZmFkZUluJyk7XG4gICAgICAgICQodGhpcykuc2libGluZ3MoJy5iYWNrZ3JvdW5kLWltYWdlLWhvbGRlcicpLmNzcygnei1pbmRleCcsIC0xKTtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ29wYWNpdHknLCAwKTtcbiAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygndmlkZW8nKS5nZXQoMCkucGxheSgpO1xuICAgIH0pO1xuXG4gICAgLy8gWW91dHViZSBWaWRlb3NcblxuICAgICQoJ3NlY3Rpb24nKS5jbG9zZXN0KCdib2R5JykuZmluZCgnLnBsYXllcicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWN0aW9uID0gJCh0aGlzKS5jbG9zZXN0KCdzZWN0aW9uJyk7XG4gICAgICAgIHNlY3Rpb24uZmluZCgnLmNvbnRhaW5lcicpLmFkZENsYXNzKCdmYWRlT3V0Jyk7XG4gICAgICAgIHZhciBzcmMgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdmlkZW8taWQnKTtcbiAgICAgICAgdmFyIHN0YXJ0YXQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtc3RhcnQtYXQnKTtcbiAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLXByb3BlcnR5JywgXCJ7dmlkZW9VUkw6J2h0dHA6Ly95b3V0dS5iZS9cIiArIHNyYyArIFwiJyxjb250YWlubWVudDonc2VsZicsYXV0b1BsYXk6dHJ1ZSwgbXV0ZTp0cnVlLCBzdGFydEF0OlwiICsgc3RhcnRhdCArIFwiLCBvcGFjaXR5OjEsIHNob3dDb250cm9sczpmYWxzZX1cIik7XG4gICAgfSk7XG5cblx0aWYoJCgnLnBsYXllcicpLmxlbmd0aCl7XG4gICAgICAgICQoJy5wbGF5ZXInKS5lYWNoKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHZhciBzZWN0aW9uID0gJCh0aGlzKS5jbG9zZXN0KCdzZWN0aW9uJyk7XG4gICAgICAgICAgICB2YXIgcGxheWVyID0gc2VjdGlvbi5maW5kKCcucGxheWVyJyk7XG4gICAgICAgICAgICBwbGF5ZXIuWVRQbGF5ZXIoKTtcbiAgICAgICAgICAgIHBsYXllci5vbihcIllUUFN0YXJ0XCIsZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgc2VjdGlvbi5maW5kKCcuY29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ2ZhZGVPdXQnKTtcbiAgICAgICAgICAgICAgICBzZWN0aW9uLmZpbmQoJy5tYXNvbnJ5LWxvYWRlcicpLmFkZENsYXNzKCdmYWRlT3V0Jyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBJbnRlcmFjdCB3aXRoIE1hcCBvbmNlIHRoZSB1c2VyIGhhcyBjbGlja2VkICh0byBwcmV2ZW50IHNjcm9sbGluZyB0aGUgcGFnZSA9IHpvb21pbmcgdGhlIG1hcFxuXG4gICAgJCgnLm1hcC1ob2xkZXInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaW50ZXJhY3QnKTtcbiAgICB9KTtcblxuICAgIGlmKCQoJy5tYXAtaG9sZGVyJykubGVuZ3RoKXtcbiAgICBcdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoJCgnLm1hcC1ob2xkZXIuaW50ZXJhY3QnKS5sZW5ndGgpIHtcblx0XHRcdFx0JCgnLm1hcC1ob2xkZXIuaW50ZXJhY3QnKS5yZW1vdmVDbGFzcygnaW50ZXJhY3QnKTtcblx0XHRcdH1cblx0XHR9KTtcbiAgICB9XG5cbiAgICAvLyBDb3VudGRvd24gVGltZXJzXG5cbiAgICBpZiAoJCgnLmNvdW50ZG93bicpLmxlbmd0aCkge1xuICAgICAgICAkKCcuY291bnRkb3duJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gJCh0aGlzKS5hdHRyKCdkYXRhLWRhdGUnKTtcbiAgICAgICAgICAgICQodGhpcykuY291bnRkb3duKGRhdGUsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS50ZXh0KFxuICAgICAgICAgICAgICAgICAgICBldmVudC5zdHJmdGltZSgnJUQgZGF5cyAlSDolTTolUycpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8vIEdldCByZWZlcnJlciBmcm9tIFVSTCBzdHJpbmdcbiAgICBpZiAoZ2V0VVJMUGFyYW1ldGVyKFwicmVmXCIpKSB7XG4gICAgICAgICQoJ2Zvcm0uZm9ybS1lbWFpbCcpLmFwcGVuZCgnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInJlZmVycmVyXCIgY2xhc3M9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyBnZXRVUkxQYXJhbWV0ZXIoXCJyZWZcIikgKyAnXCIvPicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVSTFBhcmFtZXRlcihuYW1lKSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoKG5ldyBSZWdFeHAoJ1s/fCZdJyArIG5hbWUgKyAnPScgKyAnKFteJjtdKz8pKCZ8I3w7fCQpJykuZXhlYyhsb2NhdGlvbi5zZWFyY2gpIHx8IFssIFwiXCJdKVsxXS5yZXBsYWNlKC9cXCsvZywgJyUyMCcpKSB8fCBudWxsO1xuICAgIH1cblxuICAgIC8vIERpc2FibGUgcGFyYWxsYXggb24gbW9iaWxlXG5cbiAgICBpZiAoKC9BbmRyb2lkfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxXaW5kb3dzIFBob25lL2kpLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvdy5vcGVyYSkpIHtcbiAgICAgICAgJCgnc2VjdGlvbicpLnJlbW92ZUNsYXNzKCdwYXJhbGxheCcpO1xuICAgIH1cblxuICAgIC8vIERpc3F1cyBDb21tZW50c1xuXG4gICAgaWYoJCgnLmRpc3F1cy1jb21tZW50cycpLmxlbmd0aCl7XG5cdFx0LyogKiAqIENPTkZJR1VSQVRJT04gVkFSSUFCTEVTICogKiAqL1xuXHRcdHZhciBkaXNxdXNfc2hvcnRuYW1lID0gJCgnLmRpc3F1cy1jb21tZW50cycpLmF0dHIoJ2RhdGEtc2hvcnRuYW1lJyk7XG5cblx0XHQvKiAqICogRE9OJ1QgRURJVCBCRUxPVyBUSElTIExJTkUgKiAqICovXG5cdFx0KGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGRzcSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpOyBkc3EudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnOyBkc3EuYXN5bmMgPSB0cnVlO1xuXHRcdFx0ZHNxLnNyYyA9ICcvLycgKyBkaXNxdXNfc2hvcnRuYW1lICsgJy5kaXNxdXMuY29tL2VtYmVkLmpzJztcblx0XHRcdChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0pLmFwcGVuZENoaWxkKGRzcSk7XG5cdFx0fSkoKTtcbiAgICB9XG5cbiAgICAvLyBMb2FkIEdvb2dsZSBNQVAgQVBJIEpTIHdpdGggY2FsbGJhY2sgdG8gaW5pdGlhbGlzZSB3aGVuIGZ1bGx5IGxvYWRlZFxuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW1hcHMtYXBpLWtleV0nKSAmJiAhZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdNYXBzQVBJJykpe1xuICAgICAgICBpZigkKCdbZGF0YS1tYXBzLWFwaS1rZXldJykubGVuZ3RoKXtcbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgIHZhciBhcGlLZXkgPSAkKCdbZGF0YS1tYXBzLWFwaS1rZXldOmZpcnN0JykuYXR0cignZGF0YS1tYXBzLWFwaS1rZXknKTtcbiAgICAgICAgICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgICAgICAgICBzY3JpcHQuc3JjID0gJ2h0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9qcz9rZXk9JythcGlLZXkrJyZjYWxsYmFjaz1pbml0aWFsaXplTWFwcyc7XG4gICAgICAgICAgICBzY3JpcHQuY2xhc3NOYW1lID0gJ2dNYXBzQVBJJztcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfVxuICAgIH1cblxufSk7XG5cbiQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBNYXNvbnJ5XG5cbiAgICBpZiAoJCgnLm1hc29ucnknKS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXNvbnJ5Jyk7XG4gICAgICAgIHZhciBtc25yeSA9IG5ldyBNYXNvbnJ5KGNvbnRhaW5lciwge1xuICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLm1hc29ucnktaXRlbSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbXNucnkub24oJ2xheW91dENvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIG1yX2ZpcnN0U2VjdGlvbkhlaWdodCA9ICQoJy5tYWluLWNvbnRhaW5lciBzZWN0aW9uOm50aC1vZi10eXBlKDEpJykub3V0ZXJIZWlnaHQodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIEZpeCBmbG9hdGluZyBwcm9qZWN0IGZpbHRlcnMgdG8gYm90dG9tIG9mIHByb2plY3RzIGNvbnRhaW5lclxuXG4gICAgICAgICAgICBpZiAoJCgnLmZpbHRlcnMuZmxvYXRpbmcnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzZXR1cEZsb2F0aW5nUHJvamVjdEZpbHRlcnMoKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVGbG9hdGluZ0ZpbHRlcnMoKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB1cGRhdGVGbG9hdGluZ0ZpbHRlcnMsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnLm1hc29ucnknKS5hZGRDbGFzcygnZmFkZUluJyk7XG4gICAgICAgICAgICAkKCcubWFzb25yeS1sb2FkZXInKS5hZGRDbGFzcygnZmFkZU91dCcpO1xuICAgICAgICAgICAgaWYgKCQoJy5tYXNvbnJ5Rmx5SW4nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBtYXNvbnJ5Rmx5SW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbXNucnkubGF5b3V0KCk7XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSB0d2l0dGVyIGZlZWRcblxuICAgIHZhciBzZXRVcFR3ZWV0cyA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCgnLnR3ZWV0cy1zbGlkZXInKS5maW5kKCdsaS5mbGV4LWFjdGl2ZS1zbGlkZScpLmxlbmd0aCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzZXRVcFR3ZWV0cyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoJCgnLnR3ZWV0cy1zbGlkZXInKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKCcudHdlZXRzLXNsaWRlcicpLmZsZXhzbGlkZXIoe1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25OYXY6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sTmF2OiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgNTAwKTtcblxuICAgIG1yX2ZpcnN0U2VjdGlvbkhlaWdodCA9ICQoJy5tYWluLWNvbnRhaW5lciBzZWN0aW9uOm50aC1vZi10eXBlKDEpJykub3V0ZXJIZWlnaHQodHJ1ZSk7XG5cblxufSk7XG5cbmZ1bmN0aW9uIHVwZGF0ZU5hdigpIHtcblxuICAgIHZhciBzY3JvbGxZID0gbXJfc2Nyb2xsVG9wO1xuXG4gICAgaWYgKHNjcm9sbFkgPD0gMCkge1xuICAgICAgICBpZiAobXJfbmF2Rml4ZWQpIHtcbiAgICAgICAgICAgIG1yX25hdkZpeGVkID0gZmFsc2U7XG4gICAgICAgICAgICBtcl9uYXYucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1yX291dE9mU2lnaHQpIHtcbiAgICAgICAgICAgIG1yX291dE9mU2lnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgIG1yX25hdi5yZW1vdmVDbGFzcygnb3V0T2ZTaWdodCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtcl9uYXZTY3JvbGxlZCkge1xuICAgICAgICAgICAgbXJfbmF2U2Nyb2xsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIG1yX25hdi5yZW1vdmVDbGFzcygnc2Nyb2xsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHNjcm9sbFkgPiBtcl9maXJzdFNlY3Rpb25IZWlnaHQpIHtcbiAgICAgICAgaWYgKCFtcl9uYXZTY3JvbGxlZCkge1xuICAgICAgICAgICAgbXJfbmF2LmFkZENsYXNzKCdzY3JvbGxlZCcpO1xuICAgICAgICAgICAgbXJfbmF2U2Nyb2xsZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNjcm9sbFkgPiBtcl9uYXZPdXRlckhlaWdodCkge1xuICAgICAgICAgICAgaWYgKCFtcl9uYXZGaXhlZCkge1xuICAgICAgICAgICAgICAgIG1yX25hdi5hZGRDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICAgICAgICBtcl9uYXZGaXhlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzY3JvbGxZID4gbXJfbmF2T3V0ZXJIZWlnaHQgKiAyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFtcl9vdXRPZlNpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIG1yX25hdi5hZGRDbGFzcygnb3V0T2ZTaWdodCcpO1xuICAgICAgICAgICAgICAgICAgICBtcl9vdXRPZlNpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChtcl9vdXRPZlNpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIG1yX291dE9mU2lnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbXJfbmF2LnJlbW92ZUNsYXNzKCdvdXRPZlNpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG1yX25hdkZpeGVkKSB7XG4gICAgICAgICAgICAgICAgbXJfbmF2Rml4ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBtcl9uYXYucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXJfb3V0T2ZTaWdodCkge1xuICAgICAgICAgICAgICAgIG1yX291dE9mU2lnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBtcl9uYXYucmVtb3ZlQ2xhc3MoJ291dE9mU2lnaHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtcl9uYXZTY3JvbGxlZCkge1xuICAgICAgICAgICAgbXJfbmF2U2Nyb2xsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIG1yX25hdi5yZW1vdmVDbGFzcygnc2Nyb2xsZWQnKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYXBpdGFsaXNlRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcbn1cblxuZnVuY3Rpb24gbWFzb25yeUZseUluKCkge1xuICAgIHZhciAkaXRlbXMgPSAkKCcubWFzb25yeUZseUluIC5tYXNvbnJ5LWl0ZW0nKTtcbiAgICB2YXIgdGltZSA9IDA7XG5cbiAgICAkaXRlbXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygnZmFkZUluJyk7XG4gICAgICAgIH0sIHRpbWUpO1xuICAgICAgICB0aW1lICs9IDE3MDtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0dXBGbG9hdGluZ1Byb2plY3RGaWx0ZXJzKCkge1xuICAgIG1yX2Zsb2F0aW5nUHJvamVjdFNlY3Rpb25zID0gW107XG4gICAgJCgnLmZpbHRlcnMuZmxvYXRpbmcnKS5jbG9zZXN0KCdzZWN0aW9uJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlY3Rpb24gPSAkKHRoaXMpO1xuXG4gICAgICAgIG1yX2Zsb2F0aW5nUHJvamVjdFNlY3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgc2VjdGlvbjogc2VjdGlvbi5nZXQoMCksXG4gICAgICAgICAgICBvdXRlckhlaWdodDogc2VjdGlvbi5vdXRlckhlaWdodCgpLFxuICAgICAgICAgICAgZWxlbVRvcDogc2VjdGlvbi5vZmZzZXQoKS50b3AsXG4gICAgICAgICAgICBlbGVtQm90dG9tOiBzZWN0aW9uLm9mZnNldCgpLnRvcCArIHNlY3Rpb24ub3V0ZXJIZWlnaHQoKSxcbiAgICAgICAgICAgIGZpbHRlcnM6IHNlY3Rpb24uZmluZCgnLmZpbHRlcnMuZmxvYXRpbmcnKSxcbiAgICAgICAgICAgIGZpbGVyc0hlaWdodDogc2VjdGlvbi5maW5kKCcuZmlsdGVycy5mbG9hdGluZycpLm91dGVySGVpZ2h0KHRydWUpXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVGbG9hdGluZ0ZpbHRlcnMoKSB7XG4gICAgdmFyIGwgPSBtcl9mbG9hdGluZ1Byb2plY3RTZWN0aW9ucy5sZW5ndGg7XG4gICAgd2hpbGUgKGwtLSkge1xuICAgICAgICB2YXIgc2VjdGlvbiA9IG1yX2Zsb2F0aW5nUHJvamVjdFNlY3Rpb25zW2xdO1xuXG4gICAgICAgIGlmICgoc2VjdGlvbi5lbGVtVG9wIDwgbXJfc2Nyb2xsVG9wKSAmJiB0eXBlb2Ygd2luZG93Lm1yX3ZhcmlhbnQgPT0gXCJ1bmRlZmluZWRcIiApIHtcbiAgICAgICAgICAgIHNlY3Rpb24uZmlsdGVycy5jc3Moe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgICAgICAgIHRvcDogJzE2cHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChtcl9uYXZTY3JvbGxlZCkge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24uZmlsdGVycy5jc3Moe1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtNTAlLDQ4cHgsMCknXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXJfc2Nyb2xsVG9wID4gKHNlY3Rpb24uZWxlbUJvdHRvbSAtIDcwKSkge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24uZmlsdGVycy5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnMTZweCcsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogJ2F1dG8nXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2VjdGlvbi5maWx0ZXJzLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKC01MCUsMCwwKSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlY3Rpb24uZmlsdGVycy5jc3Moe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKC01MCUsMCwwKSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG53aW5kb3cuaW5pdGlhbGl6ZU1hcHMgPSBmdW5jdGlvbigpe1xuICAgIGlmKHR5cGVvZiBnb29nbGUgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICBpZih0eXBlb2YgZ29vZ2xlLm1hcHMgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICAgICAgJCgnLm1hcC1jYW52YXNbZGF0YS1tYXBzLWFwaS1rZXldJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWFwSW5zdGFuY2UgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBKU09OICAgICAgID0gdHlwZW9mICQodGhpcykuYXR0cignZGF0YS1tYXAtc3R5bGUnKSAhPT0gXCJ1bmRlZmluZWRcIiA/ICQodGhpcykuYXR0cignZGF0YS1tYXAtc3R5bGUnKTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBTdHlsZSAgICAgID0gSlNPTi5wYXJzZShtYXBKU09OKSB8fCBbe1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6LTEwMH0se1wibGlnaHRuZXNzXCI6NjV9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaVwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6LTEwMH0se1wibGlnaHRuZXNzXCI6NTF9LHtcInZpc2liaWxpdHlcIjpcInNpbXBsaWZpZWRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjotMTAwfSx7XCJ2aXNpYmlsaXR5XCI6XCJzaW1wbGlmaWVkXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOi0xMDB9LHtcImxpZ2h0bmVzc1wiOjMwfSx7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmxvY2FsXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjotMTAwfSx7XCJsaWdodG5lc3NcIjo0MH0se1widmlzaWJpbGl0eVwiOlwib25cIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6LTEwMH0se1widmlzaWJpbGl0eVwiOlwic2ltcGxpZmllZFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZS5wcm92aW5jZVwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHNcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib25cIn0se1wibGlnaHRuZXNzXCI6LTI1fSx7XCJzYXR1cmF0aW9uXCI6LTEwMH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJodWVcIjpcIiNmZmZmMDBcIn0se1wibGlnaHRuZXNzXCI6LTI1fSx7XCJzYXR1cmF0aW9uXCI6LTk3fV19XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHpvb21MZXZlbCAgICAgPSAodHlwZW9mICQodGhpcykuYXR0cignZGF0YS1tYXAtem9vbScpICE9PSBcInVuZGVmaW5lZFwiICYmICQodGhpcykuYXR0cignZGF0YS1tYXAtem9vbScpICE9PSBcIlwiKSA/ICQodGhpcykuYXR0cignZGF0YS1tYXAtem9vbScpICogMTogMTcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXRsb25nICAgICAgID0gdHlwZW9mICQodGhpcykuYXR0cignZGF0YS1sYXRsb25nJykgIT0gXCJ1bmRlZmluZWRcIiA/ICQodGhpcykuYXR0cignZGF0YS1sYXRsb25nJykgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdGl0dWRlICAgICAgPSBsYXRsb25nID8gMSAqbGF0bG9uZy5zdWJzdHIoMCwgbGF0bG9uZy5pbmRleE9mKCcsJykpIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25naXR1ZGUgICAgID0gbGF0bG9uZyA/IDEgKiBsYXRsb25nLnN1YnN0cihsYXRsb25nLmluZGV4T2YoXCIsXCIpICsgMSkgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlb2NvZGVyICAgICAgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MgICAgICAgPSB0eXBlb2YgJCh0aGlzKS5hdHRyKCdkYXRhLWFkZHJlc3MnKSAhPT0gXCJ1bmRlZmluZWRcIiA/ICQodGhpcykuYXR0cignZGF0YS1hZGRyZXNzJykuc3BsaXQoJzsnKTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXJUaXRsZSAgID0gXCJXZSBBcmUgSGVyZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNEcmFnZ2FibGUgPSAkKGRvY3VtZW50KS53aWR0aCgpID4gNzY2ID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwLCBtYXJrZXIsIG1hcmtlckltYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IGlzRHJhZ2dhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6b29tOiB6b29tTGV2ZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXM6IG1hcFN0eWxlXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKCQodGhpcykuYXR0cignZGF0YS1tYXJrZXItdGl0bGUnKSAhPSB1bmRlZmluZWQgJiYgJCh0aGlzKS5hdHRyKCdkYXRhLW1hcmtlci10aXRsZScpICE9IFwiXCIgKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXJUaXRsZSA9ICQodGhpcykuYXR0cignZGF0YS1tYXJrZXItdGl0bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGFkZHJlc3MgIT0gdW5kZWZpbmVkICYmIGFkZHJlc3NbMF0gIT0gXCJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VvY29kZXIuZ2VvY29kZSggeyAnYWRkcmVzcyc6IGFkZHJlc3NbMF0ucmVwbGFjZSgnW25vbWFya2VyXScsJycpfSwgZnVuY3Rpb24ocmVzdWx0cywgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMuT0spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwSW5zdGFuY2UsIG1hcE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAuc2V0Q2VudGVyKHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MuZm9yRWFjaChmdW5jdGlvbihhZGRyZXNzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXJrZXJHZW9Db2RlcjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VySW1hZ2UgPSB7dXJsOiB3aW5kb3cubXJfdmFyaWFudCA9PSB1bmRlZmluZWQgPyAnaW1nL21hcG1hcmtlci5wbmcnIDogJy4uL2ltZy9tYXBtYXJrZXIucG5nJywgc2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoNTAsNTApLCBzY2FsZWRTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSg1MCw1MCl9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoLyhcXC0/XFxkKyhcXC5cXGQrKT8pLFxccyooXFwtP1xcZCsoXFwuXFxkKyk/KS8udGVzdChhZGRyZXNzKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYXRsb25nID0gYWRkcmVzcy5zcGxpdCgnLCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogeyBsYXQ6IDEqbGF0bG9uZ1swXSwgbG5nOiAxKmxhdGxvbmdbMV0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IG1hcmtlckltYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogbWFya2VyVGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGltaXNlZDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoYWRkcmVzcy5pbmRleE9mKCdbbm9tYXJrZXJdJykgPCAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXJHZW9Db2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlckdlb0NvZGVyLmdlb2NvZGUoIHsgJ2FkZHJlc3MnOiBhZGRyZXNzLnJlcGxhY2UoJ1tub21hcmtlcl0nLCcnKX0sIGZ1bmN0aW9uKHJlc3VsdHMsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBtYXJrZXJJbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogbWFya2VyVGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW1pc2VkOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVGhlcmUgd2FzIGEgcHJvYmxlbSBnZW9jb2RpbmcgdGhlIGFkZHJlc3MuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihsYXRpdHVkZSAhPSB1bmRlZmluZWQgJiYgbGF0aXR1ZGUgIT0gXCJcIiAmJiBsYXRpdHVkZSAhPSBmYWxzZSAmJiBsb25naXR1ZGUgIT0gdW5kZWZpbmVkICYmIGxvbmdpdHVkZSAhPSBcIlwiICYmIGxvbmdpdHVkZSAhPSBmYWxzZSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwT3B0aW9ucy5jZW50ZXIgICA9IHsgbGF0OiBsYXRpdHVkZSwgbG5nOiBsb25naXR1ZGV9O1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChtYXBJbnN0YW5jZSwgbWFwT3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIgICAgICAgICAgICAgID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHsgbGF0OiBsYXRpdHVkZSwgbG5nOiBsb25naXR1ZGUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBtYXJrZXJJbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogbWFya2VyVGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuaW5pdGlhbGl6ZU1hcHMoKTtcblxuLy8gRW5kIG9mIE1hcHNcblxuXG5cblxuLy8gUHJlcGFyZSBTaWdudXAgRm9ybSAtIEl0IGlzIHVzZWQgdG8gcmV0cmlldmUgZm9ybSBkZXRhaWxzIGZyb20gYW4gaWZyYW1lIE1haWwgQ2hpbXAgb3IgQ2FtcGFpZ24gTW9uaXRvciBmb3JtLlxuXG5mdW5jdGlvbiBwcmVwYXJlU2lnbnVwKGlGcmFtZSl7XG4gICAgdmFyIGZvcm0gICA9IGpRdWVyeSgnPGZvcm0gLz4nKSxcbiAgICAgICAgYWN0aW9uID0gaUZyYW1lLmNvbnRlbnRzKCkuZmluZCgnZm9ybScpLmF0dHIoJ2FjdGlvbicpO1xuXG4gICAgLy8gQWx0ZXIgYWN0aW9uIGZvciBhIE1haWwgQ2hpbXAtY29tcGF0aWJsZSBhamF4IHJlcXVlc3QgdXJsLlxuICAgIGlmKC9saXN0LW1hbmFnZVxcLmNvbS8udGVzdChhY3Rpb24pKXtcbiAgICAgICBhY3Rpb24gPSBhY3Rpb24ucmVwbGFjZSgnL3Bvc3Q/JywgJy9wb3N0LWpzb24/JykgKyBcIiZjPT9cIjtcbiAgICAgICBpZihhY3Rpb24uc3Vic3RyKDAsMikgPT0gXCIvL1wiKXtcbiAgICAgICAgICAgYWN0aW9uID0gJ2h0dHA6JyArIGFjdGlvbjtcbiAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWx0ZXIgYWN0aW9uIGZvciBhIENhbXBhaWduIE1vbml0b3ItY29tcGF0aWJsZSBhamF4IHJlcXVlc3QgdXJsLlxuICAgIGlmKC9jcmVhdGVzZW5kXFwuY29tLy50ZXN0KGFjdGlvbikpe1xuICAgICAgIGFjdGlvbiA9IGFjdGlvbiArICc/Y2FsbGJhY2s9Pyc7XG4gICAgfVxuXG5cbiAgICAvLyBTZXQgYWN0aW9uIG9uIHRoZSBmb3JtXG4gICAgZm9ybS5hdHRyKCdhY3Rpb24nLCBhY3Rpb24pO1xuXG4gICAgLy8gQ2xvbmUgZm9ybSBpbnB1dCBmaWVsZHMgZnJvbVxuICAgIGlGcmFtZS5jb250ZW50cygpLmZpbmQoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJykubm90KCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLmNsb25lKCkuYXBwZW5kVG8oZm9ybSk7XG5cbiAgICB9KTtcblxuICAgIHJldHVybiBmb3JtO1xuXG5cbn1cblxuXG5cbi8qXFxcbnwqfCAgQ09PS0lFIExJQlJBUlkgVEhBTktTIFRPIE1ETlxufCp8XG58KnwgIEEgY29tcGxldGUgY29va2llcyByZWFkZXIvd3JpdGVyIGZyYW1ld29yayB3aXRoIGZ1bGwgdW5pY29kZSBzdXBwb3J0LlxufCp8XG58KnwgIFJldmlzaW9uICMxIC0gU2VwdGVtYmVyIDQsIDIwMTRcbnwqfFxufCp8ICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvZG9jdW1lbnQuY29va2llXG58KnwgIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL1VzZXI6ZnVzaW9uY2hlc3NcbnwqfFxufCp8ICBUaGlzIGZyYW1ld29yayBpcyByZWxlYXNlZCB1bmRlciB0aGUgR05VIFB1YmxpYyBMaWNlbnNlLCB2ZXJzaW9uIDMgb3IgbGF0ZXIuXG58KnwgIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9ncGwtMy4wLXN0YW5kYWxvbmUuaHRtbFxufCp8XG58KnwgIFN5bnRheGVzOlxufCp8XG58KnwgICogbXJfY29va2llcy5zZXRJdGVtKG5hbWUsIHZhbHVlWywgZW5kWywgcGF0aFssIGRvbWFpblssIHNlY3VyZV1dXV0pXG58KnwgICogbXJfY29va2llcy5nZXRJdGVtKG5hbWUpXG58KnwgICogbXJfY29va2llcy5yZW1vdmVJdGVtKG5hbWVbLCBwYXRoWywgZG9tYWluXV0pXG58KnwgICogbXJfY29va2llcy5oYXNJdGVtKG5hbWUpXG58KnwgICogbXJfY29va2llcy5rZXlzKClcbnwqfFxuXFwqL1xuXG52YXIgbXJfY29va2llcyA9IHtcbiAgZ2V0SXRlbTogZnVuY3Rpb24gKHNLZXkpIHtcbiAgICBpZiAoIXNLZXkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoPzooPzpefC4qOylcXFxccypcIiArIGVuY29kZVVSSUNvbXBvbmVudChzS2V5KS5yZXBsYWNlKC9bXFwtXFwuXFwrXFwqXS9nLCBcIlxcXFwkJlwiKSArIFwiXFxcXHMqXFxcXD1cXFxccyooW147XSopLiokKXxeLiokXCIpLCBcIiQxXCIpKSB8fCBudWxsO1xuICB9LFxuICBzZXRJdGVtOiBmdW5jdGlvbiAoc0tleSwgc1ZhbHVlLCB2RW5kLCBzUGF0aCwgc0RvbWFpbiwgYlNlY3VyZSkge1xuICAgIGlmICghc0tleSB8fCAvXig/OmV4cGlyZXN8bWF4XFwtYWdlfHBhdGh8ZG9tYWlufHNlY3VyZSkkL2kudGVzdChzS2V5KSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICB2YXIgc0V4cGlyZXMgPSBcIlwiO1xuICAgIGlmICh2RW5kKSB7XG4gICAgICBzd2l0Y2ggKHZFbmQuY29uc3RydWN0b3IpIHtcbiAgICAgICAgY2FzZSBOdW1iZXI6XG4gICAgICAgICAgc0V4cGlyZXMgPSB2RW5kID09PSBJbmZpbml0eSA/IFwiOyBleHBpcmVzPUZyaSwgMzEgRGVjIDk5OTkgMjM6NTk6NTkgR01UXCIgOiBcIjsgbWF4LWFnZT1cIiArIHZFbmQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgU3RyaW5nOlxuICAgICAgICAgIHNFeHBpcmVzID0gXCI7IGV4cGlyZXM9XCIgKyB2RW5kO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIERhdGU6XG4gICAgICAgICAgc0V4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIHZFbmQudG9VVENTdHJpbmcoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoc1ZhbHVlKSArIHNFeHBpcmVzICsgKHNEb21haW4gPyBcIjsgZG9tYWluPVwiICsgc0RvbWFpbiA6IFwiXCIpICsgKHNQYXRoID8gXCI7IHBhdGg9XCIgKyBzUGF0aCA6IFwiXCIpICsgKGJTZWN1cmUgPyBcIjsgc2VjdXJlXCIgOiBcIlwiKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgcmVtb3ZlSXRlbTogZnVuY3Rpb24gKHNLZXksIHNQYXRoLCBzRG9tYWluKSB7XG4gICAgaWYgKCF0aGlzLmhhc0l0ZW0oc0tleSkpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpICsgXCI9OyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UXCIgKyAoc0RvbWFpbiA/IFwiOyBkb21haW49XCIgKyBzRG9tYWluIDogXCJcIikgKyAoc1BhdGggPyBcIjsgcGF0aD1cIiArIHNQYXRoIDogXCJcIik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIGhhc0l0ZW06IGZ1bmN0aW9uIChzS2V5KSB7XG4gICAgaWYgKCFzS2V5KSB7IHJldHVybiBmYWxzZTsgfVxuICAgIHJldHVybiAobmV3IFJlZ0V4cChcIig/Ol58O1xcXFxzKilcIiArIGVuY29kZVVSSUNvbXBvbmVudChzS2V5KS5yZXBsYWNlKC9bXFwtXFwuXFwrXFwqXS9nLCBcIlxcXFwkJlwiKSArIFwiXFxcXHMqXFxcXD1cIikpLnRlc3QoZG9jdW1lbnQuY29va2llKTtcbiAgfSxcbiAga2V5czogZnVuY3Rpb24gKCkge1xuICAgIHZhciBhS2V5cyA9IGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKC8oKD86XnxcXHMqOylbXlxcPV0rKSg/PTt8JCl8Xlxccyp8XFxzKig/OlxcPVteO10qKT8oPzpcXDF8JCkvZywgXCJcIikuc3BsaXQoL1xccyooPzpcXD1bXjtdKik/O1xccyovKTtcbiAgICBmb3IgKHZhciBuTGVuID0gYUtleXMubGVuZ3RoLCBuSWR4ID0gMDsgbklkeCA8IG5MZW47IG5JZHgrKykgeyBhS2V5c1tuSWR4XSA9IGRlY29kZVVSSUNvbXBvbmVudChhS2V5c1tuSWR4XSk7IH1cbiAgICByZXR1cm4gYUtleXM7XG4gIH1cbn07XG5cbi8qXFxcbnwqfCAgRU5EIENPT0tJRSBMSUJSQVJZXG5cXCovXG4iLCJhbmd1bGFyLm1vZHVsZSgncG9ydGZvbGlvJywgWydlbWFpbCddKVxuXG4gIC5jb250cm9sbGVyKCdFbWFpbENvbnRyb2xsZXInLCBbJyRzY29wZScsICckdGltZW91dCcsICdlbWFpbCcsIGZ1bmN0aW9uKCRzY29wZSwgJHRpbWVvdXQsIGVtYWlsKSB7XG5kZWJ1Z2dlcjtcbiAgICBjb25zb2xlLmxvZygnY29udHJvbGxlciBsb2FkZWQnKTtcbiAgICAkc2NvcGUuc3VjY2Vzc2Z1bCA9IGZhbHNlO1xuICAgICRzY29wZS5zZW5kRW1haWwgPSBmdW5jdGlvbihmb3JtKSB7XG4gICAgICBjb25zb2xlLmxvZygnZm9ybSBidXR0b24gY2xpY2tlZCcpO1xuICAgICAgZW1haWwubWFuZHJpbGwoJ0VOVi5BUElLRVknLCAnRU5WLk1ZRU1BSUwnLCBmb3JtLmVtYWlsLCBmb3JtLm1lc3NhZ2UsIGZvcm0uc3ViamVjdCwgZm9ybS5uYW1lKVxuICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAkc2NvcGUuc3VjY2Vzc2Z1bCA9IHRydWU7XG4gICAgICAgICR0aW1lb3V0KGNsZWFyLCAzMDAwKVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcicsIGVycm9yKTtcbiAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgJHNjb3BlLnN1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICAgICRzY29wZS5mb3JtLm5hbWUgPSAnJztcbiAgICB9XG4gIH0sXSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgncG9ydGZvbGlvJywgW10pXG4gIC5mYWN0b3J5KCdlbWFpbCcsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCkge1xuXG4gICAgZnVuY3Rpb24gbWFpbGd1bihrZXksIHRvLCBmcm9tLCBtZXNzYWdlKSB7XG4gICAgICAvL2RvIHN0dWZmXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFuZHJpbGwoa2V5LCB0bywgZnJvbSwgbWVzc2FnZSwgc3ViamVjdCwgbmFtZSkge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICdrZXknOiBrZXksXG4gICAgICAgICdtZXNzYWdlJzoge1xuICAgICAgICAgICdmcm9tLWVtYWlsJzogZnJvbSxcbiAgICAgICAgICAndG8nOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICdlbWFpbCc6IHRvLFxuICAgICAgICAgICAgICAndG8nOiAndG8nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICAnYXV0b3RleHQnOiB0cnVlLFxuICAgICAgICAgICdzdWJqZWN0JzogbmFtZSArIFwiIC0gXCIgKyBzdWJqZWN0LFxuICAgICAgICAgICdodG1sJzogbWVzc2FnZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gJGh0dHAucG9zdCgnRU5WLkFQSV9VUkwnLCBkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKCdmYWN0b3J5IGRhdGEnLCBkYXRhKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZW5kZ3JpZCh1c2VyLCBrZXksIHRvLCBmcm9tLCBtZXNzYWdlLCBzdWJqZWN0KSB7XG4gICAgICByZXR1cm4gJGh0dHAuanNvbnAoJ0VOVi5TRU5ER1JJRF9VUkwnKTtcbiAgICB9XG4gIH1dKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
