// scrollChyron
class scrollChyron {

    constructor(options) {

        this.options = options || null;
        this._id     = this.options._id;
        this.chyron  = this._id !== null ? document.querySelector(`[data-chyron="${this._id}"]`) : null;
        
        this._scrollable = true;
        this._paused     = false;
        this._viewable   = false;

        this._reset    = '_is-resetting';
        this._interval = 20;

    }

    isChyronInView(el) {

        let self = this;

        let bounding = el.getBoundingClientRect();

        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
       
    }

    pauseScroll() {

        let self = this;

        self._paused = !self._paused;

    }

    resetScroll() {

        let self = this;

        self.chyron.classList.add(self._reset);
        self.chyron.scrollTo(0,0);
        self.chyron.classList.remove(self._reset);

        self.scrollInterval = setInterval(() => self.autoScroll(), self._interval);

    }

    autoScroll() {

        let self = this;

        let currentLeft = self.chyron.scrollLeft,
            chyronWidth = (self.chyron.scrollWidth - self.chyron.offsetWidth);
        
        // update scrollable bool based on scroll position
        self._scrollable = (currentLeft !== chyronWidth);

        if ( self._paused ) {
            return;
        }

        console.log('chyron...');

        // if we've reached the end of the chyron, 
        // clear the interval, and reset 
        if ( !self._scrollable ) {
            clearInterval(self.scrollInterval);
            self.resetScroll();
        }

        self.chyron.scrollTo(self.chyron.scrollLeft + 1, 0);

    }

    hashScroll() {
        // chyron scroll event is interfering with scrollto event
        // more time, better code, but for now...
        let self = this;
    
        let hashies = document.querySelectorAll('[data-hash-scroll]');

        hashies.forEach(function(item) {

            item.addEventListener('click',(e) => {
                
                e.stopPropagation();
                e.preventDefault();
                
                let myHash    = e.target.hash,
                    hashHomie = document.querySelector(myHash),
                    hashTop   = hashHomie.offsetTop;

                self._paused = true;
               
                window.scrollTo(0,hashTop);
 
            });

        });
        
    }

    dialogScroll() {
        // should have set this up differently

        let self = this;

        let dialogTrigger = document.querySelectorAll('[data-a11y-dialog-show]');

        dialogTrigger.forEach(function(item) {

            // item.addEventListener('click',(e) => {
                
            //     e.stopPropagation();
            //     e.preventDefault();

            //     let myHash    = e.target.hash,
            //         hashHomie = document.querySelector(myHash);
            //         // hashTop   = hashHomie.offsetTop;

            //     let dialogContainer = document.getElementById('artModal_dialog'),
            //         dialogList      = document.getElementById('artModal_container');
            //         // dialogHeight    = dialogContainer.offsetHeight,
            //         // listHeight      = dialogList.offsetHeight;
                
            //     // console.log(hashTop,dialogContainer,listHeight);

            //     self._paused = true;

            //     dialogContainer.addEventListener('scroll', function() {
            //         console.log('scrolling in modal');
            //     });
 
            // });

        });

    }


    init() {

        let self = this;
    
        window.addEventListener('load',() => {

            let hasHash = (window.location.hash !== '');

            if ( hasHash) {
                let currentHash = window.location.hash,
                    hashHomie   = document.querySelector(currentHash),
                    hashTop     = hashHomie.offsetTop;

                setTimeout(function() {
                    window.scrollTo(0, hashTop);
                }, 1);
            }

            self.chyron.addEventListener('mouseover', () => self.pauseScroll(), );
            self.chyron.addEventListener('mouseout', () => self.pauseScroll() );

            // Only play chyron when in view
            self._paused = self.isChyronInView(self.chyron) ? false : true;     
            
            self.scrollInterval = setInterval(() => self.autoScroll(), self._interval);

            document.addEventListener('scroll', function() {
                // Only play chyron when in view
                console.log('scrolling');
                self._paused = self.isChyronInView(self.chyron) ? false : true;
            });

            self.hashScroll();
            self.dialogScroll();

        });
        
    }

}

export default scrollChyron


