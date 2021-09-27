import BrowserHistory     from '@class/BrowserHistory';
import PageHome           from '@page/PageHome';
import PageMySql          from '@page/PageMySql';
import PageApi            from '@page/PageApi';
import PageLoadBalancing  from '@page/PageLoadBalancing';
import PageCaching        from '@page/PageCaching';
import PageDbTypes        from '@page/PageDbTypes';
import PageUsergroupsPermissions from '@page/PageUsergroupsPermissions';

const APP_ELE         = document.getElementById( 'app' ) as HTMLElement;
const BROWSER_CLASSES = {
  'home':                   new PageHome(),
  'mysql':                  new PageMySql(),
  'api':                    new PageApi(),
  'usergroupspermissions':  new PageUsergroupsPermissions(),
  'loadbalancing':          new PageLoadBalancing(),
  'caching':                new PageCaching(),
  'dbtypes':                new PageDbTypes()
};

const BROWSER_HISTORY = new BrowserHistory( BROWSER_CLASSES , 'home' , APP_ELE );

document.querySelectorAll('.nav').forEach( ele => {
  ele.addEventListener( 'click' , event => {
    const ELE = event.target as HTMLElement;
    BROWSER_HISTORY.forward( ELE.innerText );
  });
});