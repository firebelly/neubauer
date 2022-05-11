// appForms
const appForms = {
    fields: null,

    init() {

        let fields = document.querySelectorAll(`[data-global-field]`);

        const _value = '_has-value';
        
        fields.forEach((el) => {

            if ( el.dataset.globalField === 'input' ) {

                el.addEventListener('keyup', (e) => {
                    let inputValue = e.target.value;
                    if ( inputValue !== '') {
                        e.target.classList.add(_value);
                    }
                    else {
                        e.target.classList.remove(_value);
                    }
                });
            
            }

            if ( el.dataset.globalField === 'select' ) {

                el.addEventListener('change', (e) => {
                    let inputValue = e.target.value;
                    if ( inputValue !== '') {
                        e.target.classList.add(_value);
                    }
                    else {
                        e.target.classList.remove(_value);
                    }
                });
            
            }
       
        
        });
    
    }

};

export default appForms