import ButtonEvents from './buttonEvents';
import WindowEvents from './windowEvents';
import graphEvents from '../../app/events';
import viewEvents from './viewEvents';

const init = () => {
  ButtonEvents();
  WindowEvents(graphEvents, viewEvents);
};

export default init;


