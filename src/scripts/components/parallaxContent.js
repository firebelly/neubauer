class parallaxContent {

    constructor(options) {

        this.options = options || null;
        this._id     = this.options._id;

        this.images     = this._id !== null ? document.querySelectorAll(`[data-parallax-image="${this._id}"]`) : null;
        this.containers = this._id !== null ? document.querySelectorAll(`[data-parallax-container="${this._id}"]`) : null;
        
        // Parallax state: _default, _active, _done
        this._state = this.state ?? '_default'; 
        // Styling hook for transitions
        this._isSliding = '_is-sliding';

        this._imagePad = 33;
        
    }

    isContentInView(el) {

        let self = this;

        let pageTop    = window.scrollY,
            pageBottom = pageTop + window.innerHeight,
            elTop      = el.offsetTop,
            elBottom   = elTop + el.offsetHeight;

        return ( pageTop < elBottom );
       
    }

    translateContent(el,distance) {
        
        let self = this;

        if ( self._state !== '_default' ) {
            el.classList.add(self._isSliding);
        }
        
        el.style.transform = `translate3d(0,-${distance}px, 0)`;

    }

    slideState() {

        let self = this;

        function slideThings(container) {

            let title   = container.querySelector(`[data-parallax-title="${self._id}"]`),
                image   = container.querySelector(`[data-parallax-image="${self._id}"]`),
                feature = container.querySelector(`[data-parallax-feature="${self._id}"]`),
                header  = document.querySelector(`[data-parallax-header="${self._id}"]`),
                action  = document.querySelector(`[data-parallax-follow="${self._id}"]`);
            
            if ( self._state === '_active' ) {

                if ( title !== null ) {
                    let headerHeight  = header.offsetHeight,
                        titleDistance = title.offsetTop + title.offsetHeight + headerHeight;
                    self.translateContent(title,titleDistance);
                }

                if ( image !== null ) {
                    let imageDistance = self._imagePad;
                    self.translateContent(image,imageDistance);
                }

                if ( feature !== null ) {
                    let featureDistance = feature.offsetTop;
                    self.translateContent(feature,featureDistance);
                }

                feature.addEventListener('transitionend', () => {

                    self._state = '_done';

                    container.addEventListener('click', (e) => {

                        e.stopPropagation();
                        
                        if ( e.target !== action ) {
                            slideThings(container);
                        }
                   
                    });

                });

            }
            
            if ( self._state === '_done' ) {
                
                let slideables = [title,image,feature];

                slideables.forEach((el) => {
                    self.translateContent(el,0);
                });

                feature.addEventListener('transitionend', () => {
                    self._state = '_default';
                    slideables.forEach((el) => {
                        el.classList.remove(self._isSliding);
                    });
    
                });

            }

        }

        self.containers.forEach((el) => {

            const trigger = el.querySelector(`[data-parallax-title-trigger="${self._id}"]`);

            if ( trigger !== null ) {
                trigger.addEventListener('click', () => {
                    self._state = '_active';
                    slideThings(el);
                });
            }        

        });

    }

    defaultState() {

        let self = this;

        self.images.forEach(image => {

            let container = image.closest(`[data-parallax-container="${self._id}"]`);

            document.addEventListener('scroll', function() {

                let distance = window.scrollY * 0.5;

                // Throttle the scroll event
                window.requestAnimationFrame(function() {
                    
                    // Enable the parallax only when visible
                    let enableParallax = self.isContentInView(container);

                    if ( enableParallax && self._state === '_default' ) {
                        self.translateContent(image,distance);
                    }
                
                });
            
            });
        
        });


    }

    init() {

        let self = this;

        if ( self.images !== null ) {
            self.defaultState();
        }
        
        if ( self.containers !== null ) {
            self.slideState();
        }
    
    }

}

export default parallaxContent
