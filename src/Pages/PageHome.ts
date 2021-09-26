export default class PageHome {
  init( append_element: HTMLElement ): void {
    const WRAP = Object.assign(document.createElement('div'));
    const ELE  = document.createElement('div');
    ELE.innerHTML = `
      <h1>Key Characteristics</h1>
      <table><tbody>
        <tr><td>
          <h3>Scalability</h3>
          <p>
            Scalability is the capability of a system, process, or a network to grow and manage increased demand. Any 
            distributed system that can continuously evolve in order to support the growing amount of work is considered to 
            be scalable. Vertical is a single server situation vs horizontal scaling multiple servers through multiple 
            instances
          </p>
        </td>
        <td>
          <h3>Reliability</h3>
          <p>
            By definition, reliability is the probability a system will fail in a given period. In simple terms, a 
            distributed system is considered reliable if it keeps delivering its services even when one or several of its 
            software or hardware components fail.
          </p>
        </td>
        <td>
          <h3>Availability</h3>
          <p>
            By definition, availability is the time a system remains operational to perform its required function in a 
            specific period. It is a simple measure of the percentage of time that a system, service, or a machine remains 
            operational under normal conditions.
          </p>
          <p>
            If a system is reliable, it is available. However, if it is available, it is not necessarily reliable. In other 
            words, high reliability contributes to high availability, but it is possible to achieve a high availability 
            even with an unreliable product by minimizing repair time and ensuring that spares are always available when 
            they are needed. Let’s take the example of an online retail store that has 99.99% availability for the first 
            two years after its launch. However, the system was launched without any information security testing. The 
            customers are happy with the system, but they don’t realize that it isn’t very reliable as it is vulnerable to 
            likely risks.
          </p>
        </td>
        <td>
          <h3>Efficiency</h3>
          <p>
            To understand how to measure the efficiency of a distributed system, let’s assume we have an operation that 
            runs in a distributed manner and delivers a set of items as result. Two standard measures of its efficiency 
            are the response time (or latency) that denotes the delay to obtain the first item and the throughput 
            (or bandwidth) which denotes the number of items delivered in a given time unit (e.g., a second). The two 
            measures correspond to the following unit costs:
          </p>
          <ul>
            <li>Number of messages globally sent by the nodes of the system regardless of the message size.</li>
            <li>Size of messages representing the volume of data exchanges.</li>    
          </ul>
        </td></tr>
      </tbody></table>
      
      <h1>General Order of Questions</h1>
      <ol>
        <li>What is it?</li>
        <li>Why we need it?</li>
        <li>Requirements ( MVP )</li>
        <li>Goals ( Possibly Stretch )</li>
        <li>Order of Importance Capacity Estimations</li>
        <li>Schema Design, Size Est. and DB Type</li>
        <li>High-Level Estimate from Steps 5-6</li>
        <li>API Endpoint Design (This still needs throttling concerns)</li>
        <li>
            Security, Permisssions, Usergroups, user allowed to control public access of their data (Application level)
        </li>
        <li>DB Partition, redundancy, sharding, replication, purge, cleanup, deduplication</li>
        <li>In memory caching needs and other cache methods</li>
        <li>Metadata partition mapping</li>
        <li>Load Balancing</li>
        <li>Client access throttling, region locking</li>
        <li>Telemetry and Analytics</li>
        <li>Server/Node Monitoring Tool Reqs</li>
      </ol>
    `;
    WRAP.append( ELE );
    append_element.append( WRAP );
  }
}