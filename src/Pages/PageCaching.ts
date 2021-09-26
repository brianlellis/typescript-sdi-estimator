export default class PageCaching {
  init( append_element: HTMLElement ): void {
    const WRAP = Object.assign(document.createElement('div'));
    const ELE  = document.createElement('div');
    ELE.innerHTML = `
      <h1>Types of Cache</h1>
      <table><tbody>
      <tr><td>
        <h3>Application Server [data]</h3>
        <p>
          Placing a cache directly on a request layer node enables the local storage of response data. Each time a 
          request is made to the service, the node will quickly return locally cached data if it exists. If it is not 
          in the cache, the requesting node will fetch the data from the disk. The cache on one request layer node could 
          also be located both in memory (which is very fast) and on the node’s local disk (faster than going to network 
          storage).
        </p>
      </td>
      <td>
        <h3>Content Delivery Network (CDN) [static assets]</h3>
        <p>
          CDNs are a kind of cache that comes into play for sites serving large amounts of static media. In a typical 
          CDN setup, a request will first ask the CDN for a piece of static media; the CDN will serve that content if 
          it has it locally available. If it isn’t available, the CDN will query the back-end servers for the file, 
          cache it locally, and serve it to the requesting user.
        </p>
      </td>
      <td>
        <h3>Subdomain/Dedicated Static Server [data]</h3>
        <p>
          If the system we are building is not large enough to have its own CDN, we can ease a future transition by 
          serving the static media off a separate subdomain (e.g., static.yourservice.com) or separate server nodes.
        </p>
      </td></tr>
      </tbody></table>
      
      <h1>Cache Invalidation [data]</h1>
      <table><tbody>
      <tr><td>
        <h3>Write-through cache</h3>
        <p>
          Under this scheme, data is written into the cache and the corresponding database simultaneously. The cached 
          data allows for fast retrieval and, since the same data gets written in the permanent storage, we will have 
          complete data consistency between the cache and the storage. Also, this scheme ensures that nothing will get 
          lost in case of a crash, power failure, or other system disruptions.
        </p>
        <p>
          Although, write-through minimizes the risk of data loss, since every write operation must be done twice before 
          returning success to the client, this scheme has the disadvantage of higher latency for write operations.
        </p>
      </td>
      <td>
        <h3>Write-around cache</h3>
        <p>
          This technique is similar to write-through cache, but data is written directly to permanent storage, bypassing 
          the cache. This can reduce the cache being flooded with write operations that will not subsequently be 
          re-read, but has the disadvantage that a read request for recently written data will create a “cache miss” 
          and must be read from slower back-end storage and experience higher latency.
        </p>
      </td>
      <td>
        <h3>Write-back cache</h3>
        <p>
          Under this scheme, data is written to cache alone, and completion is immediately confirmed to the client. The 
          write to the permanent storage is done after specified intervals or under certain conditions. This results in 
          low-latency and high-throughput for write-intensive applications; however, this speed comes with the risk of 
          data loss in case of a crash or other adverse event because the only copy of the written data is in the cache.
        </p>
      </td></tr>
      </tbody></table>
      
      <h1>Cache eviction policies</h1>
      <ul>
        <li>
          First In First Out (FIFO): The cache evicts the first block accessed first without any regard to how often or 
          how many times it was accessed before.
        </li>
        <li>
          Last In First Out (LIFO): The cache evicts the block accessed most recently first without any regard to how 
          often or how many times it was accessed before.
        </li>
        <li>
          Least Recently Used (LRU): Discards the least recently used items first.
        </li>
        <li>
          Most Recently Used (MRU): Discards, in contrast to LRU, the most recently used items first.
        </li>
        <li>
          Least Frequently Used (LFU): Counts how often an item is needed. Those that are used least often are discarded 
          first.
        </li>
        <li>
          Random Replacement (RR): Randomly selects a candidate item and discards it to make space when necessary.
        </li>
      </ul>
    `;

    WRAP.append( ELE );
    append_element.append( WRAP );
  }
}