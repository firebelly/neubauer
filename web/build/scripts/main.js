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

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_appState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/appState */ "./src/scripts/utils/appState.js");
/* harmony import */ var _components_accordionMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/accordionMenu */ "./src/scripts/components/accordionMenu.js");
/* harmony import */ var _components_flyoutContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/flyoutContent */ "./src/scripts/components/flyoutContent.js");
/* harmony import */ var _components_searchFilters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/searchFilters */ "./src/scripts/components/searchFilters.js");
// Import local dependencies



 // Inits

_utils_appState__WEBPACK_IMPORTED_MODULE_0__["default"].init(); // Components

_components_accordionMenu__WEBPACK_IMPORTED_MODULE_1__["default"].init();
_components_flyoutContent__WEBPACK_IMPORTED_MODULE_2__["default"].init('nav');
_components_searchFilters__WEBPACK_IMPORTED_MODULE_3__["default"].init('resultsFilter_dialog');

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