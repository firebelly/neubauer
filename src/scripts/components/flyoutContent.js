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
const flyoutContent = {
    isOpen: false,
    target: null,
    triggers: null,
    content: null,
    _open: '_is-open',
    _close: '_is-closing',

    handleMenu(e) {

        e.preventDefault();

        flyoutContent.isOpen = flyoutContent.isOpen ? flyoutContent.hideMenu() : flyoutContent.showMenu();

        if ( flyoutContent.content ) {
            // Ensure flyoutContent maintains z-index precedent over content beneath
            flyoutContent.content.ontransitionrun = () => {
                flyoutContent.content.style.zIndex = 100;
            };
            flyoutContent.content.ontransitionend = () => {
                // Overflow specs helps w vw-scrollbar issues
                document.body.style.overflow = flyoutContent.isOpen ? 'hidden' : 'auto';
                flyoutContent.content.removeAttribute('style');
                // On close, remove transition hook
                if ( !flyoutContent.isOpen ) {
                    flyoutContent.target.classList.remove(flyoutContent._close);
                }
            };
        }

    },

    showMenu() {
       
        flyoutContent.target.classList.add(flyoutContent._open);

        return true;
    },

    hideMenu() {

        flyoutContent.target.classList.remove(flyoutContent._open);
        // On close, ensure a nice transition by adding this hook
        flyoutContent.target.classList.add(flyoutContent._close);
        
        return false;

    },

    init(name) {

        this.target   = document.querySelector(`[data-flyout-target=${name}]`);
        this.triggers = this.target.querySelectorAll('[data-flyout-trigger]');
        this.content =  this.target.querySelector('[data-flyout-content]');

        if ( this.triggers && this.target ) {
            this.triggers.forEach((trigger) => {
                trigger.addEventListener('click', this.handleMenu, false);
            });
        }

    }

};

export default flyoutContent