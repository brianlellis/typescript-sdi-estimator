export default class PageCaching {
  init( append_element: HTMLElement ): void {
    const WRAP = Object.assign(document.createElement('div'));
    const ELE  = document.createElement('div');
    ELE.innerHTML = `
      <table><tbody>
      <tr><td>
        <h3>SQL</h3>
        <p>
          Relational databases store data in rows and columns. Each row contains all the information about one entity 
          and each column contains all the separate data points. Some of the most popular relational databases are 
          MySQL, Oracle, MS SQL Server, SQLite, Postgres, and MariaDB.
        </p>
      </td>
      <td>
        <h3>NoSQL ( common types )</h3>
        <p>
          Key-Value Stores: Data is stored in an array of key-value pairs. The ‘key’ is an attribute name which is 
          linked to a ‘value’. Well-known key-value stores include Redis, Voldemort, and Dynamo.<br /><br />

          Document Databases: In these databases, data is stored in documents (instead of rows and columns in a table) 
          and these documents are grouped together in collections. Each document can have an entirely different 
          structure. Document databases include the CouchDB and MongoDB.<br /><br />

          Wide-Column Databases: Instead of ‘tables,’ in columnar databases we have column families, which are 
          containers for rows. Unlike relational databases, we don’t need to know all the columns up front and each 
          row doesn’t have to have the same number of columns. Columnar databases are best suited for analyzing 
          large datasets - big names include Cassandra and HBase.<br /><br />

          Graph Databases: These databases are used to store data whose relations are best represented in a graph. 
          Data is saved in graph structures with nodes (entities), properties (information about the entities), and 
          lines (connections between the entities). Examples of graph database include Neo4J and InfiniteGraph.
        </p>
      </td></tr>
      </tbody></table>
      
      <h1>High Level Differences</h1>
      <table><tbody>
      <tr><td>
        <h3>Storage</h3>
        <p>
          SQL stores data in tables where each row represents an entity and each column represents a data point about 
          that entity; for example, if we are storing a car entity in a table, different columns could be ‘Color’, 
          ‘Make’, ‘Model’, and so on.<br /><br />
          NoSQL databases have different data storage models. The main ones are key-value, document, graph, and 
          columnar. We will discuss differences between these databases below.
        </p>
      </td>
      <td>
        <h3>Schema</h3>
        <p>
          In SQL, each record conforms to a fixed schema, meaning the columns must be decided and chosen before data 
          entry and each row must have data for each column. The schema can be altered later, but it involves modifying 
          the whole database and going offline.<br /><br />

          NoSQL schemas are dynamic. Columns can be added on the fly and each ‘row’ (or equivalent) doesn’t have to 
          contain data for each ‘column.’
        </p>
      </td>
      <td>
        <h3>Querying</h3>
        <p>
          SQL databases use SQL (structured query language) for defining and manipulating the data, which is very 
          powerful. In a NoSQL database, queries are focused on a collection of documents. Sometimes it is also called 
          UnQL (Unstructured Query Language). Different databases have different syntax for using UnQL.
        </p>
      </td>
      <td>
        <h3>Scalability</h3>
        <p>
          In most common situations, SQL databases are vertically scalable, i.e., by increasing the horsepower 
          (higher Memory, CPU, etc.) of the hardware, which can get very expensive. It is possible to scale a 
          relational database across multiple servers, but this is a challenging and time-consuming process.<br /><br />

          On the other hand, NoSQL databases are horizontally scalable, meaning we can add more servers easily in our 
          NoSQL database infrastructure to handle a lot of traffic. Any cheap commodity hardware or cloud instances can 
          host NoSQL databases, thus making it a lot more cost-effective than vertical scaling. A lot of NoSQL 
          technologies also distribute data across servers automatically.
        </p>
      </td>
      <td>
        <h3>Reliability or ACID Compliancy (Atomicity, Consistency, Isolation, Durability)</h3>
        <p>
          The vast majority of relational databases are ACID compliant. So, when it comes to data reliability and safe 
          guarantee of performing transactions, SQL databases are still the better bet. Most of the NoSQL solutions 
          sacrifice ACID compliance for performance and scalability.
        </p>
      </td></tr>
      </tbody></table>
      
      <h1>When to use?</h1>
      <table><tbody>
      <tr><td>
        <h3>SQL</h3>
        <ol>
          <li>
            We need to ensure ACID compliance. ACID compliance reduces anomalies and protects the integrity of your 
            database by prescribing exactly how transactions interact with the database. Generally, NoSQL databases 
            sacrifice ACID compliance for scalability and processing speed, but for many e-commerce and financial 
            applications, an ACID-compliant database remains the preferred option.
          </li>
          <li>
            Your data is structured and unchanging. If your business is not experiencing massive growth that would 
            require more servers and if you’re only working with data that is consistent, then there may be no reason 
            to use a system designed to support a variety of data types and high traffic volume.
          </li>
        </ol>
      </td>
      <td>
        <h3>NoSQL</h3>
        <ol>
          <li>
            Storing large volumes of data that often have little to no structure. A NoSQL database sets no limits on the 
            types of data we can store together and allows us to add new types as the need changes. With document-based 
            databases, you can store data in one place without having to define what “types” of data those are in advance.
          </li>
          <li>
            Making the most of cloud computing and storage. Cloud-based storage is an excellent cost-saving solution but 
            requires data to be easily spread across multiple servers to scale up. Using commodity (affordable, smaller) 
            hardware on-site or in the cloud saves you the hassle of additional software and NoSQL databases like 
            Cassandra are designed to be scaled across multiple data centers out of the box, without a lot of headaches.
          </li>
          <li>
            Rapid development. NoSQL is extremely useful for rapid development as it doesn’t need to be prepped ahead of 
            time. If you’re working on quick iterations of your system which require making frequent updates to the data 
            structure without a lot of downtime between versions, a relational database will slow you down.
          </li>
        </ol>
      </td></tr>
      </tbody></table>
    `;

    WRAP.append( ELE );
    append_element.append( WRAP );
  }
}