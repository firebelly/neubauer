// Import local dependencies
import appState from './utils/appState';
import tabbedContent from './components/tabbedContent';
import accordionMenu from './components/accordionMenu';
import flyoutContent from './components/flyoutContent';
import dialogContent from './components/dialogContent';
import parallaxImages from './components/parallaxImages';
import scrollCarousel from './components/scrollCarousel';
import scrollChyron from './components/scrollChyron';

// Inits
appState.init();

// Components
accordionMenu.init();
flyoutContent.init('nav');
dialogContent.init({
    id: 'resultsFilter',
    gallery: false
});
dialogContent.init({
    id: 'artModal',
    gallery: true
});

if (document.querySelectorAll('[role="tablist"]').length > 0 ) {
    tabbedContent.init();
}

// Homepage Parallax
parallaxImages.init();

// Homepage Carousels:
const peopleCarousel = new scrollCarousel({
    _id: 'people'
});
if ( peopleCarousel.carousel !== null ) {
    peopleCarousel.init();
}
const eventsCarousel = new scrollCarousel({
    _id: 'events'
});
if ( eventsCarousel.carousel !== null ) {
    eventsCarousel.init();
}
const newsCarousel = new scrollCarousel({
    _id: 'news'
});
if ( newsCarousel.carousel !== null ) {
    newsCarousel.init();
}

// Chyron
const footerChyron = new scrollChyron({
    _id: 'footer'
});
if ( footerChyron.chyron !== null ) {
    footerChyron.init();
}