/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(9);
	__webpack_require__(11);

	var Util = __webpack_require__(8);

	var page = 1;
	var $foods = $('.js-foods');
	var $more = $('.js-more');

	function getMoreFood() {
	    var currentPage = ++page;

	    var request = Util.myAjax({
	        url: '/home/food/more',
	        data: {
	            page: currentPage
	        },
	        method: 'post'
	    });

	    request.done(function (ret) {
	        if (ret.errno == 0) {
	            var data = ret.data || [],
	                len = data.length;
	            if (len === 0) {
	                $more.html('亲，已经到底了～').off('click.more').delay(1500).slideUp();
	            } else if (len > 0) {
	                var tmpl = [];
	                data.forEach(function (item) {
	                    var cur = Util.getTmpl({
	                        url: item.foodurl,
	                        name: item.foodname
	                    });

	                    tmpl.push(cur);
	                });
	                var moreFood = tmpl.join('');

	                var $moreFood = $(moreFood).hide().addClass('more-food').attr('index', 'more' + currentPage).css('transform', 'rotate(0deg)');
	                $foods.append($moreFood);
	                $('.more-food').show().css('transform', 'rotate(360deg)');
	            }
	        }
	    });
	}

	$more.on('click.more', function (e) {
	    e.preventDefault();
	    getMoreFood();
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	
	module.exports = function () {
	    function myAjax(config) {
	        var request = $.ajax({
	            url: config.url,
	            data: config.data,
	            method: config.method
	        });

	        return request;
	    }
	    function getTmpl(config) {
	        var url = config.url,
	            name = config.name;

	        return '<li class="food"><img class="food-img" src=' + url + ' alt="' + name + '"></li>';
	    }

	    return {
	        myAjax: myAjax,
	        getTmpl: getTmpl
	    };
	}();

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);