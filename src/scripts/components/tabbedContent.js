// tabbedContent  
/*
Adapted from:
This content is licensed according to the W3C Software License at
https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
//
const tabbedContent  = {

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
        delete: 46,
    },
    direction: {
        37: -1,
        38: -1,
        39: 1,
        40: 1,
    },

    addListeners(index) {

        const tabs = tabbedContent.tabs;

        tabs[index].addEventListener('click', tabbedContent.clickEventListener);
        tabs[index].addEventListener('keydown', tabbedContent.keydownEventListener);
        tabs[index].addEventListener('keyup', tabbedContent.keyupEventListener);
    
        // Build an array with all tabs (<button>s) in it
        tabs[index].index = index; 

    },

    // When a tab is clicked, activateTab is fired to activate it
    clickEventListener(event) {
        let tab = event.target;
        tabbedContent.activateTab(tab, false);
    },

    // Handle keydown on tabs
    keydownEventListener(event) {

        let key      = event.keyCode,
            keys     = tabbedContent.keys,
            tabs     = tabbedContent.tabs,
            firstTab = tabs[0],
            newTab   = tabs[tabs.length - 1];
    
        switch (key) {

            case keys.end:
            event.preventDefault();
            // Activate last tab
            tabbedContent.activateTab(newTab);
            break;
            case keys.home:
            event.preventDefault();
            // Activate first tab
            tabbedContent.activateTab(firstTab);
            break;
    
            // Up and down are in keydown
            // because we need to prevent page scroll >:)
            case keys.up:
            case keys.down:
            tabbedContent.determineOrientation(event,keys);
            break;

        }
    
    },

    // Handle keyup on tabs
    keyupEventListener(event) {

        let key = event.keyCode,
            keys = tabbedContent.keys;
    
        switch (key) {
            case keys.left:
            case keys.right:
            tabbedContent.determineOrientation(event,keys);
            break;
            case keys.delete:
            tabbedContent.determineDeletable(event);
            break;
        }

    },

    // When a tablist aria-orientation is set to vertical,
    // only up and down arrow should function.
    // In all other cases only left and right arrow function.
    determineOrientation(event,keys) {

        let key = event.keyCode;
        let vertical = tabbedContent.tablist.getAttribute('aria-orientation') == 'vertical';
        let proceed = false;
    
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
            tabbedContent.switchTabOnArrowPress(event,keys);
        }
    },

    // Either focus the next, previous, first, or last tab
    // depending on key pressed
    switchTabOnArrowPress(event,keys) {

        let pressed   = event.keyCode,
            tabs      = tabbedContent.tabs,
            direction = tabbedContent.direction;
    
        for (let x = 0; x < tabs.length; x++) {
            tabs[x].addEventListener('focus', tabbedContent.focusEventHandler);
        }
    
        if (direction[pressed]) {
            let target = event.target;
            if (target.index !== undefined) {
                if (tabs[target.index + direction[pressed]]) {
                    tabs[target.index + direction[pressed]].focus();
                } 
                else if (pressed === keys.left || pressed === keys.up) {
                    tabbedContent.focusLastTab(tabs);
                } 
                else if (pressed === keys.right || pressed == keys.down) {
                    tabbedContent.focusFirstTab(tabs);
                }
            }
        }
    },

    // Activates any given tab panel
    activateTab(tab, setFocus) {

        setFocus = setFocus || true;
        // Deactivate all other tabs
        tabbedContent.deactivateTabs();
    
        // Remove tabindex attribute
        tab.removeAttribute('tabindex');
    
        // Set the tab as selected
        tab.setAttribute('aria-selected', 'true');
    
        // Get the value of aria-controls (which is an ID)
        let controls = tab.getAttribute('aria-controls');
    
        // Remove is-hidden class from tab panel to make it visible
        document.getElementById(controls).classList.remove('_is-hidden');
    
        // Set focus when required
        if (setFocus) {
            tab.focus();
        }
    },

    // Deactivate all tabs and tab panels
    deactivateTabs() {

        const tabs   = tabbedContent.tabs,
              panels = tabbedContent.panels;

        for (let t = 0; t < tabs.length; t++) {
            tabs[t].setAttribute('tabindex', '-1');
            tabs[t].setAttribute('aria-selected', 'false');
            tabs[t].removeEventListener('focus', tabbedContent.focusEventHandler);
        }
    
        for (let p = 0; p < panels.length; p++) {
            panels[p].classList.add('_is-hidden');
        }
    },

    // Make a guess
    focusFirstTab(tabs) {
        tabs[0].focus();
    },

    // Make a guess
    focusLastTab(tabs) {
        tabs[tabs.length - 1].focus();
    },

    // Detect if a tab is deletable
    determineDeletable(event) {

        let target = event.target,
            tabs = tabbedContent.tabs;

        if (target.getAttribute('data-deletable') !== null) {
            // Delete target tab
            deleteTab(event, target);

            // Update arrays related to tabs widget
            generateArrays();

            // Activate the closest tab to the one that was just deleted
            if (target.index - 1 < 0) {
                activateTab(tabs[0]);
            } 
            else {
                activateTab(tabs[target.index - 1]);
            }
        }
    },

    // Deletes a tab and its panel
    deleteTab(event) {
        let target = event.target;
        let panel = document.getElementById(target.getAttribute('aria-controls'));
    
        target.parentElement.removeChild(target);
        panel.parentElement.removeChild(panel);
    },

    // Determine whether there should be a delay
    // when user navigates with the arrow keys
    determineDelay() {

        const tablist = tabbedContent.tablist;

        let hasDelay = tablist.hasAttribute('data-delay');
        let delay = 0;
    
        if (hasDelay) {
            let delayValue = tablist.getAttribute('data-delay');
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
    focusEventHandler(event) {
        let target = event.target;
    
        setTimeout(tabbedContent.checkTabFocus, delay, target);
    },

    // Only activate tab on focus if it still has focus after the delay
    checkTabFocus(target) {
        let focused = document.activeElement;
    
        if (target === focused) {
            tabbedContent.activateTab(target, false);
        }
    },

    init() {
        // Bind listeners
        tabbedContent.determineDelay();

        for (let i = 0; i < tabbedContent.tabs.length; ++i) {
            tabbedContent.addListeners(i);
        }
    }

};

export default tabbedContent