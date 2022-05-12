// hashScroll
const hashScroll = {

    init() {

        let self = this;
    
        let hashies = document.querySelectorAll('[data-hash-scroll]');

        hashies.forEach(function(item) {

            item.addEventListener('click', (e) => {
                // e.stopPropagation();
                // e.preventDefault();
                
                // console.log(e);

            });

        });
        
    }

}

export default hashScroll
