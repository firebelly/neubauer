// searchFilters
// Source: https://a11y-dialog.netlify.app/
import A11yDialog from 'a11y-dialog';

const searchFilters = {

    init(name) {

        const dialogContainer = document.querySelector(`#${name}`);

        if ( dialogContainer ) {
  
            const dialog = new A11yDialog(dialogContainer),
                  html   = document.documentElement;

            console.log('test');

            dialog.on(
                'show', () => (html.style.overflowY = 'hidden'),
                'hide', () => (html.style.background = 'red')
            );

        }

    }

};
  
export default searchFilters