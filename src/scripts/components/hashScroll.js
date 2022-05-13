// hashScroll
const hashScroll = {

    init() {

        let self = this;
    
        let hashies = document.querySelectorAll('[data-hash-scroll]');

        hashies.forEach(function(item) {

            item.addEventListener('click',(e) => {
                
                e.stopPropagation();
                e.preventDefault();
                
                let myHash    = e.target.hash,
                    hashHomie = document.querySelector(myHash); 
                
                    console.log(myHash, hashHomie);

                hashHomie.scrollIntoView();
 

            });

        });
        
    }

}

export default hashScroll
