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
        document.body.style.overflow = flyoutContent.isOpen ? 'hidden' : 'auto';
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

/***/ "./src/scripts/components/parallaxImages.js":
/*!**************************************************!*\
  !*** ./src/scripts/components/parallaxImages.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var parallaxImages = {
  init: function init() {
    var parallaxables = document.querySelectorAll('.parallax');

    function runParallaxLoop() {
      requestAnimationFrame(runParallaxLoop);
      parallax();
    }

    function parallax() {
      parallaxables.forEach(function (parallaxable) {
        var distance = window.scrollY * 0.5;
        parallaxable.style.transform = "translate3d(0,-".concat(distance, "px, 0)");
      });
    }

    runParallaxLoop();
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parallaxImages);

/***/ }),

/***/ "./src/scripts/components/searchFilters.js":
/*!*************************************************!*\
  !*** ./src/scripts/components/searchFilters.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var a11y_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! a11y-dialog */ "./node_modules/a11y-dialog/dist/a11y-dialog.esm.js");
// searchFilters
// Source: https://a11y-dialog.netlify.app/

var searchFilters = {
  init: function init(name) {
    var dialogContainer = document.querySelector("#".concat(name));

    if (dialogContainer) {
      var dialog = new a11y_dialog__WEBPACK_IMPORTED_MODULE_0__["default"](dialogContainer),
          html = document.documentElement;
      console.log('test'); // dialog.on(
      //     'show', () => (html.style.overflowY = 'hidden'),
      //     'hide', () => (console.log('close'))
      // );
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (searchFilters);

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
/* harmony import */ var _components_tabbedContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/tabbedContent */ "./src/scripts/components/tabbedContent.js");
/* harmony import */ var _components_accordionMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/accordionMenu */ "./src/scripts/components/accordionMenu.js");
/* harmony import */ var _components_flyoutContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/flyoutContent */ "./src/scripts/components/flyoutContent.js");
/* harmony import */ var _components_searchFilters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/searchFilters */ "./src/scripts/components/searchFilters.js");
/* harmony import */ var _components_parallaxImages__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/parallaxImages */ "./src/scripts/components/parallaxImages.js");
// Import local dependencies





 // Inits

_utils_appState__WEBPACK_IMPORTED_MODULE_0__["default"].init(); // Components

_components_accordionMenu__WEBPACK_IMPORTED_MODULE_2__["default"].init();
_components_flyoutContent__WEBPACK_IMPORTED_MODULE_3__["default"].init('nav');
_components_searchFilters__WEBPACK_IMPORTED_MODULE_4__["default"].init('resultsFilter_dialog');

if (document.querySelectorAll('[role="tablist"]').length > 0) {
  _components_tabbedContent__WEBPACK_IMPORTED_MODULE_1__["default"].init();
}

_components_parallaxImages__WEBPACK_IMPORTED_MODULE_5__["default"].init();

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