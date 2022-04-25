const parallaxImages = {

    init() {
        const parallaxables = document.querySelectorAll('.parallax');

        function runParallaxLoop() {
            requestAnimationFrame(runParallaxLoop);
            parallax();
        }

        function parallax() {
            parallaxables.forEach(parallaxable => {
                let distance = window.scrollY * 0.5;
                parallaxable.style.transform = `translate3d(0,-${distance}px, 0)`;
            });
        }

        runParallaxLoop();
    
    }

};

export default parallaxImages
