(function($){
var $ = jQuery = $;

theme.strings = {
  addressError: "Error looking up that address",
  addressNoResults: "No results for that address",
  addressQueryLimit: "You have exceeded the Google API usage limit. Consider upgrading to a \u003ca href=\"https:\/\/developers.google.com\/maps\/premium\/usage-limits\"\u003ePremium Plan\u003c\/a\u003e.",
  authError: "There was a problem authenticating your Google Maps API Key."
}

theme.icons = {
  left: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
  right: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>',
  close: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
  chevronLeft: '<svg fill="#000000" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M 14.51,6.51 14,6 8,12 14,18 14.51,17.49 9.03,12 Z"></path></svg>',
  chevronRight: '<svg fill="#000000" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M 10,6 9.49,6.51 14.97,12 9.49,17.49 10,18 16,12 Z"></path></svg>',
  tick: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>'
};

theme.Sections = new function(){
  var _ = this;

  _._instances = [];
  _._sections = [];

  _.init = function(){
    $(document).on('shopify:section:load', function(e){
      // load a new section
      var target = _._themeSectionTargetFromShopifySectionTarget(e.target);
      if(target) {
        _.sectionLoad(target);
      }
    }).on('shopify:section:unload', function(e){
      // unload existing section
      var target = _._themeSectionTargetFromShopifySectionTarget(e.target);
      if(target) {
        _.sectionUnload(target);
      }
    });
  }

  // register a type of section
  _.register = function(type, section){
    _._sections.push({ type: type, section: section });
    $('[data-section-type="'+type+'"]').each(function(){
      _.sectionLoad(this);
    });
  }

  // load in a section
  _.sectionLoad = function(target){
    var target = target;
    var section = _._sectionForTarget(target);
    if(section !== false) {
      _._instances.push({
        target: target,
        section: section
      });
      section.onSectionLoad(target);
      $(target).on('shopify:block:select', function(e){
        _._callWith(section, 'onBlockSelect', e.target);
      }).on('shopify:block:deselect', function(e){
        _._callWith(section, 'onBlockDeselect', e.target);
      });
    }
  }

  // unload a section
  _.sectionUnload = function(target){
    var instanceIndex = -1;
    for(var i=0; i<_._instances.length; i++) {
      if(_._instances[i].target == target) {
        instanceIndex = i;
      }
    }
    if(instanceIndex > -1) {
      $(target).off('shopify:block:select shopify:block:deselect');
      _._callWith(_._instances[instanceIndex].section, 'onSectionUnload', target);
      _._instances.splice(instanceIndex);
    }
  }

  // helpers
  _._callWith = function(object, method, param) {
    if(typeof object[method] === 'function') {
      object[method](param);
    }
  }

  _._themeSectionTargetFromShopifySectionTarget = function(target){
    var $target = $('[data-section-type]:first', target);
    if($target.length > 0) {
      return $target[0];
    } else {
      return false;
    }
  }

  _._sectionForTarget = function(target) {
    var type = $(target).attr('data-section-type');
    for(var i=0; i<_._sections.length; i++) {
      if(_._sections[i].type == type) {
        return _._sections[i].section;
      }
    }
    return false;
  }
}

// A section that contains other sections, e.g. story page
theme.NestedSectionsSection = new function(){
  this.onSectionLoad = function(container){
    // load child sections
    $('[data-nested-section-type]', container).each(function(){
      var type = $(this).attr('data-nested-section-type');
      var section = null;
      for(var i=0; i<theme.Sections._sections.length; i++) {
        if(theme.Sections._sections[i].type == type) {
          section = theme.Sections._sections[i].section;
        }
      }
      if(section) {
        theme.Sections._instances.push({
          target: this,
          section: section
        });
        section.onSectionLoad(this);
      }
    });
  }

  this.onSectionUnload = function(container){
    // unload child sections
    $('[data-nested-section-type]', container).each(function(){
      theme.Sections.sectionUnload(this);
    });
  }

  this.onBlockSelect = function(target){
    // scroll to block
    $(window).scrollTop($(target).offset().top - 100);
  }
}

theme.SlideshowSection = new function(){
  this.onSectionLoad = function(target){
    $('.slideshow', target).each(function(){
      var $slider = $(this);
      $('.slideshow .line-1, .slideshow .line-2, .slideshow .line-3', this).addClass('trans-out');
      $slider.slick({
        fade: true,
        autoplaySpeed: 7000,
        adaptiveHeight: $slider.hasClass('smoothheight'),
        arrows: true,
        dots: false,
        prevArrow: '<button type="button" class="slick-prev">'+theme.icons.chevronLeft+'</button>',
        nextArrow: '<button type="button" class="slick-next">'+theme.icons.chevronRight+'</button>',
        slidesToShow: 1,
        variableWidth: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              fade: false,
              arrows: false,
              dots: true
            }
          }
        ]
      }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        if(currentSlide != nextSlide) {
          $(slick.$slides[nextSlide]).find('.line-1, .line-2, .line-3').addClass('trans-out');
        }
      }).on('afterChange', function(event, slick, currentSlide, misc){
        // transition in text
        var $thisSlide = $(slick.$slides[currentSlide]);
        $thisSlide.siblings().find('.line-1, .line-2, .line-3').addClass('trans-out');
        setTimeout(function(){ $thisSlide.find('.line-1').removeClass('trans-out') }, 0);
        setTimeout(function(){ $thisSlide.find('.line-2').removeClass('trans-out') }, 400);
        setTimeout(function(){ $thisSlide.find('.line-3').removeClass('trans-out') }, 1000);
      });
      $slider.imagesLoaded(function(){
        $slider[0].slick.refresh(); // must call before slickPlay
        // start autoplay after images have loaded
        $slider.filter(':not(.shopify-block-paused)').slick('slickPlay');
        setTimeout(function(){ $('.slideshow .line-1').removeClass('trans-out') }, 500);
        setTimeout(function(){ $('.slideshow .line-2').removeClass('trans-out') }, 900);
        setTimeout(function(){ $('.slideshow .line-3').removeClass('trans-out') }, 1500);
      });
    });
  }

  this.onSectionUnload = function(target){
    $('.slick-slider', target).slick('unslick');
  }

  this.onBlockSelect = function(target){
    $(target).closest('.slick-slider')
      .addClass('shopify-block-paused')
      .slick('slickGoTo', $(target).data('slick-index'))
      .slick('slickPause');
  }

  this.onBlockDeselect = function(target){
    $(target).closest('.slick-slider')
      .removeClass('shopify-block-paused')
      .slick('slickPlay');
  }
}

theme.InstagramSection = new function(){
  this.onSectionLoad = function(target){
    $('.willstagram:not(.willstagram-placeholder)', target).each(function(){
      var user_id = $(this).data('user_id');
      var tag = $(this).data('tag');
      var access_token = $(this).data('access_token');
      var count = $(this).data('count') || 10;
      var $willstagram = $(this);
      var url = '';
      if(typeof user_id != 'undefined') {
        url = 'https://api.instagram.com/v1/users/' + user_id + '/media/recent?count='+count;
      } else if(typeof tag != 'undefined') {
        url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?count='+count;
      }
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: url
        + (typeof access_token == 'undefined'? '' : ('&access_token='+access_token)),
        success: function(res) {
          if(typeof res.data != 'undefined') {
            var $itemContainer = $('<ul class="items">').appendTo($willstagram);
            var limit = Math.min(20, res.data.length);
            for(var i = 0; i < limit; i++) {
              var photo_url = res.data[i].images.low_resolution.url.replace('http:', '');
              var link = res.data[i].link;
              var caption = res.data[i].caption != null ? res.data[i].caption.text : '';
              $itemContainer.append($('<li />').append('<div class="item"><a target="_blank" href="'+link+'"><img src="'+photo_url+'" /></a><div class="desc">'+caption+'</div></div>'));
            }
          } else if(typeof res.meta !== 'undefined' && typeof res.meta.error_message !== 'undefined') {
            $willstagram.append('<div class="willstagram__error">'+res.meta.error_message+'</div>');
          }
        }
      });
      if(typeof $(this).data('account') != 'undefined') {
        var splSel = $(this).data('account').split('|');
        var $account = $(this).closest(splSel[0]).find(splSel[1]);
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: 'https://api.instagram.com/v1/users/self/?access_token='+access_token,
          success: function(res) {
            if(typeof res.data != 'undefined') {
              $('<a>').html('@'+res.data.username).attr({
                href: 'https://www.instagram.com/'+res.data.username,
                target: '_blank'
              }).appendTo($account);
            }
          }
        });
      }
    });
  }
}

theme.ProductTemplateSection = new function(){
  this.onSectionLoad = function(target){
    $('.product-gallery').trigger('initzoom');

    $('.product-form', target).trigger('initproductform');

    // reviews link
    if($('#shopify-product-reviews').length) {
      $(target).on('click', '.themed-product-reviews .spr-badge', function(){
        $('html, body').animate({ scrollTop: $('#shopify-product-reviews').offset().top - 10 }, 1000);
        return false;
      });
    }

    // size chart link
    $(target).on('click', '.size-chart-link', function(){
      $.colorbox({
        inline: true,
        href: '#size-chart-content > .size-chart'
      });
    });

    /// Grid item heights
    $(window).trigger('normheights');
  }

  this.onSectionUnload = function(target){
    $(target).off('click');
  }
}

theme.CollectionListingSection = new function(){
  this.onSectionLoad = function(target){
    /// Grid item heights
    $(window).trigger('normheights');
  }
}

theme.FeaturedCollectionSection = new function(){
  this.onSectionLoad = function(target){
    /// Grid item heights
    $(window).trigger('normheights');
  }
}

theme.FeaturedCollectionsSection = new function(){
  this.onSectionLoad = function(target){
    /// Grid item heights
    $(window).trigger('normheights');
  }
}

theme.MapSection = new function(){
  var _ = this;
  _.config = {
    zoom: 14,
    styles: {
      default: [],
      silver: [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}],
      retro: [{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}],
      dark: [{"elementType":"geometry","stylers":[{"color":"#212121"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#212121"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#757575"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#181818"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#1b1b1b"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#373737"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#3c3c3c"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#3d3d3d"}]}],
      night: [{"elementType":"geometry","stylers":[{"color":"#242f3e"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#746855"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#242f3e"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#263c3f"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#6b9a76"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#38414e"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#212a37"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#9ca5b3"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#746855"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#1f2835"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#f3d19c"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2f3948"}]},{"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#17263c"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#515c6d"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#17263c"}]}],
      aubergine: [{"elementType":"geometry","stylers":[{"color":"#1d2c4d"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#8ec3b9"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#1a3646"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#64779e"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#334e87"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#023e58"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#283d6a"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#6f9ba5"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#023e58"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#3C7680"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#304a7d"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2c6675"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#255763"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#b0d5ce"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#023e58"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#283d6a"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#3a4762"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#0e1626"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#4e6d70"}]}]
    }
  };
  _.apiStatus = null;
  _.mapsToLoad = [];

  this.geolocate = function($map) {
    var deferred = $.Deferred();
    var geocoder = new google.maps.Geocoder();
    var address = $map.data('address-setting');

    geocoder.geocode({ address: address }, function(results, status) {
      if (status !== google.maps.GeocoderStatus.OK) {
        deferred.reject(status);
      }

      deferred.resolve(results);
    });

    return deferred;
  }

  this.createMap = function(container) {
    var $map = $('.map-section__map-container', container);

    return _.geolocate($map)
      .then(
        function(results) {
          var mapOptions = {
            zoom: _.config.zoom,
            styles: _.config.styles[_.style],
            center: results[0].geometry.location,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            disableDefaultUI: true,
            zoomControl: true
          };

          _.map = new google.maps.Map($map[0], mapOptions);
          _.center = _.map.getCenter();

          var marker = new google.maps.Marker({
            map: _.map,
            position: _.center,
            clickable: false
          });

          google.maps.event.addDomListener(window, 'resize', function() {
            google.maps.event.trigger(_.map, 'resize');
            _.map.setCenter(_.center);
          });
        }.bind(this)
      )
      .fail(function() {
        var errorMessage;

        switch (status) {
          case 'ZERO_RESULTS':
            errorMessage = theme.strings.addressNoResults;
            break;
          case 'OVER_QUERY_LIMIT':
            errorMessage = theme.strings.addressQueryLimit;
            break;
          default:
            errorMessage = theme.strings.addressError;
            break;
        }

        // Only show error in the theme editor
        if (Shopify.designMode) {
          var $mapContainer = $map.parents('.map-section');

          $mapContainer.addClass('page-width map-section--load-error');
          $mapContainer
            .find('.map-section__wrapper')
            .html(
              '<div class="errors text-center">' + errorMessage + '</div>'
            );
        }
      });
  }

  this.onSectionLoad = function(target){
    var $container = $(target);
    // Global function called by Google on auth errors
    window.gm_authFailure = function() {
      if (!Shopify.designMode) return;

      theme.$container.addClass('page-width map-section--load-error');
      theme.$container
        .find('.map-section__wrapper')
        .html(
          '<div class="errors text-center">' + theme.strings.authError + '</div>'
        );
    }

    // create maps
    var key = $container.data('api-key');
    _.style = $container.data('map-style');

    if (typeof key !== 'string' || key === '') {
      return;
    }

    if (_.apiStatus === 'loaded') {
      // Check if the script has previously been loaded with this key
      var $script = $('script[src*="' + key + '&"]');
      if ($script.length === 0) {
        $.getScript(
          'https://maps.googleapis.com/maps/api/js?key=' + key
        ).then(function() {
          _.apiStatus = 'loaded';
          _.createMap($container);
        });
      } else {
        _.createMap($container);
      }
    } else {
      _.mapsToLoad.push($container);

      if (_.apiStatus !== 'loading') {
        _.apiStatus = 'loading';
        if (typeof window.google === 'undefined') {
          $.getScript(
            'https://maps.googleapis.com/maps/api/js?key=' + key
          ).then(function() {
            _.apiStatus = 'loaded';
            // API has loaded, load all Map instances in queue
            $.each(_.mapsToLoad, function(index, mapContainer) {
              _.createMap(mapContainer);
            });
          });
        }
      }
    }
  }

  this.onSectionUnload = function(target){
    if (typeof window.google !== 'undefined') {
      google.maps.event.clearListeners(this.map, 'resize');
    }
  }
}

theme.SearchTemplateSection = new function(){
  this.onSectionLoad = function(target){
    /// Grid item heights
    $(window).trigger('normheights');
  }
}

// Loading third party scripts
theme.scriptsLoaded = [];
theme.loadScriptOnce = function(src, callback, beforeRun) {
  if(theme.scriptsLoaded.indexOf(src) < 0) {
    theme.scriptsLoaded.push(src);
    var tag = document.createElement('script');
    tag.src = src;

    if(beforeRun) {
      tag.async = false;
      beforeRun();
    }

    if(typeof callback == 'function') {
      if (tag.readyState) { // IE, incl. IE9
        tag.onreadystatechange = function() {
          if (tag.readyState == "loaded" || tag.readyState == "complete") {
            tag.onreadystatechange = null;
            callback();
          }
        };
      } else {
        tag.onload = function() { // Other browsers
          callback();
        };
      }
    }

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    return true;
  } else {
    if(typeof callback == 'function') {
      callback();
    }
    return false;
  }
}

// Manage videos
theme.VideoManager = new function(){
  var _ = this;

  // Youtube
  _.youtubeVars = {
    incrementor: 0,
    apiReady: false,
    videoData: {},
    toProcessSelector: '.video-container[data-video-type="youtube"]:not(.video--init)'
  };

  _.youtubeApiReady = function() {
    _.youtubeVars.apiReady = true;
    _._loadYoutubeVideos();
  }

  _._loadYoutubeVideos = function(container) {
    if($(_.youtubeVars.toProcessSelector, container).length) {
      if(_.youtubeVars.apiReady) {
        // play those videos
        $(_.youtubeVars.toProcessSelector, container).addClass('video--init').each(function(){
          _.youtubeVars.incrementor++;
          var containerId = 'theme-yt-video-'+_.youtubeVars.incrementor;
          var videoElement = $('<div>').attr('id', containerId).appendTo(this);
          var player = new YT.Player(containerId, {
            height: '390',
            width: '640',
            videoId: $(this).data('video-id'),
            playerVars: {
              iv_load_policy: 3,
              modestbranding: 1,
              autoplay: !!$(this).data('video-autoplay') ? 1 : 0,
              rel: 0,
              showinfo: 0
            },
            events: {
              onReady: _._onYoutubePlayerReady,
              onStateChange: _._onYoutubePlayerStateChange
            }
          });
          _.youtubeVars.videoData[player.h.id] = {
            id: containerId,
            container: this,
            videoElement: videoElement,
            player: player
          };
        });
      } else {
        // load api
        theme.loadScriptOnce('https://www.youtube.com/iframe_api');
      }
    }
  }

  _._onYoutubePlayerReady = function(event) {
    event.target.setPlaybackQuality('hd1080');
  }

  _._onYoutubePlayerStateChange = function(event) {
  }

  _._getYoutubeVideoData = function(event) {
    return _.youtubeVars.videoData[event.target.h.id];
  }

  _._unloadYoutubeVideos = function(container) {
    for(var dataKey in _.youtubeVars.videoData) {
      var data = _.youtubeVars.videoData[dataKey];
      if($(container).find(data.container).length) {
        data.player.destroy();
        delete _.youtubeVars.videoData[dataKey];
        return;
      }
    }
  }

  // Vimeo
  _.vimeoVars = {
    incrementor: 0,
    apiReady: false,
    videoData: {},
    toProcessSelector: '.video-container[data-video-type="vimeo"]:not(.video--init)'
  };

  _.vimeoApiReady = function() {
    _.vimeoVars.apiReady = true;
    _._loadVimeoVideos();
  }

  _._loadVimeoVideos = function(container) {
    if($(_.vimeoVars.toProcessSelector, container).length) {
      if(_.vimeoVars.apiReady) {
        // play those videos
        $(_.vimeoVars.toProcessSelector, container).addClass('video--init').each(function(){
          _.vimeoVars.incrementor++;
          var $this = $(this);
          var containerId = 'theme-vi-video-'+_.vimeoVars.incrementor;
          var videoElement = $('<div>').attr('id', containerId).appendTo(this);
          var autoplay = !!$(this).data('video-autoplay');
          var player = new Vimeo.Player(containerId, {
            id: $(this).data('video-id'),
            width: 640,
            loop: false,
            autoplay: autoplay
          });
          player.ready().then(function(){
            if(player.element && player.element.width && player.element.height) {
              var ratio = parseInt(player.element.height) / parseInt(player.element.width);
              $this.css('padding-bottom', (ratio*100) + '%');
            }
          });
          _.vimeoVars.videoData[containerId] = {
            id: containerId,
            container: this,
            videoElement: videoElement,
            player: player,
            autoPlay: autoplay
          };
        });
      } else {
        // load api
        if(window.define) {
          // workaround for third parties using RequireJS
          theme.loadScriptOnce('https://player.vimeo.com/api/player.js', function(){
            _.vimeoVars.apiReady = true;
            _._loadVimeoVideos();
            window.define = window.tempDefine;
          }, function(){
            window.tempDefine = window.define;
            window.define = null;
          });
        } else {
          theme.loadScriptOnce('https://player.vimeo.com/api/player.js', function(){
            _.vimeoVars.apiReady = true;
            _._loadVimeoVideos();
          });
        }
      }
    }
  }

  _._unloadVimeoVideos = function(container) {
    for(var dataKey in _.vimeoVars.videoData) {
      var data = _.vimeoVars.videoData[dataKey];
      if($(container).find(data.container).length) {
        data.player.unload();
        delete _.vimeoVars.videoData[dataKey];
        return;
      }
    }
  }

  // Compatibility with Sections
  this.onSectionLoad = function(container){
    _._loadYoutubeVideos(container);
    _._loadVimeoVideos(container);

    // play button
    $('.video-container__play', container).on('click', function(evt){
      evt.preventDefault();
      // reveal
      var $cover = $(this).closest('.video-container__cover').addClass('video-container__cover--playing');
      // play
      var id = $cover.next().attr('id');
      if(id.indexOf('theme-yt-video') === 0) {
        _.youtubeVars.videoData[id].player.playVideo();
      } else {
        _.vimeoVars.videoData[id].player.play();
      }
    });
  }

  this.onSectionUnload = function(container){
    $('.video-container__play', container).off('click');
    _._unloadYoutubeVideos(container);
    _._unloadVimeoVideos(container);
  }
}

// Youtube API callback
window.onYouTubeIframeAPIReady = function() {
  theme.VideoManager.youtubeApiReady();
}

theme.TiledImagesSection = new function(){
  this.onSectionLoad = function(target){
    $('.tile-group', target).trigger('render');
  }
  this.onSectionUnload = function(target){
  }
}

theme.HeaderSection = new function(){
  this.onSectionLoad = function(target){
    /// Create mobile navigation
    $('body').append($('#mobile-navigation-template', target).html());

    // set up multi-currency in mobile nav
    if(typeof Currency != 'undefined' && typeof Currency.currentCurrency != 'undefined' && $('#mobile-nav [name=currencies]').length) {
      $('#mobile-nav [name=currencies]').val(Currency.currentCurrency);
    }

    // disabling tabbing on all but first menu
    $('#mobile-nav .sub-nav a, #mobile-nav .sub-nav button').attr('tabindex', '-1');

    // always follow links
    $('.main-nav', target).on('mouseenter', '.nav-item.dropdown', function(){
      // nav hover in
      $(this).children('a').attr('aria-expanded', true);

    }).on('mouseleave', '.nav-item.dropdown', function(){
      // nav hover out
      $(this).children('a').attr('aria-expanded', false);

    }).on('click', '.sub-nav-item.has-dropdown > a', function(){
      // Sub sub nav
      $(this).attr('aria-expanded', !$(this).siblings().is(':visible'));
      $(this).parent().toggleClass('sub-nav-item--expanded', !$(this).siblings().is(':visible'));
      $(this).siblings().slideToggle(250);
      return false;

    }).filter('[data-col-limit]').each(function(){
      // Ensure no columns go over the per-column quota
      var perCol = $(this).data('col-limit');
      if(perCol > 0) {
        $('.nav-item.dropdown.drop-norm > .sub-nav', this).each(function(){
          var $items = $(this).find('.sub-nav-list > .sub-nav-item');
          var cols = Math.ceil($items.length / perCol);
          for(var i=1; i<cols; i++) {
            var $list = $('<ul class="sub-nav-list"/>').append($items.slice(perCol*i)).appendTo(this);
          }
          $(this).addClass('cols-'+cols);
        });
      }
    });

    /// Nav images
    var ios = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/); // have to skip on iOS; it detects dom-change on hover and prevents click
    if (!(ios)) {
      $('.main-nav', target).on('mouseenter loadimg', '.sub-nav.has-img .sub-nav-item-link', function(){
        var $imgCont = $(this).closest('.sub-nav').find('.rep-img').empty();
        if(typeof $(this).data('img') != 'undefined') { $imgCont.append('<img src="'+$(this).data('img')+'+"/>'); }
      });
    } else {
      $('.main-nav .sub-nav.has-img', target).removeClass('has-img').find('.rep-img').remove();
    }

    $(window).trigger('handledockednav');
    $(window).trigger('ensuredropdownposition');

    /// Style any dropdowns
    $('select:not([name=id])', target).selectReplace();

    /// Resize nav when it doesn't fit on one line...
    if($('.main-nav > ul > li', target).length > 1) {
      $(window).on('debouncedresize.resizeNavFont load.resizeNavFont resizenav.resizeNavFont', function(){
        //create invisible clone of nav list with no css tweaks
        var $clone = $('.main-nav > ul', target).clone().addClass('clone').css({ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', left: 0, width: '100%' }).appendTo('.main-nav');
        var $samelineCheckA = $clone.children().first();
        var $samelineCheckB = $clone.children().last();
        var $cloneLinks = $clone.find('.nav-item-link').removeAttr('style');
        var includesLogo = $clone.children('.logo-item').length > 0;
        var sanity = 500;
        var padL = Math.floor(parseInt($($cloneLinks[1]).css('padding-left')));
        var fontSize = Math.floor(parseInt($cloneLinks.first().css('font-size')));
        var setStyles = false;
        var onSameLine;
        if(includesLogo) {
          onSameLine = function(){ return (Math.floor($samelineCheckA.offset().top) + $samelineCheckA.height()) != (Math.floor($samelineCheckB.offset().top) + $samelineCheckB.height()); };
        } else {
          onSameLine = function(){ return $samelineCheckA.offset().top != $samelineCheckB.offset().top; };
        }
        while(onSameLine() && sanity-- > 0) {
          padL = Math.max(0, padL - 0.5);
          fontSize = Math.max(12, fontSize - 0.5);
          $cloneLinks.each(function(index){
            $(this).css( index == 0 ? { fontSize: fontSize } : { paddingLeft: padL, fontSize: fontSize });
          });
          setStyles = true;
        }
        if(!setStyles) {
          padL = '';
          fontSize = '';
        }
        //Shunt data back
        $('.main-nav .nav-item-link', target).each(function(index){
          $(this).css( index == 0 ? { fontSize: fontSize } : { paddingLeft: padL, fontSize: fontSize });
        });
        $clone.remove();
      }).trigger('resizenav');
    }
  }

  this.onSectionUnload = function(target){
    $('.main-nav', this).off('click mouseenter loadimg');
    $('body #mobile-nav').remove();
    $(window).off('.resizeNavFont');
  }
}

theme.BlogTemplateSection = new function(){
  this.onSectionLoad = function(target){
    /// Style any dropdowns
    $('select:not([name=id])', target).selectReplace();

    // Masonry
    $('.use-masonry', target).each(function(){
      var $toMasonry = $(this);
      window.$ = window.jQuery = $; // rebind jQuery
      theme.loadScriptOnce("\/\/cdn.shopify.com\/s\/files\/1\/1176\/6366\/t\/6\/assets\/masonry.pkgd.min.js?v=7830674931535864549", function(){
        $toMasonry.addClass('masonry').masonry({
          itemSelector: '.article',
          visibleStyle:   { opacity: 1, transform: 'translate3d(0,0,0)' },
          hiddenStyle:    { opacity: 0, transform: 'translate3d(0,20px,0)' }
        });
        // hack: needs a second run, may as well do after load
        setTimeout(function(){
          $(window).on('load.blogTemplateMasonry', function(){
            $toMasonry.masonry();
          });
        }, 10);
      });
    });

    // Infinite scroll
    $('.articles.use-infinite-scroll', target).each(function(){
      var $cont = $(this);
      window.$ = window.jQuery = $; // rebind jQuery
      theme.loadScriptOnce("\/\/cdn.shopify.com\/s\/files\/1\/1176\/6366\/t\/6\/assets\/jquery.infinitescroll.min.js?v=8173450031955209906", function(){
        $cont.infinitescroll({
          navSelector  : ".pagination",
          nextSelector : ".pagination .next",
          itemSelector : ".articles .article",
          loading: {
            img         : "\/\/cdn.shopify.com\/s\/files\/1\/1176\/6366\/t\/6\/assets\/loading.gif?v=11567851211075092210",
            msgText     : "Loading more articles...",
            finishedMsg : "No more articles"
          },
          pathParse:function(path,nextPage){
            return path.match(/^(.*page=)[0-9]*(&.*)?$/).splice(1);
          }
        }, function(newElements){
          $cont.find('#infscr-loading').remove(); // for nth-child
          if($cont.hasClass('masonry')) {
            $(newElements).hide().imagesLoaded(function(){
              $(newElements).show();
              $cont.masonry('appended', $(newElements), true);
            });
          }
        });
      });
    });

    /// Check that tags fit in one line
    if($('.page-title.opposing-items .tags', target).length > 0) {
      $(window).on('debouncedresize.checktagswidth load.checktagswidth checktagswidth.checktagswidth', function(){
        var $cont = $('.page-title.opposing-items');
        var $title = $cont.children('.left');
        var $tags = $cont.children('.tags');
        $cont.toggleClass('collapse-tags', $tags.outerWidth(true) > $cont.width() - $title.outerWidth(true));
        if($cont.hasClass('collapse-tags')) {
          if($cont.find('.section-count').length == 0) {
            $tags.before([
              '<a href="#" class="btn section-count">',
              "Show tags",
              ' (', ($tags.children().length - 1) , ')</a>'].join(''));
          }
        } else {
          $cont.find('.section-count').remove();
        }
      }).trigger('checktagswidth');

      $(document).on('click.checktagswidth', '.page-title.opposing-items.collapse-tags .btn.section-count', function(e){
        e.preventDefault();
        $(this).closest('.opposing-items').toggleClass('reveal-tags');
      });
    }
  }

  this.onSectionUnload = function(target){
    $(window).off('.checktagswidth .blogTemplateMasonry');
    $(document).off('.checktagswidth');
  }
}

theme.CollectionTemplateSection = new function(){
  this.onSectionLoad = function(target){
    // Infinite-scroll
    $('.product-list.use-infinite-scroll', target).each(function(){
      var $cont = $(this);
      theme.loadScriptOnce("\/\/cdn.shopify.com\/s\/files\/1\/1176\/6366\/t\/6\/assets\/jquery.infinitescroll.min.js?v=8173450031955209906", function(){
        $cont.infinitescroll({
          navSelector  : ".pagination",
          nextSelector : ".pagination .next",
          itemSelector : ".product-list .product-block",
          loading: {
            img         : "\/\/cdn.shopify.com\/s\/files\/1\/1176\/6366\/t\/6\/assets\/loading.gif?v=11567851211075092210",
            msgText     : "Loading more items...",
            finishedMsg : "No more items"
          },
          pathParse:function(path,nextPage){
            return path.match(/^(.*page=)[0-9]*(&.*)?$/).splice(1);
          }
        }, function(newElements){
          $cont.find('#infscr-loading').remove(); // for nth-child
          $(newElements).imagesLoaded(function(){
            $(window).trigger('normheights');
          });
        });
      });
    });

    // Sort-by
    if($('.sort-by', target).length > 0) {
      queryParams = {};
      if (location.search.length) {
        for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
          aKeyValue = aCouples[i].split('=');
          if (aKeyValue.length > 1) {
            queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
          }
        }
      }
      $('.sort-by', target).each(function(){
        $(this).val($(this).data('default-value')).trigger('change');
      }).on('change', function() {
        queryParams.sort_by = $(this).val();
        location.search = $.param(queryParams).replace(/\+/g, '%20');
      });
    }

    /// Style any dropdowns
    $('select:not([name=id])', target).selectReplace();

    /// Grid item heights
    $(window).trigger('normheights');
  }

  this.onSectionUnload = function(target){
    $('.sort-by', target).off('change');
  }
}

/// Wide images inside rich text content
// To use: add class 'uncontain' to image, or add alt text ending 'fullwidth'
theme.uncontainImages = function(container) {
  // set up
  $('.reading-column [data-fullwidth]:not(.uncontain)', container).addClass('uncontain');
  // event
  if($('.reading-column .uncontain').length > 0) {
    $(window).on('resize.wideimgs load.wideimgs wideimgs.wideimgs', function(){
      var contW = $('#page-wrap-inner').css('border-color') == 'rgb(255, 0, 1)' ? $(window).width() : $('.container:visible:first').width();
      $('.reading-column .uncontain').each(function(){
        var thisContW = $(this).closest('div:not(.uncontain), p:not(.uncontain)').width();
        $(this).css({
          width: contW,
          marginLeft: - (contW - thisContW) / 2.0,
          maxWidth: 'none'
        });
      });
    }).trigger('wideimgs');
  } else {
    $(window).off('.wideimgs');
  }
}

// Manage option dropdowns
theme.productData = {};
theme.OptionManager = new function(){
  var _ = this;

  _._getVariantOptionElement = function(variant, $container) {
    return $container.find('select[name="id"] option[value="' + variant.id + '"]');
  };

  _.selectors = {
    container: '.product-container',
    gallery: '.product-gallery',
    priceArea: '.product-price',
    submitButton: 'input[type=submit], button[type=submit]',
    multiOption: '.option-selectors'
  };

  _.strings = {
    priceNonExistent: "Product unavailable",
    priceSoldOut: '[PRICE]',
    buttonDefault: "Add to cart",
    buttonNoStock: "Out of stock",
    buttonNoVariant: "Product unavailable"
  };

  _._getString = function(key, variant){
    var string = _.strings[key];
    if(variant) {
      string = string.replace('[PRICE]', '<span class="theme-money">' + Shopify.formatMoney(variant.price, theme.money_format) + '</span>');
    }
    return string;
  }

  _.getProductData = function($form) {
    var productId = $form.data('product-id');
    var data = null;
    if(!theme.productData[productId]) {
      theme.productData[productId] = JSON.parse(document.getElementById('ProductJson-' + productId).innerHTML);
    }
    data = theme.productData[productId];
    if(!data) {
      console.log('Product data missing (id: '+$form.data('product-id')+')');
    }
    return data;
  }

  _.addVariantUrlToHistory = function(variant) {
    if(variant) {
      var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
      window.history.replaceState({path: newurl}, '', newurl);
    }
  }

  _.updateSku = function(variant, $container){
    $container.find('.sku .sku__value').html( variant ? variant.sku : '' );
    $container.find('.sku').toggleClass('sku--no-sku', !variant || !variant.sku);
  }

  _.updateBarcode = function(variant, $container){
    $container.find('.barcode .barcode__value').html( variant ? variant.barcode : '' );
    $container.find('.barcode').toggleClass('barcode--no-barcode', !variant || !variant.barcode);
  }

  _.updateBackorder = function(variant, $container){
    var $backorder = $container.find('.backorder');
    if($backorder.length) {
      if (variant && variant.available) {
        if (variant.inventory_management && _._getVariantOptionElement(variant, $container).data('stock') == 'out') {
          var productData = _.getProductData($backorder.closest('form'));
          $backorder.find('.selected-variant').html(productData.title + (variant.title.indexOf('Default') >= 0 ? '' : ' - '+variant.title) );
          $backorder.show();
        } else {
          $backorder.hide();
        }
      } else {
        $backorder.hide();
      }
    }
  }

  _.updatePrice = function(variant, $container) {
    var $priceArea = $container.find(_.selectors.priceArea);
    $priceArea.removeClass('on-sale');

    if(variant && variant.available == true) {
      var $newPriceArea = $('<div>');
      if(variant.compare_at_price > variant.price) {
        $('<span class="was-price theme-money">').html(Shopify.formatMoney(variant.compare_at_price, theme.money_format)).appendTo($newPriceArea);
        $newPriceArea.append(' ');
        $priceArea.addClass('on-sale');
      }
      $('<span class="current-price theme-money">').html(Shopify.formatMoney(variant.price, theme.money_format)).appendTo($newPriceArea);
      $priceArea.html($newPriceArea.html());
    } else {
      if(variant) {
        $priceArea.html(_._getString('priceSoldOut', variant));
      } else {
        $priceArea.html(_._getString('priceNonExistent', variant));
      }
    }
  }

  _._updateButtonText = function($button, string, variant) {
    $button.each(function(){
      var newVal;
      newVal = _._getString('button' + string, variant);
      if(newVal !== false) {
        if($(this).is('input')) {
          $(this).val(newVal);
        } else {
          $(this).html(newVal);
        }
      }
    });
  }

  _.updateButtons = function(variant, $container) {
    var $button = $container.find(_.selectors.submitButton);

    if(variant && variant.available == true) {
      $button.removeAttr('disabled');
      _._updateButtonText($button, 'Default', variant);
    } else {
      $button.attr('disabled', 'disabled');
      if(variant) {
        _._updateButtonText($button, 'NoStock', variant);
      } else {
        _._updateButtonText($button, 'NoVariant', variant);
      }
    }
  }

  _.updateContainerStatusClasses = function(variant, $container) {
    $container.toggleClass('variant-status--unavailable', !variant.available);
    $container.toggleClass('variant-status--backorder', variant.available
      && variant.inventory_management
      && _._getVariantOptionElement(variant, $container).data('stock') == 'out');
  }

  _.initProductOptions = function(originalSelect) {
    $(originalSelect).not('.theme-init').addClass('theme-init').each(function(){
      var $originalSelect = $(this);
      var productData = _.getProductData($originalSelect.closest('form'));

      // change state for original dropdown
      $originalSelect.on('change firstrun', function(e, variant){
        if($(this).is('input[type=radio]:not(:checked)')) {
          return; // handle radios - only update for checked
        }
        var variant = variant;
        if(!variant && variant !== false) {
          for(var i=0; i<productData.variants.length; i++) {
            if(productData.variants[i].id == $(this).val()) {
              variant = productData.variants[i];
            }
          }
        }
        var $container = $(this).closest(_.selectors.container);

        // update price
        _.updatePrice(variant, $container);

        // update buttons
        _.updateButtons(variant, $container);

        // variant images
        if (variant && variant.featured_image) {
          $container.find(_.selectors.gallery).trigger('variantImageSelected', variant);
        }

        // extra details
        _.updateBarcode(variant, $container);
        _.updateSku(variant, $container);
        _.updateBackorder(variant, $container);
        _.updateContainerStatusClasses(variant, $container);

        // variant urls
        var $form = $(this).closest('form');
        if($form.data('enable-history-state') && e.type == 'change') {
          _.addVariantUrlToHistory(variant);
        }

        // multi-currency
        theme.runMultiCurrency();
      });

      // split-options wrapper
      $originalSelect.closest(_.selectors.container).find(_.selectors.multiOption).on('change', 'select', function(){
        var selectedOptions = [];
        $(this).closest(_.selectors.multiOption).find('select').each(function(){
          selectedOptions.push($(this).val());
        });
        // find variant
        var variant = false;
        for(var i=0; i<productData.variants.length; i++) {
          var v = productData.variants[i];
          var matchCount = 0;
          for(var j=0; j<selectedOptions.length; j++) {
            if(v.options[j] == selectedOptions[j]) {
              matchCount++;
            }
          }
          if(matchCount == selectedOptions.length) {
            variant = v;
            break;
          }
        }
        // trigger change
        if(variant) {
          $originalSelect.val(variant.id);
        }
        $originalSelect.trigger('change', variant);
      });

      // first-run
      $originalSelect.trigger('firstrun');
    });
  }
};

/// Cookie management
theme.createCookie = function(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
};
theme.readCookie = function(name) {
    var nameEQ = name + "=";
    try {
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
    } catch(error) {}
    return null;
};
theme.eraseCookie = function(name) {
    theme.createCookie(name,"",-1);
};

theme.runMultiCurrency = function() {
  // multi-currency
  if(typeof Currency != 'undefined' && typeof Currency.convertAll != 'undefined' && $('[name=currencies]').length) {
    Currency.convertAll(shopCurrency, $('[name=currencies]').first().val(), theme.money_container);
    theme.onCurrencyChange();
  }
}

$(function($){

  /// Extensions

  $.fn.replaceImageWithOneOfNewSrc = function(newSrc) {
    //Avoids blank.gif breaking imagesLoaded with Firefox event bug
    var newTag = $(this).clone().wrap('<div />').parent().html();
    newTag = newTag.replace(/(src=")([^"]*)/gi, "$1" + newSrc);
    var $newTag = $(newTag);
    $(this).after($newTag).remove();
    return $newTag;
  };

  function isMobile() {
    return $(window).width() < 768; //blunt check for mobile view
  }

  /// Init product options
  $(document).on('initproductform', '.product-form', function(){
    /// Product options
    theme.OptionManager.initProductOptions($('select[name="id"]'));

    // Product form button-options
    var toMakeClicky = ',' + $(this).find('.option-selectors').data('box-options') + ',';
    var $clickies = $('.selector-wrapper:not(.has-clickyboxes) select', this).filter(function(){
      return toMakeClicky.indexOf(',' +$(this).closest('.selector-wrapper').find('label').html() + ',') >= 0;
    }).clickyBoxes().parent().addClass('has-clickyboxes');

    // If only one variant option, add sold-out states to clicky boxes
    if($clickies.length == 1) {
      var productData = theme.OptionManager.getProductData($(this));

      if(productData.options.length == 1) {
        for(var i=0; i<productData.variants.length; i++) {
          if(!productData.variants[i].available) {
            $('.selector-wrapper.has-clickyboxes .clickyboxes li:eq('+i+') a', this).addClass('unavailable');
          }
        }
      }
    }

    /// Style up select-dropdowns
    $('select:not([name=id])', this).selectReplace().closest('.selector-wrapper').addClass('has-pretty-select');

    /// In lightbox? resize after any content changes
    if($(this).closest('.quickbuy-form').length) {
      $(this).find('select[name=id]').on('change', function(){
        setTimeout(function(){
          $.colorbox.resize();
        }, 10);
      });
    }
  });

  /// Style dropdowns (outside of the product form)
  $('select:not([name=id])').filter(function(){
    $(this).closest('.product-form').length == 0
  }).selectReplace();

  /// Uncontained images
  theme.uncontainImages($('body'));

  /// General lightbox popups
  $('a[rel=lightbox]').colorbox({ minWidth: '200', maxWidth: '96%', maxHeight: '96%' });

  /// Any section load
  $(document).on('shopify:section:load', function(e){

    /// Handle special wide images - available inside any rich text content
    theme.uncontainImages(e.target);

  });


  /// Mobile sub-nav
  var navStack = [];
  $(document).on('click', '#mobile-nav .open-sub-nav', function(){
    // hide current & add to stack
    var $toHide = $('#mobile-nav .inner:not(.hide), #mobile-nav .sub-nav.show:not(.hide)').addClass('hide');
    $toHide.find('a, button').attr('tabindex', '-1');
    navStack.push($toHide);
    // show new
    var $toShow = $('#mobile-nav .sub-nav[data-is-subnav-for="'+$(this).data('sub-nav')+'"]').first().addClass('show');
    $toShow.find('a, button').removeAttr('tabindex');
    $(this).attr('aria-expanded', true);
    return false;
  }).on('click', '#mobile-nav .close-sub-nav', function(){
    // hide current
    $(this).closest('.sub-nav').removeClass('show').find('a, button').attr('tabindex', '-1');
    // reveal last seen & pop off stack
    var $popped = navStack.pop().removeClass('hide');
    $popped.find('a, button').removeAttr('tabindex');
    $popped.find('[aria-expanded="true"]').removeAttr('aria-expanded');
    return false;
  }).on('click', '#mobile-nav a.nav-item-link[href="#"], #mobile-nav a.sub-nav-item-link[href="#"]', function(){
    // #-link opens child nav
    $(this).closest('li').find('button').click();
    return false;
  });


  /// Dropdowns that redirect
  $(document).on('change', 'select.redirect', function(){
    window.location = $(this).val();
  });


  /// Custom share buttons
  $(document).on('click', '.sharing a', function(e){
    var $parent = $(this).parent();
    if($parent.hasClass('twitter')) {
      e.preventDefault();
      var url = $(this).attr('href');
      var width  = 575,
          height = 450,
          left   = ($(window).width()  - width)  / 2,
          top    = ($(window).height() - height) / 2,
          opts   = 'status=1, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0' +
          ',width='  + width  +
          ',height=' + height +
          ',top='    + top    +
          ',left='   + left;
      window.open(url, 'Twitter', opts);

    } else if($parent.hasClass('facebook')) {
      e.preventDefault();
      var url = $(this).attr('href');
      var width  = 626,
          height = 256,
          left   = ($(window).width()  - width)  / 2,
          top    = ($(window).height() - height) / 2,
          opts   = 'status=1, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0' +
          ',width='  + width  +
          ',height=' + height +
          ',top='    + top    +
          ',left='   + left;
      window.open(url, 'Facebook', opts);

    } else if($parent.hasClass('pinterest')) {
      e.preventDefault();
      var url = $(this).attr('href');
      var width  = 700,
          height = 550,
          left   = ($(window).width()  - width)  / 2,
          top    = ($(window).height() - height) / 2,
          opts   = 'status=1, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0' +
          ',width='  + width  +
          ',height=' + height +
          ',top='    + top    +
          ',left='   + left;
      window.open(url, 'Pinterest', opts);

    } else if($parent.hasClass('google')) {
      e.preventDefault();
      var url = $(this).attr('href');
      var width  = 550,
          height = 450,
          left   = ($(window).width()  - width)  / 2,
          top    = ($(window).height() - height) / 2,
          opts   = 'status=1, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0' +
          ',width='  + width  +
          ',height=' + height +
          ',top='    + top    +
          ',left='   + left;
      window.open(url, 'Google+', opts);

    }
  });


  /// Toggle classes

  $(document).on('click', '[data-toggle-class]', function(e){
    e.preventDefault();
    var spl = $(this).data('toggle-class').split('|');
    $(spl[1]).toggleClass(spl[0]);
    $(window).trigger('resize');
  });


  /// Close side-modals

  function sideModTransOutHelper() {
    //Speed up
    $('body').addClass('sidepanel-transitioning');
    setTimeout(function(){
      $('body').removeClass('sidepanel-transitioning');
    }, 510);
  }
  function fixedNavWebkitHack() {
    if($('body').hasClass('show-mobile-nav') || $('body').hasClass('show-cart-summary')) {
      $('.toolbar.docked').css({
        position: 'absolute',
        top: $(window).scrollTop(),
        left: -15,
        right: -15,
        width: 'auto'
      });
    } else {
      setTimeout(function(){
        $('.toolbar.docked').css({
          position: '', top: '', left: '', right: '', width: ''
        });
      }, 500);
    }
  }
  $(document).on('click', '#page-overlay', function(){
    sideModTransOutHelper();
    $('body').removeClass('show-cart-summary show-mobile-nav');
    fixedNavWebkitHack();
    return false;
  });


  /// Toggles for side-modals

  $(document).on('click', '.toggle-mob-nav', function(){
    //prep for reveal
    $('#cart-summary').removeClass('active');
    $('#mobile-nav').addClass('active');
    //toggle
    if(!$('body').toggleClass('show-mobile-nav').hasClass('show-mobile-nav')) {
      sideModTransOutHelper();
      setTimeout(function(){
        $('#mobile-nav').removeAttr('tabindex');
        $('body a:first:visible').focus();
      }, 500);
    } else {
      // move focus to menu container
      setTimeout(function(){
        $('#mobile-nav').attr('tabindex', '0').focus();
      }, 500);
    }
    fixedNavWebkitHack();
    return false;
  });
  
  $(document).on('click', '.toggle-cart-summary', function(){
    //prep for reveal
    $('#mobile-nav').removeClass('active');
    $('#cart-summary').addClass('active');
    //toggle
    if(!$('body').toggleClass('show-cart-summary').hasClass('show-cart-summary')) {
      sideModTransOutHelper();
    }
    fixedNavWebkitHack();
    return false;
  });
  



  // Ensuring sub nav dropdown does not go off the RHS of page
  $(window).on('debouncedresize load ensuredropdownposition', function(){
    setTimeout(function(){
      var pw = $('#page-wrap-inner').width();
      var bw = parseInt($('#page-wrap-inner').css('border-left-width'));
      if(isNaN(bw)) bw = 0;
      $('.main-nav .nav-item.drop-norm .sub-nav').css('transform', '').each(function(){
        $(this).css({ visibility: 'hidden', zIndex: -1 }).css({ display: 'block' });
        var oobr = pw - ($(this).offset().left + $(this).outerWidth() - bw);
        var oobl = $(this).offset().left - bw;
        if(oobr < 0) {
          // off the right
          $(this).css('transform', 'translate('+Math.ceil(oobr-1)+'px)');
        } else if(oobl < 0) {
          // off the left
          $(this).css('transform', 'translate('+Math.ceil(-oobl)+'px)');
        }
        $(this).css({ visibility: '', zIndex: '', display: '' });
      });
    }, 50);
  });

  /// Nav images

  //Preload sub-nav images on show, and load first one
  $(document).on('mouseenter', '.main-nav .nav-item.dropdown', function(){
    $(this).find('.sub-nav-item-link[data-img]').each(function(){
      $('<img/>')[0].src = $(this).data('img');
    }).first().trigger('loadimg');
  });


  /// In-page links

  $(document).on('click', 'a[href^="#"]:not([href="#"])', function(){
    var $target = $($(this).attr('href')).first();
    if($target.length == 1) {
      $('html:not(:animated),body:not(:animated)').animate({
        scrollTop: $target.offset().top
      }, 500 );
    }
    return false;
  });


  /// Revealables (sharing, cart in header, sidebar)

  $(document).on('click', '[data-revealable]', function(){
    $(this).closest($(this).data('revealable')).toggleClass('show');
    $(window).trigger('resize');
    return false;
  });


  /// Show a short-lived text popup above an element
  window.showQuickPopup = function(message, $origin){
    var $popup = $('<div class="simple-popup"/>');
    var offs = $origin.offset();
    $popup.html(message).css({ 'left':offs.left, 'top':offs.top }).hide();
    $('body').append($popup);
    $popup.css({ marginTop: - $popup.outerHeight() - 10, marginLeft: -($popup.outerWidth()-$origin.outerWidth())/2});
    $popup.fadeIn(200).delay(3500).fadeOut(400, function(){
      $(this).remove();
    });
  };


  /// Ajax product forms
  var shopifyAjaxAddURL = '/cart/add.js';
  var shopifyAjaxCartURL = '/cart.js';
  var shopifyAjaxStorePageURL = '/search';

  function updateCartSummaries(showCartSummary) {
    $.get(shopifyAjaxStorePageURL, function(data){
      var selectors = ['.toolbar-cart .current-cart', '#cart-summary'];
      var $parsed = $($.parseHTML('<div>' + data + '</div>'));
      for(var i=0; i<selectors.length; i++) {
        var cartSummarySelector = selectors[i];
        var $newCartObj = $parsed.find(cartSummarySelector).clone();
        var $currCart = $(cartSummarySelector);
        $currCart.replaceWith($newCartObj);
      }
      theme.runMultiCurrency();
      
      //Show cart dropdown, if on a product page
      if(showCartSummary) {
        $('body').addClass('show-cart-summary');
      }
      
    });
  }

  
  $(document).on('submit', 'form[action="/cart/add"]:not(.noAJAX)', function(e) {
    var $form = $(this);
    //Disable add button
    $form.find(':submit').attr('disabled', 'disabled').each(function(){
      var contentFunc = $(this).is('button') ? 'html' : 'val';
      $(this).data('previous-value', $(this)[contentFunc]())[contentFunc]("Adding to cart...");
    });

    //Add to cart
    $.post(shopifyAjaxAddURL, $form.serialize(), function(itemData) {
      theme.createCookie('theme_added_to_cart','justnow',1);

      // Update persistent cart summaries
      if($form.closest('.quickbuy-form').length == 0) {
        // enable add button
        var $btn = $form.find(':submit').each(function(){
          var $btn = $(this);
          var contentFunc = $(this).is('button') ? 'html' : 'val';
          //Set to 'DONE', alter button style, wait a few secs, revert to normal
          $btn[contentFunc]("Added");
          setTimeout(function(){
            $btn.removeAttr('disabled')[contentFunc]($btn.data('previous-value'));
          }, 4000);
        }).first();

        // update and reveal sidebar
        updateCartSummaries(true);
      } else {
        // transition out form
        var itemData = itemData;
        // get full product data
        if(!theme.productData[itemData.product_id]) {
          theme.productData[itemData.product_id] = JSON.parse(document.getElementById('ProductJson-' + itemData.product_id).innerHTML);
        }
        var productPrice = '';
        for(var i=0; i<theme.productData[itemData.product_id].variants.length; i++) {
          var variant = theme.productData[itemData.product_id].variants[i];
          if(variant.id == itemData.variant_id) {
            if(variant.compare_at_price && variant.compare_at_price > variant.price) {
              productPrice += [
                '<span class="added-notice__price-compare theme-money">',
                Shopify.formatMoney(variant.compare_at_price, theme.money_format),
                '</span> ',
                '<span class="added-notice__price-reduced theme-money">',
                Shopify.formatMoney(itemData.price, theme.money_format),
                '</span>'
              ].join('');
            } else {
              productPrice += '<span class="theme-money">' + Shopify.formatMoney(itemData.price, theme.money_format) + '</span>';
            }
          }
        }
        var productVariants = '';
        if(itemData.variant_options.length > 0) {
          // get option names from full product data
          var optionNames = theme.productData[itemData.product_id].options;
          productVariants = '<div class="added-notice__product__variants">';
          for(var i=0; i<itemData.variant_options.length; i++) {
            if(itemData.variant_options[i].indexOf('Default Title') < 0) {
              productVariants += '<div class="added-notice__variant">';
              productVariants += '<span class="added-notice__variant-label">' + optionNames[i] + ':</span> ';
              productVariants += '<span class="added-notice__variant-value">' + itemData.variant_options[i] + '</span>';
              productVariants += '</div>';
            }
          }
          productVariants += '</div>';
        }
        $form.closest('.quickbuy-form').animate({ opacity: 0 }, 500, function(){
          // show 'thank you' message in lightbox
          var productImage = Shopify.Image.getSizedImageUrl(itemData.image || '', '200x');
          var $template = $([
            '<div class="added-notice" style="opacity: 0">',
            '<div class="added-notice__title">', "Added to cart", '</div>',
            '<div class="added-notice__tick">', theme.icons.tick, '</div>',
            '<div class="added-notice__product">',
            '<div class="added-notice__product-image"><img src="', productImage, '"></div>',
            '<div class="added-notice__product__description">',
            '<h2 class="added-notice__product-title">', itemData.product_title, '</h2>',
            '<div class="added-notice__price">', productPrice, '</div>',
            productVariants,
            '</div>',
            '</div>',
            '<div class="added-notice__checkout"><a class="button" href="/cart">', "View Cart", '</a></div>',
            '<div class="added-notice__continue"><a class="close-box more-link" href="#">', "Continue shopping", '</a></div>',
            '</div>'
          ].join(''));
          $.colorbox({
            closeButton: false,
            preloading: false,
            open: true,
            speed: 200,
            transition: "elastic",
            html: ['<div class="action-icons">',
                  '<a href="#" class="close-box action-icon">'+theme.icons.close+'</a>',
                  '</div>', $template.wrap('<div>').parent().html()].join(''),
            onComplete: function(){
              $('.added-notice').animate({ opacity: 1 }, 500);
              theme.runMultiCurrency();
            }
          });
        });
        // update sidebar
        updateCartSummaries(false);
      }
    }, 'json').error(function(data) {
      //Enable add button
      var $firstBtn = $form.find(':submit').removeAttr('disabled').each(function(){
        var $btn = $(this);
        var contentFunc = $btn.is('button') ? 'html' : 'val';
        $btn[contentFunc]($btn.data('previous-value'))
      }).first();

      //Not added, show message
      if(typeof(data) != 'undefined' && typeof(data.status) != 'undefined') {
        var jsonRes = $.parseJSON(data.responseText);
        window.showQuickPopup(jsonRes.description, $firstBtn);
      } else {
        //Some unknown error? Disable ajax and submit the old-fashioned way.
        $form.addClass('noAJAX');
        $form.submit();
      }
    });
    return false;
  });

  /// Reload cart summary, if we added something on the previous page (in response to back-button use)
  if(typeof theme.readCookie('theme_added_to_cart') != 'undefined' && theme.readCookie('theme_added_to_cart') == 'justnow') {
    theme.eraseCookie('theme_added_to_cart');
    updateCartSummaries(false);
  }
  


  /// Side-cart quantities

  $(document).on('change', '#cart-summary .cart-summary-item input', function(){
    var $statusDivs = $(this).closest('.cart-summary-item').add('#cart-summary').addClass('updating');
    var quantities = [];
    $('#cart-summary .cart-summary-item input').each(function(){
      quantities.push($(this).val());
    });
    $.post('/cart/update.js', { updates: quantities }, function(data){
      //Update total
      $('#cart-summary .cart-summary-subtotal .amount').html('<span class="theme-money">' + Shopify.formatMoney(data.total_price, theme.money_format) + '</span>');
      //Remove if qty=0
      $('#cart-summary .cart-summary-item input').filter(function(){ return $(this).val() == 0 }).closest('.cart-summary-item').animate({ opacity: 0 }, 250, function(){ $(this).remove() });
      updateCartSummaries();
    }, 'json').always(function(){
        $statusDivs.removeClass('updating')
    });
  });


  /// Heights in grids

  $(window).on('debouncedresize load normheights', function(){
    $('[data-normheights]').each(function(){
      var $items = $(this).find($(this).data('normheights')),
          childFilter = $(this).data('normheights-inner'),
          tallest = 0,
          lastYOffset = 0,
          row = [];
      $items.each(function(index){
        var $img = $(this).find(childFilter);
        var yOffset = $(this).position().top;
        if(index == 0) {
          lastYOffset = yOffset;
        } else if(yOffset != lastYOffset) {
          $(row).css('min-height', tallest);
          yOffset = $(this).position().top;
          row.length = 0;
          tallest = 0;
        }
        lastYOffset = yOffset;
        row.push(this);
        var h = $img.height();
        if(h > tallest) tallest = h;
      });
      $(row).css('min-height', tallest);
    });
  }).trigger('normheights');

  /// Gallery variant images
  $(document).on('variantImageSelected', '.product-gallery', function(e, data){
    var variantSrc = data.featured_image.src.split('?')[0].replace(/http[s]?:/, '');
    $('.thumbnails a.thumbnail', this).filter('[href^="' + variantSrc + '"]').trigger('click');
  });

  /// Product gallery zoom
  $(document).on('initzoom', '.product-gallery[data-enable-zoom="true"]', function(){
    if(!isMobile()) {
      var $img = $(this).find('.main .main-img-link').trigger('zoom.destroy');
      $img.zoom({ url: $img.attr('href') });
    }
  });

  /// Product gallery lightbox

  $(document).on('click', '.product-gallery .main a.main-img-link', function(){
    //Don't do anything if the screen isn't very large. Otherwise, lightbox ahoy...
    if($(window).height() >= 580 && $(window).width() >= 768) {
      var $prodPhotoCont = $(this).closest('.product-gallery');
      if($prodPhotoCont.find('img:not(.zoomImg)').length == 1) {
        //One image only?
        $.colorbox({ href:$(this).attr('href'), minWidth: '200', maxWidth:'96%', maxHeight:'96%' });
      } else {
        //Many images. Dupe thumbs to create a faux-gallery
        $('#gallery-cont').remove();
        var $galleryCont = $('<div id="gallery-cont"/>').append(
          $prodPhotoCont.find('.thumbnails a').clone().attr({ rel: 'gallery', title: '' })
        ).hide().appendTo('body');
        //Trigger box (on the right one)
        $galleryCont.children().colorbox({minWidth: '200', maxWidth:'96%', maxHeight:'96%'}).filter('[href="'+$(this).attr('href')+'"]').first().click();
      }
    }
    return false;
  });


  /// Product gallery

  $(document).on('click', '.product-gallery .thumbnails .thumbnail', function(e){
    e.preventDefault();
    var $photoCont = $(this).closest('.product-gallery');
    var $imgContainer = $photoCont.find('.main .main-img-link');
    $imgContainer.trigger('zoom.destroy').attr({
      href: $(this).attr('href'),
      title: $(this).attr('title')
    });
    $(this).addClass('active').siblings('.active').removeClass('active');

    var $newImg = $(this).children().clone();
    $newImg.find('.rimage-wrapper').addClass('lazyload--placeholder');
    var $img = $newImg.find('img').removeAttr('src').removeClass('lazyloaded fade-in').addClass('lazyload');

    // after load
    $img.on('load', function(){
      $imgContainer.trigger('initzoom');
      if($photoCont.closest('.quickbuy-form').length > 0) {
        $.colorbox.resize();
      }
    });

    // add to page
    $imgContainer.html($newImg);

    // load FF event hack
    if($img[0].complete || $img[0].readyState) {
      $imgContainer.trigger('initzoom');
      if($photoCont.closest('.quickbuy-form').length > 0) {
        $.colorbox.resize();
      }
    }
  });


  /// Quick buy
  var activeQuickBuyRequest = null;

  $(document).on('click', '.product-block .quick-buy', function(e){

    if (activeQuickBuyRequest) {
      return false;
    }

    var $prod = $(this).closest('.product-block');
    var placeholder = $prod.find('.quickbuy-placeholder-template').html();
    var $template = $('<div class="quickbuy-container">'+placeholder+'</div>');
    var prevIndex = $('.product-block').index($prod) - 1;
    var nextIndex = $('.product-block').index($prod) + 1;

    if(nextIndex > $('.product-block').length) {
      nextIndex = -1;
    }

    $.colorbox({
      closeButton: false,
      preloading: false,
      open: true,
      speed: 200,
      //transition: "none",
      html: [
        '<div class="action-icons">',
        '<a href="#" class="prev-item action-icon" data-idx="',prevIndex,'">'+theme.icons.left+'</span></a>',
        '<a href="#" class="next-item action-icon" data-idx="',nextIndex,'">'+theme.icons.right+'</a>',
        '<a href="#" class="close-box action-icon">'+theme.icons.close+'</a>',
        '</div>', $template.wrap('<div>').parent().html()
      ].join(''),
      onComplete: loadQuickBuyContent($(this).attr('href'))
    });

    e.stopImmediatePropagation();
    return false;
  });

  var loadQuickBuyContent = function(href) {
    theme.runMultiCurrency(); // run on initial template

    if(href.indexOf('?') > -1) {
      href += '&view=lightbox'; // in theme editor
    } else {
      href += '?view=lightbox';
    }
    activeQuickBuyRequest = $.get(href, function(data){

      var $form = $('<div class="quickbuy-form quickbuy-form--overlay">'+ data +'</div>');
      $('.quickbuy-container').append($form);

      //Init product form, if required
      $(document).find('.product-form').trigger('initproductform');

      $('.quickbuy-form').imagesLoaded(function(){
        $('.product-gallery').trigger('initzoom');
        setTimeout($.colorbox.resize, 10);
      });

      $form.hide().fadeIn(500, function() {
        $('.quickbuy-form.placeholder').remove();
        $form.removeClass('quickbuy-form--overlay');

        $.colorbox.resize();
      });

      $(document).on('shopify:payment_button:loaded.themeQuickBuy', function(){
        $(document).off('shopify:payment_button:loaded.themeQuickBuy');
        $.colorbox.resize();
      });
      Shopify.PaymentButton.init();

      theme.runMultiCurrency();

      activeQuickBuyRequest = null;
    });
  }

  $(document).on('click', '#colorbox .close-box', function(){
    $.colorbox.close();
    return false;
  }).on('click', '#colorbox .action-icons .prev-item, #colorbox .action-icons .next-item', function(){
    $('.product-block:eq('+$(this).data('idx')+') .quick-buy').click();
    return false;
  });


  /// Image tile section

  $(document).on('render', '.tile-group', function(){
    //Vars
    var $section = $(this);
    var $imgs = $(this).find('.rimage-wrapper, svg');

    var rows = [],
        sectionHeight = 0,
        margin = $(this).data('tiles-margin'),
        originalPerRow = $(this).data('tiles-per-row');
    var margin_px = $section.width() * margin/100.0;
    var row_size = Math.max(1, $(this).width() >= 768 ? originalPerRow : Math.min(2, originalPerRow));
    if($(this).width() < 400) {
      row_size = 1;
    }

    //Split into rows
    while ($imgs.length > 0) {
      var $row = $($imgs.splice(0, row_size));
      rows.push($row);
    }

    //Only need to recalculate the widths and x-offsets if the layout changes
    for(var r=0; r<rows.length; r++) {
      var $rowImgs = rows[r];
      //Calc ratios & % widths
      var totalFracWidth = 0;
      for(var i=0; i<$rowImgs.length; i++) {
        var wh_ratio = $($rowImgs[i]).outerWidth() / $($rowImgs[i]).outerHeight();
        $($rowImgs[i]).data('wh_ratio', wh_ratio);
        totalFracWidth += wh_ratio;
      }
      //Add on margin
      totalFracWidth += totalFracWidth * (($rowImgs.length-1) * margin / 100.0);
      //Set vals
      var xOffset = 0;
      for(var i=0; i<$rowImgs.length; i++) {
        var thisWidth = (($($rowImgs[i]).data('wh_ratio')/totalFracWidth) * 100);
        $($rowImgs[i]).closest('.tile').css({
          position: 'absolute',
          top: sectionHeight,
          left: xOffset + '%',
          width: thisWidth + '%'
        });
        xOffset += thisWidth + margin;
      }
      //Calc height
      sectionHeight += $($rowImgs[0]).outerHeight() + margin_px;
    }
    $section.height(sectionHeight - margin_px);
  });
  $(window).on('load debouncedresize', function(){ $('.tile-group').trigger('render'); });


  /// Select contents on focus

  $(document).on('focusin click', 'input.select-on-focus', function(){
    $(this).select();
  }).on('mouseup', 'input.select-on-focus', function(e){
    e.preventDefault(); //Prevent mouseup killing select()
  });



  /// Search in header - for visual effect

  $(document).on('focusin focusout', '.toolbar .search-form input', function(e){
    $(this).closest('.search-form').toggleClass('focus', e.type == 'focusin');
  });


  /// Docked mobile nav

  var prevNavMargin = 0;
  var prevScroll = $(window).scrollTop();
  $(window).on('debouncedresize load handledockednav', function(){
    var $dockedMobNav = $('#toolbar'),
        mobNavHeight = $dockedMobNav.outerHeight();

    $dockedMobNav.toggleClass('docked', $('.toolbar:first').css('min-height') == '1px');
    if($dockedMobNav.hasClass('docked')) {
      mobNavHeight = $dockedMobNav.outerHeight();
    } else {
      mobNavHeight = '';
    }
    $('.page-header').css('padding-top', mobNavHeight);
  });

  $(window).on('scroll handledockednav', function(){
    var $dockedMobNav = $('#toolbar'),
        mobNavHeight = $dockedMobNav.outerHeight();

    var scroll = $(window).scrollTop();
    if(scroll < mobNavHeight) {
      $dockedMobNav.css('top', 0);
    } else {
      prevNavMargin += prevScroll - scroll;
      prevNavMargin = Math.min(Math.max(-mobNavHeight, prevNavMargin), 0);
      $dockedMobNav.css('top', prevNavMargin);
    }
    prevScroll = scroll;
  });




  /// Page height assessment

  $(window).on('debouncedresize load setminheight', function(){
    // inner wrap contains the border
    var $innerWrap = $('#page-wrap-inner').css('min-height', $(window).height());
  }).trigger('setminheight');

  /// Translations for colorbox
  $.extend($.colorbox.settings, {
    previous: "Previous",
    next: "Next",
    close: "Close"
  });

  /// Register all sections
  theme.Sections.init();
  theme.Sections.register('slideshow', theme.SlideshowSection);
  theme.Sections.register('instagram', theme.InstagramSection);
  theme.Sections.register('video', theme.VideoManager);
  theme.Sections.register('header', theme.HeaderSection);
  theme.Sections.register('tiled-images', theme.TiledImagesSection);
  theme.Sections.register('collection-template', theme.CollectionTemplateSection);
  theme.Sections.register('product-template', theme.ProductTemplateSection);
  theme.Sections.register('blog-template', theme.BlogTemplateSection);
  theme.Sections.register('collection-listing', theme.CollectionListingSection);
  theme.Sections.register('featured-collection', theme.FeaturedCollectionSection);
  theme.Sections.register('featured-collections', theme.FeaturedCollectionsSection);
  theme.Sections.register('map', theme.MapSection);
  theme.Sections.register('search-template', theme.SearchTemplateSection);
  theme.Sections.register('nested-sections', theme.NestedSectionsSection);

});

})(theme.jQuery);
