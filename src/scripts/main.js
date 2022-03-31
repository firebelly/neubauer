// Import local dependencies
import appState from './utils/appState';
import accordionMenu from './components/accordionMenu';
import flyoutContent from './components/flyoutContent';
import searchFilters from './components/searchFilters';

// Inits
appState.init();

// Components
accordionMenu.init();
flyoutContent.init('nav');
searchFilters.init('resultsFilter_dialog');


