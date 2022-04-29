// contentCarousel  
/*
Adapted from:
https://dev.to/jasonwebb/how-to-build-a-more-accessible-carousel-or-slider-35lp
*/
//
const contentCarousel  = {

    init(options) {

        this.carousel        = document.querySelector('[data-carousel]');
        this.previousButton  = this.carousel.querySelector('[data-carousel-prev]');
        this.nextButton      = this.carousel.querySelector('[data-carousel-next]');
        this.slideNav        = this.carousel.querySelector('[data-carousel-nav]');
        this.slidesContainer = this.carousel.querySelector('[data-carousel-slides]');
        this.slides          = this.slidesContainer.querySelectorAll('[data-carousel-item]');
        this.slideDots       = this.slideNav.querySelectorAll('[data-carousel-button]');

        this.leftIndex  = 0;
        this.slideGap   = 5;
        this.slideGroup = options.group != null ? options.group : 3;
        this.slideCount = this.slides.length;

        this.bind();
    
    },

    previousSlide() {

        let self = this;

        if ( self.leftIndex > 0 ) {
            self.goToSlide(self.leftIndex - 1);
        } 
        else {
            self.goToSlide(self.slideCount - 1);
        }

    },

    nextSlide() {

        let self = this;

        if ( self.leftIndex < self.slideCount - 1) {
            self.goToSlide(self.leftIndex + 1);
        } 
        else {
            self.goToSlide(0);
        }
    },

    goToSlide(nextLeftIndex) {
        
        let self = this;

        // Smoothly scroll to the requested slide
        self.slidesContainer.animate({
            scrollLeft: (self.slidesContainer.offsetWidth / 3) * nextLeftIndex
        }, {
            duration: 200
        });
        
        // Unset aria-current attribute from any slide dots that have it
        self.slideDots.forEach(function(dot) {
            dot.removeAttribute('aria-current');
        });
        
        // Set aria-current attribute on the correct slide dot
        self.slideDots[nextLeftIndex].setAttribute('aria-current', true);
        
        // Update the record of the left-most slide
        self.leftIndex = nextLeftIndex;
        
        // Update each slide so that the ones that are now off-screen are fully hidden.
        self.hideNonVisibleSlides();
    
    },

    // hideNonVisibleSlides
    // Fully hide non-visible slides by adding aria-hidden="true" and tabindex="-1" when they go out of view
    hideNonVisibleSlides() {

        let self = this;

        // Start by hiding all the slides and their content
        self.slides.forEach(function(slide) {
            
            slide.setAttribute('aria-hidden', true);
            
            slide.querySelectorAll('a, button, select, input, textarea, [tabindex="0"]').forEach(function(focusableElement) {
                focusableElement.setAttribute('tabindex', -1);      
            });

        });
        
        // Slide Group = number of slides visible at a time
        // Ensure the left-most slide group is visible
        let slideDiff = self.slideCount - self.slideGroup;
        if ( self.leftIndex < slideDiff) {

            for ( var i = self.leftIndex; i < self.leftIndex + self.slideGroup; i++) {
                
                self.slides[i].removeAttribute('aria-hidden');
            
                self.slides[i].querySelectorAll('a, button, select, input, textarea, [tabindex="0"]').forEach(function(focusableElement) {
                    focusableElement.removeAttribute('tabindex');      
                });
            }
        } 
        else {
            // Since scrolling stops when the carousel reaches the last 3 slides 
            // ensure last 3 slides stay visible until the user wraps or goes backwards.
            for (var i = slideDiff; i < self.slideCount; i++) {
                self.slides[i].removeAttribute('aria-hidden');
                
                self.slides[i].querySelectorAll('a, button, select, input, textarea, [tabindex="0"]').forEach(function(focusableElement) {
                    focusableElement.removeAttribute('tabindex');      
                });
            }
        }
    },

    bind() {

        let self = this;

        // Set up previous/next button behaviors
        self.previousButton.addEventListener('click', (e) => self.previousSlide() );
        self.nextButton.addEventListener('click', (e) => self.nextSlide() );
        
        // Ensure that all non-visible slides are impossible to reach.
        self.hideNonVisibleSlides();
    
        // Set up the slide dot behaviors
        self.slideDots.forEach(function(dot) {

            dot.addEventListener('click', function(e) {

                let clickedDot = e.target,
                    navItem    = clickedDot.parentElement,
                    dotIndex = Array.from(self.slideNav.children).indexOf(navItem);
            
                self.goToSlide(dotIndex);

            });
        });
    
    }

};

export default contentCarousel