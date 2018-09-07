import ButtonEvents from './buttonEvents';
import WindowEvents from './windowEvents';
import graphEvents from '../../app/events';

const init = ()=>{
  ButtonEvents();
  WindowEvents(graphEvents);
};

export default init;


