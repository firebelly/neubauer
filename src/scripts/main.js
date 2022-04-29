// Import local dependencies
import appState from './utils/appState';
import tabbedContent from './components/tabbedContent';
import accordionMenu from './components/accordionMenu';
import flyoutContent from './components/flyoutContent';
import searchFilters from './components/searchFilters';
import parallaxImages from './components/parallaxImages';
import contentCarousel from './components/contentCarousel';

// Inits
appState.init();

// Components
accordionMenu.init();
flyoutContent.init('nav');
searchFilters.init('resultsFilter_dialog');

if (document.querySelectorAll('[role="tablist"]').length > 0 ) {
    tabbedContent.init();
}

parallaxImages.init();
contentCarousel.init({'group': 3});