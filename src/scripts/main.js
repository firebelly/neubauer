// Import local dependencies
import appState from './utils/appState';
import appForms from './utils/appForms';
import tabbedContent from './components/tabbedContent';
import accordionMenu from './components/accordionMenu';
import flyoutContent from './components/flyoutContent';
import dialogContent from './components/dialogContent';
import parallaxContent from './components/parallaxContent';
import scrollCarousel from './components/scrollCarousel';
import scrollChyron from './components/scrollChyron';


// Inits
appState.init();

appForms.init();

// Chyron
const footerChyron = new scrollChyron({
    _id: 'footer'
});
if ( footerChyron.chyron !== null ) {
    footerChyron.init();
}

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
const homepageCover = new parallaxContent({
    _id: 'cover'
});
if ( homepageCover.images !== null || homepageCover.titles !== null ) {
    homepageCover.init();
}

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

