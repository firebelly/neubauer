// searchFilters
// Source: https://a11y-dialog.netlify.app/
import A11yDialog from 'a11y-dialog';

const searchFilters = {

    init(id) {

        const dialogContainer = document.querySelector(id);

        if ( dialogContainer ) {
            const dialog = new A11yDialog(dialogContainer);
        }

    }

};
  
export default searchFilters