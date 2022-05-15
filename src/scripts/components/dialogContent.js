// dialogContent
// Source: https://a11y-dialog.netlify.app/
import A11yDialog from 'a11y-dialog';

const dialogContent = {

    init(options) {

        const dialogId        = options.id,
              dialogContainer = document.querySelector(`#${dialogId}_dialog`),
              isGallery       = options.gallery;

        if ( dialogContainer ) {
  
            const dialog = new A11yDialog(dialogContainer),
                  html   = document.documentElement;

            // overflow settings are incompatible with sprig 
            // for reasons I don't have time to figure out
            // html.style.overflowY = 'hidden' (probs a race condition)
            // dialog.on(
            //     'show', (el,e) => {}
            // );
            
        }

    }

};
  
export default dialogContent