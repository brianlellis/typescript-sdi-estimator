import BrowserHistory     from '@class/BrowserHistory';
import PageHome           from '@page/PageHome';
import PageMySql          from '@page/PageMySql';
import PageApi            from '@page/PageApi';
import PageLoadBalancing  from '@page/PageLoadBalancing';

const APP_ELE         = document.getElementById( 'app' ) as HTMLElement;
const BROWSER_CLASSES = {
  'home':           new PageHome(),
  'mysql':          new PageMySql(),
  'api':            new PageApi(),
  'loadbalancing':  new PageLoadBalancing()
};

const BROWSER_HISTORY = new BrowserHistory( BROWSER_CLASSES , 'home' , APP_ELE );

document.querySelectorAll('.nav').forEach( ele => {
  ele.addEventListener( 'click' , event => {
    const ELE = event.target as HTMLElement;
    BROWSER_HISTORY.forward( ELE.innerText );
  });
});