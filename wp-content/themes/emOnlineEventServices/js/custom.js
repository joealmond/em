$(document).ready(function() {
  //MJ-added 2021.05.06
  $('.menu-item-296-hu a').on('click',function(e){location.replace(location.toString().replace('.hu/en','.hu/hu')); return false;});
  $('.menu-item-296-en a').on('click',function(e){location.replace(location.toString().replace('.hu/hu','.hu/en')); return false;});
//  $('.hexContent').on('mouseenter',function(e){ $('.hexPattern').removeClass('hover'); $(this).closest('.hex').find('.hexPattern').addClass('hover');})
//  $('.hexContent').on('mouseleave',function(e){ $(this).closest('.hex').find('.hexPattern').removeClass('hover');})
  $(window).on('resize',function(e){
	if($('#navbar').hasClass('in')){ $('#navbar a.close').trigger('click');	}
  });

  
  // hide content while loadnig
  $('body').css({'visibility': 'hidden'});
  
  //img preloads
  (function($) {
    var cache = [];
    // Arguments are image paths relative to the current page.
    $.preLoadImages = function() {
      var args_len = arguments.length;
      for (var i = args_len; i--;) {
        var cacheImage = document.createElement('img');
        cacheImage.src = arguments[i];
        cache.push(cacheImage);
      }
    }
  })(jQuery)
  jQuery.preLoadImages("/wp-content/uploads/2015/03/intro_00.jpg", "/wp-content/uploads/2015/03/intro_01.jpg", "/wp-content/uploads/2015/03/intro_02.jpg");
  
  //change home backgrounds 
  var body = $('.fooldal .screener');
  var backgrounds = [
    'url(/wp-content/uploads/2015/03/intro_00.jpg)', 
    'url(/wp-content/uploads/2015/03/intro_01.jpg)',
    'url(/wp-content/uploads/2015/03/intro_02.jpg)'];
  var current = 0;
  function nextBackground() {
	  body.css(
		  'background',
	  backgrounds[current = ++current % backgrounds.length]);
	  setTimeout(nextBackground, 5000);
  }
  setTimeout(nextBackground, 5000);
  body.css({'background-image': backgrounds[0], 'transition': 'all 1s'});
  /* eng */
  var bodyEng = $('.main .screener');
  var backgroundsEng = [
    'url(/wp-content/uploads/2015/03/intro_00.jpg)', 
    'url(/wp-content/uploads/2015/03/intro_01.jpg)',
    'url(/wp-content/uploads/2015/03/intro_02.jpg)'];
  var currentEng = 0;
  function nextBackgroundEng() {
	  bodyEng.css(
		  'background',
	  backgroundsEng[currentEng = ++currentEng % backgroundsEng.length]);
	  setTimeout(nextBackgroundEng, 5000);
  }
  setTimeout(nextBackgroundEng, 5000);
  bodyEng.css({'background-image': backgroundsEng[0], 'transition': 'all 1s'});
  
  //menu add bootstrap params
  $('.navbar-nav ul').addClass('nav navbar-nav');
  /*$('.current_page_item').addClass('active');
  $('.current-menu-item').addClass('active');*/
  $('.menu-item-has-children').addClass('dropdown');
  $('.sub-menu').addClass('dropdown-menu');
  //close nav on mobile
  if( $(window).width() < 1280 ){
    $('#navbar').append('<a class="close">x</a>'); 
    $('#navbar .close').click(function() {
      $('#navbar').collapse('toggle');
    });
    $('#navbar li a').click(function() {
      $('#navbar').collapse('toggle');
    });
  }
  
  //featured image to content background
  $('.screener').each(function() {
    if($(this).find('.post-thumbnail img').attr('src') != undefined) {
      var bgImg = $(this).find('.post-thumbnail img').attr('src').split('/');
      bgImg[bgImg.length-1] = bgImg[bgImg.length-1].split('-')[0];
      bgImg = bgImg.join('/');
      $(this).css('background-image', 'url(' + bgImg + ')');
    }  
    $(this).find('.post-thumbnail').hide();
  });
  
  //MJ-added 2021.05.06 - to function with resize event
  //screener heights
  function setScreenerHeight(){
//    if( $(window).width() > 1024 ){
$('.online-slogen-mainSlogen').attr('style','margin-bottom: 10px !important');
      $('.screener').each(function() {
	var windowHeight = $(window).height();
	var footerHeight = $('footer').outerHeight();
	var screenerHeight = windowHeight;
	var $this = $(this);

	$this
	.css({'height': screenerHeight + 'px' })
	.parent('.content')
	    .css({'height': screenerHeight + 'px' });

	var screenerContentHeight = $this.find('.container').outerHeight();
	var screenerPadding = (windowHeight - screenerContentHeight) / 2;
	// MJ-MODIFIED: 120 to 90
	if( screenerPadding < 90 ) {
	  $this
	  .css({'padding-top': 90 + 'px',
		'padding-bottom': 90 + 'px' })
	  .addClass('scrollable');
	}
	else {
	  $this.css({'padding-top': (windowHeight - screenerContentHeight) / 2 + 'px' });
	}
	// MJ-ADDED:
	$this.find('.online-slogen-mainSlogen').attr('style','margin-bottom: '+ Math.max(10,50 - (140 - screenerPadding)) +'px !important');
      });
//    }
  };
  setScreenerHeight();

  $(window).on('resize',function(){
     setScreenerHeight();
  });
  
  //onepage scroller
  $('nav #menu-mainmenu li').each(function(){
    var achor = $(this).find('a').attr('href').replace('#', '');
    $(this).attr('data-menuanchor', achor);
  });
  $('footer #menu-mainmenu-1 li').each(function(){
    var achor = $(this).find('a').attr('href').replace('#', '');
    $(this).attr('data-menuanchor', achor);
  });
  $('nav #menu-mainmenu-eng li').each(function(){
    var achor = $(this).find('a').attr('href').replace('#', '');
    $(this).attr('data-menuanchor', achor);
  });
  if( $(window).width() > 1024 ){
    $('#content-body').fullpage();
    $('button.next').click(function(){
       $.fn.fullpage.moveSectionDown();
    });
  }  
  if( $(window).width() < 1024 ){
    $('.content.section').each(function() {
      var id = $(this).attr('data-anchor');
      $(this).attr('id', id);
    });
  // animated scroll
  $('a[href^="#"]').on('click',function (e) {
    e.preventDefault();
    var target = this.hash;
    $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top - 50
    }, 1300, 'easeInOutQuint', function () {
        window.location.hash = '/';
    });
	});  

  }  
  
  //services list wraping
  $('.section.szolgaltatasok ul').each(function() {
     $(this).wrap('<div class="col-xs-36 col-sm-36 col-md-12"></div>');
  });
  /* eng */
  $('.section.services-2 ul').each(function() {
     $(this).wrap('<div class="col-xs-36 col-sm-36 col-md-12"></div>');
  });
  
  //gallery background
  var gbg = $('.section.referenciak .screener').css('background-image');
  $('.spider_popup_wrap').css({'background': gbg + 'bottom center no-repeat', 'background-size': 'cover' });
  /*eng */
  var gbg = $('.section.references .screener').css('background-image');
  $('.spider_popup_wrap').css({'background': gbg + 'bottom center no-repeat', 'background-size': 'cover' });
  
  //gallery container classes
  $('div [id*="bwg_container"]').each(function() {
    $(this).addClass('bwg_container');    
  });
  
  //gallery first image to background
  $(window).load(function() {
    activeBg = $('.fp-slide.active .bwg_container form').find('img:eq(5)').attr('src').replace('/thumb', '');
    $('.fp-section.referenciak .scrollable').css({'background': 'url('+activeBg+')'});
  });
  /* eng */
  $(window).load(function() {
    activeBg = $('.fp-slide.active .bwg_container form').find('img:eq(5)').attr('src').replace('/thumb', '');
    $('.fp-section.references .scrollable').css({'background': 'url('+activeBg+')'});
  });
  
  //change bg if class changed
  $('.fp-section.referenciak .fp-slide').attrchange({
    trackValues: true, // set to true so that the event object is updated with old & new values
    callback: function(evnt) {
      if(evnt.attributeName == 'class') { // which attribute you want to watch for changes
        if(evnt.newValue.search(/active/i) == -1) { // "active" is the class name you search for inside "class" attribute
          activeBg = $('.fp-slide.active .bwg_container form').find('img:eq(5)').attr('src').replace('/thumb', '');
          setTimeout(function(){
            $('.fp-section.referenciak .scrollable').css({'background': 'url('+activeBg+')', 'transition': '1s'});
          }, 500);
        }
      }
    }
  });
  /* eng */
  $('.fp-section.references .fp-slide').attrchange({
    trackValues: true, // set to true so that the event object is updated with old & new values
    callback: function(evnt) {
      if(evnt.attributeName == 'class') { // which attribute you want to watch for changes
        if(evnt.newValue.search(/active/i) == -1) { // "active" is the class name you search for inside "class" attribute
          activeBg = $('.fp-slide.active .bwg_container form').find('img:eq(5)').attr('src').replace('/thumb', '');
          setTimeout(function(){
            $('.fp-section.references .scrollable').css({'background': 'url('+activeBg+')', 'transition': '1s'});
          }, 500);
        }
      }
    }
  });
  
  //reference labels
  $('.section.referenciak .container ul li').wrapInner('<span></span>');
  /*eng */
  $('.section.references .container ul li').wrapInner('<span></span>');
  
  //reference label colors
  $('.section.szolgaltatasok .col-sm-36:nth-child(2) ul li').each(function() {
    var li_main = $(this).text();
    $('.section.referenciak .container .slide').each(function() {        
      $(this).find('ul li').each(function() {          
        var li_sub = $(this).text();          
        if( li_main.replace(/\s/g, "") == li_sub.replace(/\s/g, "") ) {          
          $(this).addClass('orange');              
        }            
      });
    });
  }); 
  /* eng */
  $('.section.services-2 .col-sm-36:nth-child(2) ul li').each(function() {
    var li_main = $(this).text();
    $('.section.references .container .slide').each(function() {        
      $(this).find('ul li').each(function() {          
        var li_sub = $(this).text();          
        if( li_main.replace(/\s/g, "") == li_sub.replace(/\s/g, "") ) {          
          $(this).addClass('orange');              
        }            
      });
    });
  }); 
  
  //footer links
  $('footer a').each(function() {
    $(this).attr('target', '_blank');
  });
  
  //first visit
  /*var cookie_message = $.cookie('ignoreIntro');
  $.cookie('ignoreIntro', 'ignore', { expires: 365 });
  if(cookie_message == 'ignore') { 
    $('.section.fooldal').remove();  
  };
  $('body').click(function() {
    if(cookie_message == 'ignore') { 
      $('.section.fooldal').remove(); 
    };
  });
  $(window).bind('mousewheel DOMMouseScroll', function(event){
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
      $('.section.fooldal').remove(); 
    }
    else {
      $('.section.fooldal').remove();
    }
  });  
  $.removeCookie('ignoreIntro');*/
  
});
$(window).load(function() {
  $('body').css({'visibility': 'visible'});
});

// PLUGINS //
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	var pluses = /\+/g;
	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}
	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}
	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}
	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}
	var config = $.cookie = function (key, value, options) {
		// Write
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}
			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}
		// Read
		var result = key ? undefined : {};
		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');
			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}
			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}
		return result;
	};
	config.defaults = {};
	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};
}));
/*
A simple jQuery function that can add listeners on attribute change.
http://meetselva.github.io/attrchange/
About License:
Copyright (C) 2013-2014 Selvakumar Arumugam
You may use attrchange plugin under the terms of the MIT Licese.
https://github.com/meetselva/attrchange/blob/master/MIT-License.txt
 */
(function($) {
	function isDOMAttrModifiedSupported() {
		var p = document.createElement('p');
		var flag = false;
		if (p.addEventListener) {
			p.addEventListener('DOMAttrModified', function() {
				flag = true
			}, false);
		} else if (p.attachEvent) {
			p.attachEvent('onDOMAttrModified', function() {
				flag = true
			});
		} else { return false; }
		p.setAttribute('id', 'target');
		return flag;
	}
	function checkAttributes(chkAttr, e) {
		if (chkAttr) {
			var attributes = this.data('attr-old-value');
			if (e.attributeName.indexOf('style') >= 0) {
				if (!attributes['style'])
					attributes['style'] = {}; //initialize
				var keys = e.attributeName.split('.');
				e.attributeName = keys[0];
				e.oldValue = attributes['style'][keys[1]]; //old value
				e.newValue = keys[1] + ':'
						+ this.prop("style")[$.camelCase(keys[1])]; //new value
				attributes['style'][keys[1]] = e.newValue;
			} else {
				e.oldValue = attributes[e.attributeName];
				e.newValue = this.attr(e.attributeName);
				attributes[e.attributeName] = e.newValue;
			}
			this.data('attr-old-value', attributes); //update the old value object
		}
	}
	//initialize Mutation Observer
	var MutationObserver = window.MutationObserver
			|| window.WebKitMutationObserver;
	$.fn.attrchange = function(a, b) {
		if (typeof a == 'object') {//core
			var cfg = {
				trackValues : false,
				callback : $.noop
			};
			//backward compatibility
			if (typeof a === "function") { cfg.callback = a; } else { $.extend(cfg, a); }
			if (cfg.trackValues) { //get attributes old value
				this.each(function(i, el) {
					var attributes = {};
					for ( var attr, i = 0, attrs = el.attributes, l = attrs.length; i < l; i++) {
						attr = attrs.item(i);
						attributes[attr.nodeName] = attr.value;
					}
					$(this).data('attr-old-value', attributes);
				});
			}
			if (MutationObserver) { //Modern Browsers supporting MutationObserver
				var mOptions = {
					subtree : false,
					attributes : true,
					attributeOldValue : cfg.trackValues
				};
				var observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(e) {
						var _this = e.target;
						//get new value if trackValues is true
						if (cfg.trackValues) {							
							e.newValue = $(_this).attr(e.attributeName);
						}						
						if ($(_this).data('attrchange-status') === 'connected') { //execute if connected
							cfg.callback.call(_this, e);
						}
					});
				});
				return this.data('attrchange-method', 'Mutation Observer').data('attrchange-status', 'connected')
						.data('attrchange-obs', observer).each(function() {
							observer.observe(this, mOptions);
						});
			} else if (isDOMAttrModifiedSupported()) { //Opera
				//Good old Mutation Events
				return this.data('attrchange-method', 'DOMAttrModified').data('attrchange-status', 'connected').on('DOMAttrModified', function(event) {
					if (event.originalEvent) { event = event.originalEvent; }//jQuery normalization is not required 
					event.attributeName = event.attrName; //property names to be consistent with MutationObserver
					event.oldValue = event.prevValue; //property names to be consistent with MutationObserver
					if ($(this).data('attrchange-status') === 'connected') { //disconnected logically
						cfg.callback.call(this, event);
					}
				});
			} else if ('onpropertychange' in document.body) { //works only in IE		
				return this.data('attrchange-method', 'propertychange').data('attrchange-status', 'connected').on('propertychange', function(e) {
					e.attributeName = window.event.propertyName;
					//to set the attr old value
					checkAttributes.call($(this), cfg.trackValues, e);
					if ($(this).data('attrchange-status') === 'connected') { //disconnected logically
						cfg.callback.call(this, e);
					}
				});
			}
			return this;
		} else if (typeof a == 'string' && $.fn.attrchange.hasOwnProperty('extensions') &&
				$.fn.attrchange['extensions'].hasOwnProperty(a)) { //extensions/options
			return $.fn.attrchange['extensions'][a].call(this, b);
		}
	}
})(jQuery);
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â? 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â? 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */