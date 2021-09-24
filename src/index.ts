import BrowserHistory   from '@class/BrowserHistory';
import PageHome         from '@page/PageHome';
import PageMySql        from '@page/PageMySql';

const PAGE_HOME   = new PageHome();
const PAGE_MYSQL  = new PageMySql();
const APP_ELE     = document.getElementById( 'app' ) as HTMLElement;

const BROWSER_CLASSES = {
  'home':  PAGE_HOME.init,
  'mysql': PAGE_MYSQL.init
};

const BROWSER_HISTORY = new BrowserHistory( BROWSER_CLASSES , 'home' , APP_ELE );

document.querySelectorAll('.nav').forEach( ele => {
  ele.addEventListener( 'click' , event => {
    const ELE          = event.target as HTMLElement;
    const CLASS_CHECK  = ELE.innerText;
    BROWSER_HISTORY.forward( CLASS_CHECK , APP_ELE );
  });
});