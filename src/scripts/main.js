// Import local dependencies
import appState from './utils/appState';
import accordionMenu from './components/accordionMenu';
import flyoutContent from './components/flyoutContent';

// Inits
appState.init();

// Components
accordionMenu.init();
flyoutContent.init('nav');
