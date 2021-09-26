export default class PageLoadBalancing {
  init( append_element: HTMLElement ): void {
    const WRAP = Object.assign(document.createElement('div'));
    const ELE  = document.createElement('div');
    ELE.innerHTML = `
      <h1>Need to create a diagram mapper for the resource flow</h1>
      <h3>Discuss Health Checks, and the possible need for redundant LBs for availability</h3>
      <table><tbody>
      <tr><td>
        <h3>Round Robin</h3>
        <p>
          Round-robin load balancing is one of the simplest and most used load balancing algorithms. Client requests are 
          distributed to application servers in rotation.
        </p>
      </td>
      <td>
        <h3>Weighted Round Robin</h3>
        <p>
          Weighted Round Robin builds on the simple Round-robin load balancing algorithm to account for differing 
          application server characteristics. The administrator assigns a weight to each application server based on
          criteria of their choosing to demonstrate the application servers traffic-handling capability. If application 
          server #1 is twice as powerful as application server #2 (and application server #3), application server #1 
          is provisioned with a higher weight
        </p>
      </td>
      <td>
        <h3>Least Connection</h3>
        <p>
          Least Connection load balancing is a dynamic load balancing algorithm where client requests are distributed 
          to the application server with the least number of active connections at the time the client request is 
          received. In cases where application servers have similar specifications, an application server may be 
          overloaded due to longer lived connections; this algorithm takes the active connection load into 
          consideration.
        </p>
      </td>
      <td>
        <h3>Weighted Least Connection</h3>
        <p>
          Weighted Least Connection builds on the Least Connection load balancing algorithm to account for differing 
          application server characteristics.
        </p>
      </td>
      <td>
        <h3>Resource Based (Adaptive)</h3>
        <p>
          Resource Based (Adaptive) is a load balancing algorithm requires an agent to be installed on the application 
          server that reports on its current load to the load balancer. The installed agent monitors the application 
          servers availability status and resources. The load balancer queries the output from the agent to aid in load 
          balancing decisions.
        </p> 
      </td></tr>
      </tbody></table>
      
      <h3>Where can Load Balancers Be Placed?</h3>
      <table><tbody>
        <tr>
          <td>Between client browser and application servers</td>
          <td>Between server and database servers</td>
          <td>Between server and cache servers</td>
        </tr>
      </tbody></table>
      
      <h3>General Definitions</h3>
      <table><tbody>
        <tr>
          <td>
            Sticky sessions<br />
            Mechanism to route requests from the same client to the same target. Elastic Load Balancers 
            support sticky sessions.
          </td>
        </tr>
      </tbody></table>
    `;


    WRAP.append( ELE );
    append_element.append( WRAP , this.domLoadBalanceChooser() );
  }

  domLoadBalanceChooser() {
    const HTML = `
      <div class="summary"></div>
      <table class="load-balancer-choice"><tbody>
        <tr>
          <td>
            <ul>
              <li class="host-select active">AWS</li>
              <li class="host-select">Google Cloud</li>
              <li class="host-select">Rackspace</li>
            </ul>
          </td>
          <td id="host-aws-load-balance-options">
            <ul>
              <li>
                <strong>Round robin routing algorithm</strong><br /><br />
                Application (ELB2)<br />
                - Fixed Response?<br />
                - Fixed Redirection?<br />
                - Offload User Auth? ( OIDC, SAML, LDAP, Facebook, Google )<br />
                - Automatic scaling of capacity<br />
                - Specify HTTP response for health<br />
                - Use only ALB generated cookies?<br />
                - Path based routing?<br />
                - Protocol ( HTTP, HTTPS, HTTP/2, WebSockets )
              </li>
              <li>
                <strong>
                  Flow hash routing algorithm<br />
                  Possibly flow of traffic and where it originates
                </strong><br /><br />
                Network (ELB2)<br />
                - Network only ( doesn't see cookies, headers, etc )<br />
                - Layer 4 ( TCP , UPD , TLS )<br />
                - Generally not used for web apps
              </li>
              <li>
                <strong>
                  Round robin routing algorithm for TCP listeners<br />
                  Least outstanding requests routing algorithm for HTTP and HTTPS listeners
                </strong><br /><br />
                Classic (Elastic ELB1)<br />
                - Running EC2 Classic?<br />
                - Need sticky (custom app) session cookies?<br />
                - General health check (auto)<br />
                - Protocol ( HTTP, HTTPS, TCP, SSL )<br />
                - Auth done by application
              </li>
            </ul>
          </td>
        </tr>
      </tbody></table>
    `;

    const ELE = Object.assign( document.createElement('div' ) , { id: 'load-balance-chooser' } );
    ELE.innerHTML = HTML;


    return ELE;
  }
}