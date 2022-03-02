const appState = {
    currentViewport: '',

    init() {
        document.addEventListener('DOMContentLoaded', appState.updateViewport);
        window.addEventListener('resize', appState.updateViewport);
        appState.updateViewport();
    },

    updateViewport() {
        let viewportSlug = window.getComputedStyle( document.querySelector('#viewportMod'), '::before' ).getPropertyValue('content').replace(/['"]+/g, '');
        appState.currentViewport = viewportSlug;
    }

};
  
export default appState