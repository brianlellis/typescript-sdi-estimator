export default class CalculatorBandwidth {
  private DAYS_IN_YEAR = 365.25;
  private DAYS_MONTHLY = 365.25 / 12;

  // Also requires a custom ratio to be used EX. read: 0.99 write: 0.01
  private READ_WRITE_ASSUMPTIONS = {
    read_heavy: { // 5:1
      read:   0.8,
      write:  0.2
    },
    write_heavy: { // 1:5
      read:   0.2,
      write:  0.8
    },
    balanced: { // 1:1
      read:   0.5,
      write:  0.5
    }
  }

  // WITHOUT DOWNLOADS
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
  // Average File Size: The total file size divided to the number of files
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

  // This can be based on end users or internal organization users
  // this covers both upload and download
  calcFileStream(
    max_file_size: number = 2,
    avg_file_size_type: string = 'mb',
    avg_uploads: number = 5
  ): number {
    max_file_size = this.convertToBytes( max_file_size , avg_file_size_type );
    return max_file_size * avg_uploads;
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