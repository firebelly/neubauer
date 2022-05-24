"use strict";
(self["webpackChunkneubauer"] = self["webpackChunkneubauer"] || []).push([["/build/scripts/main"],{

/***/ "./src/scripts/components/accordionMenu.js":
/*!*************************************************!*\
  !*** ./src/scripts/components/accordionMenu.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// accordionMenu

/* 
Simple accordion pattern based on W3 WAI practices.
Resource: https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html

Accordion markup should adhere to the following class and data-attritbute naming conventions:
1. Each relevant accordion element must adhere to a naming convention:
2. Add these data-attrs to the accordion's parent container:
// {str} - accordion parent class name
data-accordion-container={str}
// {bool} - allows multiple accordion panels to be open simultaneously
data-accordion-multiple={bool} 
// {bool} - allows active accordion panel to be toggled
data-accordion-toggle={bool}
3. Add data-accordion-trigger={str} to ... trigger element
4. See templates/macros/_accordion-menu.html for sample markup
5. See assets/styles/components/_accordion-menu.scss for sample styles
*/
var accordionMenu = {
  init: function init() {
    var allAccordions = document.querySelectorAll('[data-accordion-container]');
    allAccordions.forEach(function (accordion) {
      var accordionName = accordion.dataset.accordionContainer,
          allowMultiple = accordion.dataset.accordionMultiple === 'true',
          allowToggle = accordion.dataset.accordionToggle === 'true';
      var allTriggers = accordion.querySelectorAll("[data-accordion-trigger=\"".concat(accordionName, "\"]"));
      accordion.addEventListener('click', function (e) {
        var targetTrigger = e.target,
            viableTrigger = document.getElementById(targetTrigger.getAttribute('aria-controls'));

        if (targetTrigger.hasAttribute('href') || !viableTrigger) {
          // Follow any anchors || ignore irrelevant clicks
          return;
        }

        e.preventDefault();
        var isExpanded = targetTrigger.getAttribute('aria-expanded') === 'true',
            activeTrigger = accordion.querySelector('[aria-expanded="true"]'); // If multiple open panels is disallowed, close active panel

        if (!allowMultiple && activeTrigger && activeTrigger !== targetTrigger) {
          // Reset expanded state
          activeTrigger.setAttribute('aria-expanded', 'false'); // Hide accordion panel based on active trigger aria-controls value

          document.getElementById(activeTrigger.getAttribute('aria-controls')).setAttribute('hidden', ''); // If toggling disallowed, reset disabled state

          if (!allowToggle) {
            activeTrigger.removeAttribute('aria-disabled');
          }
        }

        if (!isExpanded) {
          // Reset expanded state
          targetTrigger.setAttribute('aria-expanded', 'true'); // Display accordion panel based on active trigger aria-controls value
          // TODO: fix this error

          document.getElementById(targetTrigger.getAttribute('aria-controls')).removeAttribute('hidden'); // If toggling disabled, reset disabled state

          if (!allowToggle) {
            activeTrigger.setAttribute('aria-disabled');
          }
        } else if (allowToggle && isExpanded) {
          // Reset expanded state
          targetTrigger.setAttribute('aria-expanded', 'false'); // Hide accordion panel based on target trigger aria-controls value

          document.getElementById(targetTrigger.getAttribute('aria-controls')).setAttribute('hidden', '');
        }
      }); // Keyboard behavior

      accordion.addEventListener('keydown', function (e) {
        var keyTrigger = e.target,
            activeKey = e.which.toString(),
            isExpanded = keyTrigger.getAttribute('aria-expanded') === 'true'; // 33 = Page Up, 34 = Page Down

        var ctrlModifier = e.ctrlKey && activeKey.match(/33|34/); // If accordion trigger...
        // Fix this

        if (keyTrigger === allTriggers) {// do stuff
        } // TO DO:
        // remaining key behavior

      }); // Styling

      allTriggers.forEach(function (trigger) {
        trigger.addEventListener('focus', function () {
          accordion.classList.add('_is-focused');
        });
        trigger.addEventListener('blur', function () {
          accordion.classList.remove('_is-focused');
        });
      }); // If toggle is disallowed, disable close functionality on any open accordions

      if (!allowToggle) {
        // Define expanded accordion
        var expandedAccordion = accordion.querySelector('[aria-expanded="true"]'); // If an expanded/ active accordion is found, disable

        if (expandedAccordion) {
          expandedAccordion.setAttribute('aria-disabled', 'true');
        }
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (accordionMenu);

/***/ }),

/***/ "./src/scripts/components/dialogContent.js":
/*!*************************************************!*\
  !*** ./src/scripts/components/dialogContent.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var a11y_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! a11y-dialog */ "./node_modules/a11y-dialog/dist/a11y-dialog.esm.js");
// dialogContent
// Source: https://a11y-dialog.netlify.app/

var dialogContent = {
  init: function init(options) {
    var dialogId = options.id,
        dialogContainer = document.querySelector("#".concat(dialogId, "_dialog")),
        isGallery = options.gallery;

    if (dialogContainer) {
      var dialog = new a11y_dialog__WEBPACK_IMPORTED_MODULE_0__["default"](dialogContainer),
          html = document.documentElement; // overflow settings are incompatible with sprig 
      // for reasons I don't have time to figure out
      // html.style.overflowY = 'hidden' (probs a race condition)
      // dialog.on(
      //     'show', (el,e) => {}
      // );
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dialogContent);

/***/ }),

/***/ "./src/scripts/components/flyoutContent.js":
/*!*************************************************!*\
  !*** ./src/scripts/components/flyoutContent.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// flyoutContent

/* 
1. Add these data-attrs to the relevant flyout nav elements:
// Parent element: containers trigger(s) and content
   data-flyout-target={str} | {str} flyout namespace
// Trigger element(s): el(s) that trigger the flyout action
    data-flyout-trigger
// Target element: el to which flyout action is applied
    data-flyout-content 
2. See templates/partials/_nav.html for example markup
5. See src/styles/components/_accordion-menu.scss for sample styles
*/
var flyoutContent = {
  isOpen: false,
  target: null,
  triggers: null,
  content: null,
  _open: '_is-open',
  _close: '_is-closing',
  handleMenu: function handleMenu(e) {
    e.preventDefault();
    flyoutContent.isOpen = flyoutContent.isOpen ? flyoutContent.hideMenu() : flyoutContent.showMenu();

    if (flyoutContent.content) {
      // Ensure flyoutContent maintains z-index precedent over content beneath
      flyoutContent.content.ontransitionrun = function () {
        flyoutContent.content.style.zIndex = 100;
      };

      flyoutContent.content.ontransitionend = function () {
        // Overflow specs helps w vw-scrollbar issues
        if (flyoutContent.isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.removeAttribute('style');
        }

        flyoutContent.content.removeAttribute('style'); // On close, remove transition hook

        if (!flyoutContent.isOpen) {
          flyoutContent.target.classList.remove(flyoutContent._close);
        }
      };
    }
  },
  showMenu: function showMenu() {
    flyoutContent.target.classList.add(flyoutContent._open);
    return true;
  },
  hideMenu: function hideMenu() {
    flyoutContent.target.classList.remove(flyoutContent._open); // On close, ensure a nice transition by adding this hook

    flyoutContent.target.classList.add(flyoutContent._close);
    return false;
  },
  init: function init(name) {
    var _this = this;

    this.target = document.querySelector("[data-flyout-target=".concat(name, "]"));
    this.triggers = this.target.querySelectorAll('[data-flyout-trigger]');
    this.content = this.target.querySelector('[data-flyout-content]');

    if (this.triggers && this.target) {
      this.triggers.forEach(function (trigger) {
        trigger.addEventListener('click', _this.handleMenu, false);
      });
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flyoutContent);

/***/ }),

/***/ "./src/scripts/components/handleScroll.js":
/*!************************************************!*\
  !*** ./src/scripts/components/handleScroll.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// handleScroll
// NOTE: originally this handled only the chyron functonality
// but ended up rolling in a few other pieces to prevent scroll interference
var handleScroll = /*#__PURE__*/function () {
  function handleScroll(options) {
    _classCallCheck(this, handleScroll);

    this.options = options || null;
    this._id = this.options._id;
    this.chyron = this._id !== null ? document.querySelector("[data-chyron=\"".concat(this._id, "\"]")) : null;
    this._scrollable = true;
    this._paused = false;
    this._viewable = false;
    this._reset = '_is-resetting';
    this._interval = 20;
  }

  _createClass(handleScroll, [{
    key: "isChyronInView",
    value: function isChyronInView(el) {
      var self = this;
      var bounding = el.getBoundingClientRect();
      return bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
    }
  }, {
    key: "pauseScroll",
    value: function pauseScroll() {
      var self = this;
      self._paused = !self._paused;
    }
  }, {
    key: "resetScroll",
    value: function resetScroll() {
      var self = this;
      self.chyron.classList.add(self._reset);
      self.chyron.scrollTo(0, 0);
      self.chyron.classList.remove(self._reset);
      self.scrollInterval = setInterval(function () {
        return self.autoScroll();
      }, self._interval);
    }
  }, {
    key: "autoScroll",
    value: function autoScroll() {
      var self = this;
      var currentLeft = self.chyron.scrollLeft,
          chyronWidth = self.chyron.scrollWidth - self.chyron.offsetWidth; // update scrollable bool based on scroll position

      self._scrollable = currentLeft !== chyronWidth;

      if (self._paused) {
        return;
      }

      console.log('chyron...'); // if we've reached the end of the chyron, 
      // clear the interval, and reset 

      if (!self._scrollable) {
        clearInterval(self.scrollInterval);
        self.resetScroll();
      }

      self.chyron.scrollTo(self.chyron.scrollLeft + 1, 0);
    }
  }, {
    key: "scrollToHash",
    value: function scrollToHash(targetHash) {
      var self = this;
      var scrollCount = 0; // Account for lazy loading images by patching the scroll
      // NOTE: Important we use scrollTo versus scrollIntoView
      // so as to ensure syncronicity with chyron scrolling

      function scrollLoop() {
        var hashHomie = document.querySelector(targetHash),
            hashOffset = hashHomie.offsetTop;
        ++scrollCount;
        if (scrollCount === 3) return;
        window.scrollTo(0, hashOffset);
        setTimeout(function () {
          scrollLoop();
        }, 600);
      }

      var hashHomie = document.querySelector(targetHash),
          hashOffset = hashHomie.offsetTop;
      window.scrollTo(0, hashOffset);
      scrollLoop();
    }
  }, {
    key: "hashScroll",
    value: function hashScroll() {
      // chyron scroll event is interfering with scrollto event
      // ensure smooth, accurate scroll-to-hash
      // if more time, better code, but for now...
      var self = this;
      var hashies = document.querySelectorAll('[data-hash-scroll]');
      hashies.forEach(function (item) {
        item.addEventListener('click', function (e) {
          e.stopPropagation();
          e.preventDefault();
          console.log(e.target);
          var currentPage = window.location.pathname,
              targetPage = e.target.pathname,
              targetHash = e.target.hash;

          if (currentPage == targetPage) {
            self._paused = true;
            self.scrollToHash(targetHash);
          } else {
            window.location = e.target.href;
          }
        });
      });
    }
  }, {
    key: "dialogScroll",
    value: function dialogScroll() {
      // should have set this up differently
      var self = this;
      var dialogTrigger = document.querySelectorAll('[data-a11y-dialog-show]');
      dialogTrigger.forEach(function (item) {// item.addEventListener('click',(e) => {
        //     e.stopPropagation();
        //     e.preventDefault();
        //     let myHash    = e.target.hash,
        //         hashHomie = document.querySelector(myHash);
        //         // hashTop   = hashHomie.offsetTop;
        //     let dialogContainer = document.getElementById('artModal_dialog'),
        //         dialogList      = document.getElementById('artModal_container');
        //         // dialogHeight    = dialogContainer.offsetHeight,
        //         // listHeight      = dialogList.offsetHeight;
        //     // console.log(hashTop,dialogContainer,listHeight);
        //     self._paused = true;
        //     dialogContainer.addEventListener('scroll', function() {
        //         console.log('scrolling in modal');
        //     });
        // });
      });
    }
  }, {
    key: "init",
    value: function init() {
      var self = this;
      window.addEventListener('load', function () {
        self.chyron.addEventListener('mouseover', function () {
          return self.pauseScroll();
        });
        self.chyron.addEventListener('mouseout', function () {
          return self.pauseScroll();
        }); // Only play chyron when in view

        self._paused = self.isChyronInView(self.chyron) ? false : true;
        self.scrollInterval = setInterval(function () {
          return self.autoScroll();
        }, self._interval);
        document.addEventListener('scroll', function () {
          // Only play chyron when in view
          console.log('scrolling');
          self._paused = self.isChyronInView(self.chyron) ? false : true;
        }); // Handle hash scrolling

        var targetHash = window.location.hash; // Reset location to prevent auto-scroll on load

        window.location.hash = '';

        if (targetHash !== '') {
          self._paused = true;
          self.scrollToHash(targetHash); // For consistency, reapply the hash

          window.location.hash = targetHash;
        }

        self.hashScroll();
        self.dialogScroll();
      });
    }
  }]);

  return handleScroll;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleScroll);

/***/ }),

/***/ "./src/scripts/components/parallaxContent.js":
/*!***************************************************!*\
  !*** ./src/scripts/components/parallaxContent.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var parallaxContent = /*#__PURE__*/function () {
  function parallaxContent(options) {
    _classCallCheck(this, parallaxContent);

    this.options = options || null;
    this._id = this.options._id;
    this.images = this._id !== null ? document.querySelectorAll("[data-parallax-image=\"".concat(this._id, "\"]")) : null;
    this.containers = this._id !== null ? document.querySelectorAll("[data-parallax-container=\"".concat(this._id, "\"]")) : null;
    this._state = {
      _default: true,
      _active: false
    }; // Styling hook for transitions

    this._sliding = '_is-sliding';
    this._imagePad = 30;
  }

  _createClass(parallaxContent, [{
    key: "isContentInView",
    value: function isContentInView(el) {
      var self = this;
      var pageTop = window.scrollY,
          pageBottom = pageTop + window.innerHeight,
          elTop = el.offsetTop,
          elBottom = elTop + el.offsetHeight;
      return pageTop < elBottom;
    }
  }, {
    key: "translateContent",
    value: function translateContent(el, distance) {
      var self = this;

      if (self._state['_active']) {
        el.classList.add(self._sliding);
      }

      el.style.transform = "translate3d(0,-".concat(distance, "px, 0)");
    }
  }, {
    key: "slideState",
    value: function slideState() {
      var self = this;

      function slideThings(container) {
        var title = container.querySelector("[data-parallax-title=\"".concat(self._id, "\"]")),
            image = container.querySelector("[data-parallax-image=\"".concat(self._id, "\"]")),
            feature = container.querySelector("[data-parallax-feature=\"".concat(self._id, "\"]")),
            header = document.querySelector("[data-parallax-header=\"".concat(self._id, "\"]"));
        var slideables = [title, image, feature]; // Vertically slide cover text out of view;
        // Vertically slide feature into view

        if (self._state['_active']) {
          if (title !== null) {
            var headerHeight = header.offsetHeight,
                titleDistance = title.offsetTop + title.offsetHeight + headerHeight;
            self.translateContent(title, titleDistance);
          }

          if (image !== null) {
            var imageDistance = self._imagePad;
            self.translateContent(image, imageDistance);
          }

          if (feature !== null) {
            var featureDistance = feature.offsetTop;
            self.translateContent(feature, featureDistance);
          }
        } else {
          slideables.forEach(function (el) {
            self.translateContent(el, 0);
          });
        }

        feature.addEventListener('transitionend', function () {
          if (self._state['_default']) {
            slideables.forEach(function (el) {
              el.classList.remove(self._sliding);
            });
          }
        });
      }

      self.containers.forEach(function (el) {
        var trigger = el.querySelector("[data-parallax-title-trigger=\"".concat(self._id, "\"]")),
            link = el.querySelector("[data-parallax-follow=\"".concat(self._id, "\"]"));
        el.addEventListener('click', function (e) {
          e.stopPropagation(); // Return to _default state                

          if (e.target === link) {
            return;
          } // Toggle state


          self._state['_default'] = !self._state['_default'];
          self._state['_active'] = !self._state['_active'];
          slideThings(el);
        });
      });
    }
  }, {
    key: "defaultState",
    value: function defaultState() {
      var self = this;
      self.images.forEach(function (image) {
        var container = image.closest("[data-parallax-container=\"".concat(self._id, "\"]"));
        document.addEventListener('scroll', function () {
          var distance = window.scrollY * 0.5; // Throttle the scroll event

          window.requestAnimationFrame(function () {
            // Enable the parallax only when visible
            var enableParallax = self.isContentInView(container);

            if (enableParallax && self._state['_default']) {
              self.translateContent(image, distance);
            }
          });
        });
      });
    }
  }, {
    key: "init",
    value: function init(options) {
      var self = this;
      var viewport = options.viewportState !== null ? options.viewportState : null;
      console.log(viewport);

      if (self.images !== null && viewport !== 'xs') {
        self.defaultState();
      }

      if (self.containers !== null) {
        self.slideState();
      }
    }
  }]);

  return parallaxContent;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parallaxContent);

/***/ }),

/***/ "./src/scripts/components/scrollCarousel.js":
/*!**************************************************!*\
  !*** ./src/scripts/components/scrollCarousel.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// scrollCarousel  
// Initialize with options
// const peopleCarousel = new scrollCarousel({
//     _id: 'people'
// });
// if ( peopleCarousel.carousel !== null ) {
//     peopleCarousel.init();
// }
//
var scrollCarousel = /*#__PURE__*/function () {
  function scrollCarousel(options) {
    _classCallCheck(this, scrollCarousel);

    this.options = options || null;
    this._id = this.options._id; // Parent container

    this.carousel = this._id !== null ? document.querySelector("[data-carousel=\"".concat(this._id, "\"]")) : null;

    if (this.carousel !== null) {
      // Els
      this.previousButton = this.carousel.querySelector('[data-carousel-prev]');
      this.nextButton = this.carousel.querySelector('[data-carousel-next]');
      this.slideFrame = this.carousel.querySelector('[data-carousel-frame]');
      this.slideContainer = this.carousel.querySelector('[data-carousel-slides]');
      this.slides = this.slideContainer.querySelectorAll('[data-carousel-item]'); // Ints

      this._current = 0;
      this._count = this.slides.length;
    }
  }

  _createClass(scrollCarousel, [{
    key: "goToSlide",
    value: function goToSlide(_idx) {
      var self = this;

      var _slideOffset = self.slides[_idx].offsetLeft,
          _slideLeft = _slideOffset + self.slides[_idx].offsetWidth,
          _parentOffset = self.slideContainer.offsetLeft,
          _parentLeft = _parentOffset + self.slideContainer.offsetWidth;

      self.slideContainer.scrollLeft = _slideOffset - _parentOffset;
    }
  }, {
    key: "previousSlide",
    value: function previousSlide(e) {
      var self = this;
      e.preventDefault();

      var _prev = self._current - 1;

      self._current = _prev < 0 ? self._count - 1 : _prev;
      self.goToSlide(self._current);
    }
  }, {
    key: "nextSlide",
    value: function nextSlide(e) {
      e.preventDefault();
      var self = this;

      var _next = self._current + 1;

      self._current = _next < this._count ? _next : 0;
      self.goToSlide(self._current);
    }
  }, {
    key: "startSlide",
    value: function startSlide(e) {
      e.preventDefault();
      var self = this;
      console.log('start');
    }
  }, {
    key: "stopSlide",
    value: function stopSlide(e) {
      e.preventDefault();
      var self = this;
      console.log('stop');
    }
  }, {
    key: "init",
    value: function init() {
      var self = this; // Set up previous/next button behaviors

      self.previousButton.addEventListener('click', function (e) {
        return self.previousSlide(e);
      });
      self.nextButton.addEventListener('click', function (e) {
        return self.nextSlide(e);
      }); // self.slideContainer.addEventListener("mouseover", (e) => self.startSlide(e) );
      // self.slideContainer.addEventListener("mouseover", (e) => self.stopSlide(e) );
    }
  }]);

  return scrollCarousel;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (scrollCarousel);

/***/ }),

/***/ "./src/scripts/components/tabbedContent.js":
/*!*************************************************!*\
  !*** ./src/scripts/components/tabbedContent.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// tabbedContent  

/*
Adapted from:
This content is licensed according to the W3C Software License at
https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
//
var tabbedContent = {
  tablist: document.querySelectorAll('[role="tablist"]')[0],
  tabs: document.querySelectorAll('[role="tab"]'),
  panels: document.querySelectorAll('[role="tabpanel"]'),
  keys: {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    "delete": 46
  },
  direction: {
    37: -1,
    38: -1,
    39: 1,
    40: 1
  },
  addListeners: function addListeners(index) {
    var tabs = tabbedContent.tabs;
    tabs[index].addEventListener('click', tabbedContent.clickEventListener);
    tabs[index].addEventListener('keydown', tabbedContent.keydownEventListener);
    tabs[index].addEventListener('keyup', tabbedContent.keyupEventListener); // Build an array with all tabs (<button>s) in it

    tabs[index].index = index;
  },
  // When a tab is clicked, activateTab is fired to activate it
  clickEventListener: function clickEventListener(event) {
    var tab = event.target;
    tabbedContent.activateTab(tab, false);
  },
  // Handle keydown on tabs
  keydownEventListener: function keydownEventListener(event) {
    var key = event.keyCode,
        keys = tabbedContent.keys,
        tabs = tabbedContent.tabs,
        firstTab = tabs[0],
        newTab = tabs[tabs.length - 1];

    switch (key) {
      case keys.end:
        event.preventDefault(); // Activate last tab

        tabbedContent.activateTab(newTab);
        break;

      case keys.home:
        event.preventDefault(); // Activate first tab

        tabbedContent.activateTab(firstTab);
        break;
      // Up and down are in keydown
      // because we need to prevent page scroll >:)

      case keys.up:
      case keys.down:
        tabbedContent.determineOrientation(event, keys);
        break;
    }
  },
  // Handle keyup on tabs
  keyupEventListener: function keyupEventListener(event) {
    var key = event.keyCode,
        keys = tabbedContent.keys;

    switch (key) {
      case keys.left:
      case keys.right:
        tabbedContent.determineOrientation(event, keys);
        break;

      case keys["delete"]:
        tabbedContent.determineDeletable(event);
        break;
    }
  },
  // When a tablist aria-orientation is set to vertical,
  // only up and down arrow should function.
  // In all other cases only left and right arrow function.
  determineOrientation: function determineOrientation(event, keys) {
    var key = event.keyCode;
    var vertical = tabbedContent.tablist.getAttribute('aria-orientation') == 'vertical';
    var proceed = false;

    if (vertical) {
      if (key === keys.up || key === keys.down) {
        event.preventDefault();
        proceed = true;
      }
    } else {
      if (key === keys.left || key === keys.right) {
        proceed = true;
      }
    }

    if (proceed) {
      tabbedContent.switchTabOnArrowPress(event, keys);
    }
  },
  // Either focus the next, previous, first, or last tab
  // depending on key pressed
  switchTabOnArrowPress: function switchTabOnArrowPress(event, keys) {
    var pressed = event.keyCode,
        tabs = tabbedContent.tabs,
        direction = tabbedContent.direction;

    for (var x = 0; x < tabs.length; x++) {
      tabs[x].addEventListener('focus', tabbedContent.focusEventHandler);
    }

    if (direction[pressed]) {
      var target = event.target;

      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        } else if (pressed === keys.left || pressed === keys.up) {
          tabbedContent.focusLastTab(tabs);
        } else if (pressed === keys.right || pressed == keys.down) {
          tabbedContent.focusFirstTab(tabs);
        }
      }
    }
  },
  // Activates any given tab panel
  activateTab: function activateTab(tab, setFocus) {
    setFocus = setFocus || true; // Deactivate all other tabs

    tabbedContent.deactivateTabs(); // Remove tabindex attribute

    tab.removeAttribute('tabindex'); // Set the tab as selected

    tab.setAttribute('aria-selected', 'true'); // Get the value of aria-controls (which is an ID)

    var controls = tab.getAttribute('aria-controls'); // Remove is-hidden class from tab panel to make it visible

    document.getElementById(controls).classList.remove('_is-hidden'); // Set focus when required

    if (setFocus) {
      tab.focus();
    }
  },
  // Deactivate all tabs and tab panels
  deactivateTabs: function deactivateTabs() {
    var tabs = tabbedContent.tabs,
        panels = tabbedContent.panels;

    for (var t = 0; t < tabs.length; t++) {
      tabs[t].setAttribute('tabindex', '-1');
      tabs[t].setAttribute('aria-selected', 'false');
      tabs[t].removeEventListener('focus', tabbedContent.focusEventHandler);
    }

    for (var p = 0; p < panels.length; p++) {
      panels[p].classList.add('_is-hidden');
    }
  },
  // Make a guess
  focusFirstTab: function focusFirstTab(tabs) {
    tabs[0].focus();
  },
  // Make a guess
  focusLastTab: function focusLastTab(tabs) {
    tabs[tabs.length - 1].focus();
  },
  // Detect if a tab is deletable
  determineDeletable: function determineDeletable(event) {
    var target = event.target,
        tabs = tabbedContent.tabs;

    if (target.getAttribute('data-deletable') !== null) {
      // Delete target tab
      deleteTab(event, target); // Update arrays related to tabs widget

      generateArrays(); // Activate the closest tab to the one that was just deleted

      if (target.index - 1 < 0) {
        activateTab(tabs[0]);
      } else {
        activateTab(tabs[target.index - 1]);
      }
    }
  },
  // Deletes a tab and its panel
  deleteTab: function deleteTab(event) {
    var target = event.target;
    var panel = document.getElementById(target.getAttribute('aria-controls'));
    target.parentElement.removeChild(target);
    panel.parentElement.removeChild(panel);
  },
  // Determine whether there should be a delay
  // when user navigates with the arrow keys
  determineDelay: function determineDelay() {
    var tablist = tabbedContent.tablist;
    var hasDelay = tablist.hasAttribute('data-delay');
    var delay = 0;

    if (hasDelay) {
      var delayValue = tablist.getAttribute('data-delay');

      if (delayValue) {
        delay = delayValue;
      } else {
        // If no value is specified, default to 300ms
        delay = 300;
      }
    }

    return delay;
  },
  //
  focusEventHandler: function focusEventHandler(event) {
    var target = event.target;
    setTimeout(tabbedContent.checkTabFocus, delay, target);
  },
  // Only activate tab on focus if it still has focus after the delay
  checkTabFocus: function checkTabFocus(target) {
    var focused = document.activeElement;

    if (target === focused) {
      tabbedContent.activateTab(target, false);
    }
  },
  init: function init() {
    // Bind listeners
    tabbedContent.determineDelay();

    for (var i = 0; i < tabbedContent.tabs.length; ++i) {
      tabbedContent.addListeners(i);
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabbedContent);

/***/ }),

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_appState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/appState */ "./src/scripts/utils/appState.js");
/* harmony import */ var _utils_appForms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/appForms */ "./src/scripts/utils/appForms.js");
/* harmony import */ var _components_tabbedContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/tabbedContent */ "./src/scripts/components/tabbedContent.js");
/* harmony import */ var _components_accordionMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/accordionMenu */ "./src/scripts/components/accordionMenu.js");
/* harmony import */ var _components_flyoutContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/flyoutContent */ "./src/scripts/components/flyoutContent.js");
/* harmony import */ var _components_dialogContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/dialogContent */ "./src/scripts/components/dialogContent.js");
/* harmony import */ var _components_parallaxContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/parallaxContent */ "./src/scripts/components/parallaxContent.js");
/* harmony import */ var _components_scrollCarousel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/scrollCarousel */ "./src/scripts/components/scrollCarousel.js");
/* harmony import */ var _components_handleScroll__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/handleScroll */ "./src/scripts/components/handleScroll.js");
// Import local dependencies








 // Inits

_utils_appState__WEBPACK_IMPORTED_MODULE_0__["default"].init();
_utils_appForms__WEBPACK_IMPORTED_MODULE_1__["default"].init(); // Chyron

var footerChyron = new _components_handleScroll__WEBPACK_IMPORTED_MODULE_8__["default"]({
  _id: 'footer'
});

if (footerChyron.chyron !== null) {
  footerChyron.init();
} // Components


_components_accordionMenu__WEBPACK_IMPORTED_MODULE_3__["default"].init();
_components_flyoutContent__WEBPACK_IMPORTED_MODULE_4__["default"].init('nav');
_components_dialogContent__WEBPACK_IMPORTED_MODULE_5__["default"].init({
  id: 'resultsFilter',
  gallery: false
});
_components_dialogContent__WEBPACK_IMPORTED_MODULE_5__["default"].init({
  id: 'artModal',
  gallery: true
});

if (document.querySelectorAll('[role="tablist"]').length > 0) {
  _components_tabbedContent__WEBPACK_IMPORTED_MODULE_2__["default"].init();
} // Homepage Parallax


var homepageCover = new _components_parallaxContent__WEBPACK_IMPORTED_MODULE_6__["default"]({
  _id: 'cover'
});

if (homepageCover.images !== null || homepageCover.titles !== null) {
  homepageCover.init({
    'viewportState': _utils_appState__WEBPACK_IMPORTED_MODULE_0__["default"].currentViewport
  });
} // Homepage Carousels:


var peopleCarousel = new _components_scrollCarousel__WEBPACK_IMPORTED_MODULE_7__["default"]({
  _id: 'people'
});

if (peopleCarousel.carousel !== null) {
  peopleCarousel.init();
}

var eventsCarousel = new _components_scrollCarousel__WEBPACK_IMPORTED_MODULE_7__["default"]({
  _id: 'events'
});

if (eventsCarousel.carousel !== null) {
  eventsCarousel.init();
}

var newsCarousel = new _components_scrollCarousel__WEBPACK_IMPORTED_MODULE_7__["default"]({
  _id: 'news'
});

if (newsCarousel.carousel !== null) {
  newsCarousel.init();
} // About Carousels


var publicationsCarousel = new _components_scrollCarousel__WEBPACK_IMPORTED_MODULE_7__["default"]({
  _id: 'publications'
});

if (publicationsCarousel.carousel !== null) {
  publicationsCarousel.init();
}

/***/ }),

/***/ "./src/scripts/utils/appForms.js":
/*!***************************************!*\
  !*** ./src/scripts/utils/appForms.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// appForms
var appForms = {
  fields: null,
  init: function init() {
    var fields = document.querySelectorAll("[data-global-field]");
    var _value = '_has-value';
    fields.forEach(function (el) {
      if (el.dataset.globalField === 'input') {
        el.addEventListener('keyup', function (e) {
          var inputValue = e.target.value;

          if (inputValue !== '') {
            e.target.classList.add(_value);
          } else {
            e.target.classList.remove(_value);
          }
        });
      }

      if (el.dataset.globalField === 'select') {
        el.addEventListener('change', function (e) {
          var inputValue = e.target.value;

          if (inputValue !== '') {
            e.target.classList.add(_value);
          } else {
            e.target.classList.remove(_value);
          }
        });
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appForms);

/***/ }),

/***/ "./src/scripts/utils/appState.js":
/*!***************************************!*\
  !*** ./src/scripts/utils/appState.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var appState = {
  currentViewport: '',
  init: function init() {
    document.addEventListener('DOMContentLoaded', appState.updateViewport);
    window.addEventListener('resize', appState.updateViewport);
    appState.updateViewport();
  },
  updateViewport: function updateViewport() {
    var viewportSlug = window.getComputedStyle(document.querySelector('#viewportMod'), '::before').getPropertyValue('content').replace(/['"]+/g, '');
    appState.currentViewport = viewportSlug;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appState);

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["build/styles/main","/build/scripts/vendor"], () => (__webpack_exec__("./src/scripts/main.js"), __webpack_exec__("./src/styles/main.scss")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map