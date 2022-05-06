// scrollCarousel  
// Initialize with options
// const peopleCarousel = new scrollCarousel({
//     _id: 'people'
// });
// if ( peopleCarousel.carousel !== null ) {
//     peopleCarousel.init();
// }
//
class scrollCarousel {

    constructor(options) {

        this.options = options || null;
       	
        this._id   = this.options._id;

        // Parent container
        this.carousel = this._id !== null ? document.querySelector(`[data-carousel="${this._id}"]`) : null;
        
        if ( this.carousel !== null ) {
            // Els
            this.previousButton  = this.carousel.querySelector('[data-carousel-prev]');
            this.nextButton      = this.carousel.querySelector('[data-carousel-next]');
            this.slideFrame      = this.carousel.querySelector('[data-carousel-frame]');
            this.slideContainer  = this.carousel.querySelector('[data-carousel-slides]');
            this.slides          = this.slideContainer.querySelectorAll('[data-carousel-item]');
            
            // Ints
            this._current = 0;
            this._count   = this.slides.length;
        }
    
    }

    goToSlide(_idx) {

        let self = this;

        let _slideOffset  = self.slides[_idx].offsetLeft,
            _slideLeft    = _slideOffset + self.slides[_idx].offsetWidth,
            _parentOffset = self.slideContainer.offsetLeft,
            _parentLeft   = _parentOffset + self.slideContainer.offsetWidth;

        self.slideContainer.scrollLeft = _slideOffset - _parentOffset;

    }    

    previousSlide(e) {

        let self = this;

        e.preventDefault();

        let _prev = self._current - 1;

        self._current = (_prev < 0) ? (self._count - 1) : _prev;

        self.goToSlide(self._current);

    }

    nextSlide(e) {

        e.preventDefault();

        let self = this;

        let _next = self._current + 1;

        self._current = (_next < this._count) ? _next : 0;

        self.goToSlide(self._current);
       
    }

    startSlide(e) {

        e.preventDefault();

        let self = this;

        console.log('start');
       
    }

    stopSlide(e) {

        e.preventDefault();

        let self = this;

        console.log('stop');
    }

    init() {

        let self = this;

        // Set up previous/next button behaviors
        self.previousButton.addEventListener('click', (e) => self.previousSlide(e) );
        self.nextButton.addEventListener('click', (e) => self.nextSlide(e) );

        self.slideContainer.addEventListener("mouseover", (e) => self.startSlide(e) );
        self.slideContainer.addEventListener("mouseover", (e) => self.stopSlide(e) );
        
    }

}

export default scrollCarousel