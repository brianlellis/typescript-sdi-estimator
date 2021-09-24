import BrowserHistory   from '@class/BrowserHistory';
import PageHome         from '@page/PageHome';
import PageMySql        from '@page/PageMySql';

const APP_ELE         = document.getElementById( 'app' ) as HTMLElement;
const BROWSER_CLASSES = {
  'home':  new PageHome(),
  'mysql': new PageMySql()
};

const BROWSER_HISTORY = new BrowserHistory( BROWSER_CLASSES , 'home' , APP_ELE );

document.querySelectorAll('.nav').forEach( ele => {
  ele.addEventListener( 'click' , event => {
    const ELE = event.target as HTMLElement;
    BROWSER_HISTORY.forward( ELE.innerText );
  });
});