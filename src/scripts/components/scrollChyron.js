// scrollChyron
class scrollChyron {

    constructor(options) {

        this.options = options || null;
        this._id     = this.options._id;
        this.chyron  = this._id !== null ? document.querySelector(`[data-chyron="${this._id}"]`) : null;
        
        this._scrollable = true;
        this._paused     = false;

        this._reset = '_is-resetting';

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

        self.scrollInterval = setInterval(() => self.autoScroll(), 15);

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

        console.log('scrolling...');

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

            self.chyron.addEventListener("mouseover", () => self.pauseScroll() );
            self.chyron.addEventListener("mouseout", () => self.pauseScroll() );

            self.scrollInterval = setInterval(() => self.autoScroll(), 15);

        });
        
    }

}

export default scrollChyron


