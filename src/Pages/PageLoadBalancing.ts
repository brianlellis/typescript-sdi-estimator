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
      
      <h3>General Definitions and Strategies</h3>
      <table><tbody>
        <tr>
          <td>
            <strong>Sticky sessions</strong><br />
            Mechanism to route requests from the same client to the same target. Elastic Load Balancers 
            support sticky sessions.
          </td>
          <td>
            <strong>Database Read Replication/Mirroring</strong><br />
            You can create one or more replicas of a given source DB Instance and serve high-volume application read 
            traffic from multiple copies of your data, thereby increasing aggregate read throughput. Read replicas can 
            also be promoted when needed to become standalone DB instances. 
          </td>
          <td>
            <strong>Database Sharding</strong><br />
            Creating segmented groups of data based on rules which a router will then determine which shard to use
            to increase read performance
          </td>
          <td>
            <strong>Data Deduplication</strong>
            At its simplest definition, data deduplication refers to a technique for eliminating redundant data in a 
            data set. In the process of deduplication, extra copies of the same data are deleted, leaving only one copy 
            to be stored. The data is analyzed to identify duplicate byte patterns and ensure the single instance is 
            indeed the only file. Then, duplicates are replaced with a reference that points to the stored chunk.
            <br /><br />
            Consider an email server that contains 100 instances of the same 1 MB file attachment, for example a sales 
            presentation with graphics sent to everyone on the global sales staff. Without data duplication, if everyone 
            backs up his email inbox, all 100 instances of the presentation are saved, requiring 100 MB of storage space. 
            With data deduplication, only one instance of the attachment is actually stored; each subsequent instance 
            is referenced back to the one saved copy
          </td>
          <td>
            <strong>File Storage: EFS , S3 , Glacier</strong><br />
              EFS - If you need near same server fetch performance
              S3 - Somewhat slower but still usable for multi instance coverage
              Glacier - Archiving of assets only, do not use for CDN
          </td>
        </tr>
      </tbody></table>
    `;


    WRAP.append( ELE );
    append_element.append( WRAP , this.domShardingBreakdown() , this.domLoadBalanceChooser() );
  }

  domShardingBreakdown() {
    const HTML = `
      <h3>Breaking Down Sharding</h3>
      <table><tbody><tr>
        <td>
          <strong>ADVANTAGES</strong><br />
          - Horizontal Scaling<br />
          - Speed up query response due to fewer rows
          - Availability/Reliabilty as outage of one shard doesn't affect all data
        </td>
        <td>
          <strong>DISADVANTAGES</strong><br />
          - More complex to setup if tools aren't readily used<br />
          - Management and developing against shards is more intensive<br />
          - Unbalanced shards due to incorrect rule/route configuration<br />
          - Will require extra work to unify the shards again
          - May not be natively supported based on DB type used
        </td>
        <td>
          <strong>ARCHITECTURE - Key/Hash Based</strong><br />
          Involves using a value taken from newly written data — such as a customer’s ID number, a client application’s 
          IP address, a ZIP code, etc. — and plugging it into a hash function to determine which shard the data should 
          go to. <strong>To ensure that entries are placed in the correct shards and in a consistent manner, the values 
          entered into the hash function should all come from the same column.</strong>
        </td>
        <td>
          <strong>ARCHITECTURE - Range Based</strong><br />
          Every shard holds a different set of data but they all have an identical schema as one another, as well as 
          the original database. The application code just reads which range the data falls into and writes it to the 
          corresponding shard.<strong>More susceptible to data storage hotspots ( unbalancing )</strong>
        </td>
        <td>
          <strong>ARCHITECTURE - GEO Based</strong><br />
          Shards data based on the geo-location of a person.
        </td>
        <td>
          <strong>ARCHITECTURE - Directory/Delivery Zone Based</strong><br />
          In a nutshell, a lookup table is a table that holds a static set of information about where specific data can 
          be found. The main appeal of directory based sharding is its flexibility. Range based sharding architectures 
          limit you to specifying ranges of values, while key based ones limit you to using a fixed hash function which, 
          as mentioned previously, can be exceedingly difficult to change later on. Directory based sharding, on the 
          other hand, allows you to use whatever system or algorithm you want to assign data entries to shards<br />
        </td>
        <td>
          <strong>RELIABILITY THROUGH REPLICATION</strong><br />
          To increase reliability of the shards replication should occur on the shards to allow for fail over
        </td>
      </tr></tbody></table>
    `;

    const ELE = document.createElement('div' );
    ELE.innerHTML = HTML;
    return ELE;
  }

  domLoadBalanceChooser() {
    const HTML = `
      <h3>Load Balancing Services</h3>
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