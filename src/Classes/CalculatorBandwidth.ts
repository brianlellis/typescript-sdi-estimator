export default class CalculatorBandwidth {
  private DAYS_IN_YEAR = 365.25;
  private DAYS_MONTHLY = 365.25 / 12;

  // DATA TRANSFER
  // Data transfer is the total amount of data to be transferred in a given time, usually measured in month.

  // BANDWIDTH
  // Bandwidth is the measure of maximum data that can be transferred in a given time, usually measured in seconds.

  // WITHOUT DOWNLOADS
  // Bandwidth needed = Average Page Views x Average Page Size x Average Daily Visitors x Number of days in a month (30)
  //                    x Redundant Factor
  // Average Daily Visitors: The total number of monthly visitors/ ( 365.25 / 12 ).
  // Average Page Size: The average size of your web page.
  // Average Page Views: The average pages viewed per visitor. | Page Views / Visits = Average Page Views per Visit
  // Redundant Factor: A safety factor ranged from 1.3 – 1.8.
  calcWithoutDownloads(
    avg_page_views: number = 3,
    avg_page_size: number = 2,
    avg_page_size_type: string = 'mb',
    avg_daily_visits: number = 100,
    redundant_factor: number = 1.5 // safety factor range 1.3 - 1.8
  ): number {
    avg_page_size = this.convertToBytes( 3 , avg_page_size_type );
    return avg_page_views * avg_page_size * avg_daily_visits * this.DAYS_MONTHLY * redundant_factor;
  }

  // WITH DOWNLOADS
  // Bandwidth needed = [(Average Page Views x Average Page Size x Average Daily Visitors) + (Average Download per day
  //                    x Average File Size) ] x Number of days in a month (30) x Redundant Factor
  // Average Daily Visitors: The total number of monthly visitors/ 30.
  // Average Page Size: The average size of your web page
  // Average Page Views: The average page viewed per visitor
  // Average File Size: The total file size divided to the number of files
  // Redundant Factor: A safety factor ranged from 1.3 – 1.8.
  calcWithDownloads(
    avg_page_views: number = 3,
    avg_page_size: number = 2,
    avg_page_size_type: string = 'mb',
    avg_daily_visits: number = 100,
    avg_file_size: number = 200,
    avg_file_size_type: string = 'kb',
    amount_of_files: number = 25,
    avg_downloads: number = 5,
    redundant_factor: number = 1.5 // safety factor range 1.3 - 1.8
  ): number {
    avg_page_size = this.convertToBytes( 3 , avg_page_size_type );
    avg_file_size = this.convertToBytes( avg_file_size , avg_file_size_type );
    const AVG_FILE_TOTAL  = avg_file_size / amount_of_files;
    const PAGE_CALC       = avg_page_views * avg_page_size * avg_daily_visits;
    const FILE_CALC       = AVG_FILE_TOTAL * avg_downloads;
    return ( PAGE_CALC + FILE_CALC ) * this.DAYS_MONTHLY *  redundant_factor;
  }

  convertToBytes( value: number , type: string = 'mb' ): number {
    type = type.toLowerCase();
    let base = 0;
    switch (type) {
    case 'kb': base = 1024;       break;
    case 'mb': base = 1048576;    break;
    case 'gb': base = 1073741824; break;
    }
    return base * value;
  }
}