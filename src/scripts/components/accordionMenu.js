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
const accordionMenu = {

    init() {

        let allAccordions = document.querySelectorAll('[data-accordion-container]');

        allAccordions.forEach(function(accordion) {

            let accordionName = accordion.dataset.accordionContainer,
                allowMultiple = ( accordion.dataset.accordionMultiple === 'true' ),
                allowToggle   = ( accordion.dataset.accordionToggle === 'true' );

            let allTriggers = accordion.querySelectorAll(`[data-accordion-trigger="${accordionName}"]`);

            accordion.addEventListener('click', (e) => {

                let targetTrigger = e.target,
                    viableTrigger = document.getElementById(targetTrigger.getAttribute('aria-controls'));

                if ( targetTrigger.hasAttribute('href') || !viableTrigger ) {
                    // Follow any anchors || ignore irrelevant clicks
                    return;
                }

                e.preventDefault();

                let isExpanded    = (targetTrigger.getAttribute('aria-expanded') === 'true'),
                    activeTrigger = accordion.querySelector('[aria-expanded="true"]');
                
                // If multiple open panels is disallowed, close active panel
                if ( !allowMultiple && activeTrigger && (activeTrigger !== targetTrigger) ) {
                    // Reset expanded state
                    activeTrigger.setAttribute('aria-expanded', 'false');
                    // Hide accordion panel based on active trigger aria-controls value
                    document.getElementById(activeTrigger.getAttribute('aria-controls')).setAttribute('hidden', '');
                    // If toggling disallowed, reset disabled state
                    if ( !allowToggle ) {
                        activeTrigger.removeAttribute('aria-disabled');
                    }
                }
                if ( !isExpanded ) {
                    // Reset expanded state
                    targetTrigger.setAttribute('aria-expanded','true');
                    // Display accordion panel based on active trigger aria-controls value
                    // TODO: fix this error
                    document.getElementById(targetTrigger.getAttribute('aria-controls')).removeAttribute('hidden');
                    
                    // If toggling disabled, reset disabled state
                    if ( !allowToggle ) {
                        activeTrigger.setAttribute('aria-disabled');
                    }
                }
                else if ( allowToggle && isExpanded ) {
                    // Reset expanded state
                    targetTrigger.setAttribute('aria-expanded', 'false');
                    // Hide accordion panel based on target trigger aria-controls value
                    document.getElementById(targetTrigger.getAttribute('aria-controls')).setAttribute('hidden', '');
                }
            
            });

            // Keyboard behavior
            accordion.addEventListener('keydown', (e) => {
                
                let keyTrigger = e.target,
                    activeKey  = e.which.toString(),
                    isExpanded = (keyTrigger.getAttribute('aria-expanded') === 'true');
                
                // 33 = Page Up, 34 = Page Down
                let ctrlModifier = (e.ctrlKey && activeKey.match(/33|34/));
                // If accordion trigger...
                // Fix this
                if ( keyTrigger === allTriggers ) {
                    // do stuff
                }
                // TO DO:
                // remaining key behavior
            });
            // Styling
            allTriggers.forEach(function(trigger) {

                trigger.addEventListener('focus', () => {
                    accordion.classList.add('_is-focused');
                });

                trigger.addEventListener('blur', () => {
                    accordion.classList.remove('_is-focused');
                });

            });
            // If toggle is disallowed, disable close functionality on any open accordions
            if ( !allowToggle ) {
                // Define expanded accordion
                let expandedAccordion = accordion.querySelector('[aria-expanded="true"]');
                // If an expanded/ active accordion is found, disable
                if ( expandedAccordion ) {
                    expandedAccordion.setAttribute('aria-disabled', 'true');
                }
            }

        });        

    }

};

export default accordionMenu