export default class PageBandwidth {
  // DATA TRANSFER
  // Data transfer is the total amount of data to be transferred in a given time, usually measured in month.

  // BANDWIDTH
  // Bandwidth is the measure of maximum data that can be transferred in a given time, usually measured in seconds.

  // WITHOUT DOWNLOADS
  // Bandwidth needed = Average Page Views x Average Page Size x Average Daily Visitors x Number of days in a month (30)
  //                    x Redundant Factor
  // Average Daily Visitors: The total number of monthly visitors/30.
  // Average Page Size: The average size of your web page.
  // Average Page Views: The average page viewed per visitors.
  // Redundant Factor: A safety factor ranged from 1.3 – 1.8.

  // WITH DOWNLOADS
  // Bandwidth needed = [(Average Page Views x Average Page Size x Average Daily Visitors) + (Average Download per day
  //                    x Average File Size) ] x Number of days in a month (30) x Redundant Factor
  // Average Daily Visitors: The total number of monthly visitors/ 30.
  // Average Page Size: The average size of your web page
  // Average Page Views: The average page viewed per visitor
  // Average File Size: The total file size divided to the number of files
  // Redundant Factor: A safety factor ranged from 1.3 – 1.8.
  init( append_element: HTMLElement ): void {
    const WRAP = Object.assign(document.createElement('div'));
    const ELE  = document.createElement('h1');
    ELE.innerText = 'This is my Homepage';
    WRAP.append( ELE );
    append_element.append( WRAP );
  }
}