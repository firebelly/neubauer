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

    init() {

        let self = this;
    
        window.addEventListener('load',() => {

            self.chyron.addEventListener('mouseover', () => self.pauseScroll(), );
            self.chyron.addEventListener('mouseout', () => self.pauseScroll() );

            // Only play chyron when in view
            self._paused = self.isChyronInView(self.chyron) ? false : true;     
            
            self.scrollInterval = setInterval(() => self.autoScroll(), self._interval);

            document.addEventListener('scroll', function() {
                // Only play chyron when in view
                self._paused = self.isChyronInView(self.chyron) ? false : true;

            });

        });
        
    }

}

export default scrollChyron


