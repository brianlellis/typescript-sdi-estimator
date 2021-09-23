// Return value from data types are in bytes
class CalculatorMySql {
  // The internal representation of a MySQL table has a maximum row size limit of 65,535 bytes, even if the storage
  // engine is capable of supporting larger rows. BLOB and TEXT columns only contribute 9 to 12 bytes toward the row
  // size limit because their contents are stored separately from the rest of the row.

  numericSizes( data_type: string ): number | boolean {
    // using unsigned values change data size allocation?
    // https://stackoverflow.com/questions/478235/signed-or-unsigned-in-mysql
    // More for performance and identification, will not save byte storage estimates
    switch( data_type ) {
      case 'tinyint':     return 1; // signed -128 - 127; max 255 unsigned
      case 'smallint':    return 2; // signed -32768 - 32767; max 65535 unsigned
      case 'mediumint':   return 3; // signed -8388608 - 8388607; max 16 777 215 unsigned
      case 'int':         return 4; // signed -2147483638 - 214 747 483 637; max 4 294 967 925 unsigned
      case 'bigint':      return 8; // signed -9223372036854775808 - 9223372036854775807; max 18446744073709551615
      case 'float':       return 4; // small numbers with floating decimal point.
      case 'double':      return 8; // large numbers with floating decimal point.
      case 'decimal':     return 17; // Storing DOUBLE as a string, so there is a fixed decimal point. (5-17 bytes)
      // The size parameter is used to specify the maximum number of digits, and the d parameter is used to specify
      // the maximum number of digits to the right of the decimal.
    }
    return false;
  }

  byteSize( char_count?: number ): number {
    const chars: string = ''.padEnd( char_count ?? 0 , 'A');
    const val: number   = new Blob([ chars ]).size;
    return val;
  }

  stringSizes( data_type: string , char_count?: number ): number | boolean {
    if ( undefined === char_count ) {
      switch( data_type ) {
        case 'char':
        case 'varchar':
        case 'tinytext':   char_count = 255;         break;
        case 'text':
        case 'blob':       char_count = 65535;       break;
        case 'mediumtext':
        case 'mediumblob': char_count = 16777215;    break;
        case 'longtext':
        case 'longblob':   char_count = 4294967295;  break;
      }
    }

    // String byte value is based on encoding + plus byte overhead padding
    // For varhcar <= 255 string byte value + 1 byte
    // For varchar > 255 string byte value + 2 byte
    // For tinytext < 28 length + 1 byte
    // For text < 216 length + 2 byte
    // For mediumtext 3 bytes, where Len < 224
    // For longtext 4 bytes, where Len < 232

    // TEXT and CHAR will convert to/from the character set they have associated with.
    // BLOB and BINARY simply store bytes.
    // BLOB is used for storing binary data while Text is used to store large string.
    switch( data_type ) {
      case 'char':
      case 'varchar':
      case 'tinytext':
      case 'mediumtext':
      case 'longtext':
      case 'text':        return this.byteSize( char_count );
      case 'blob':
      case 'mediumblob':
      case 'longblob':    return char_count ?? 0;
    }
    return false;
  }

  dateSize( data_type: string ): number | boolean {
    switch( data_type ) {
      case 'datetime':        return 8; // Jan 1, 1753 to Dec 31, 9999 with an accuracy of 3.33 milliseconds
      case 'datetime2':       return 8; // Jan 1, 0001 to Dec 31, 9999 with an accuracy of 100 nanoseconds (6-8 bytes)
      case 'smalldatetime':   return 4; // Jan 1, 1900 to June 6, 2079 with an accuracy of 1 minute
      case 'date':            return 3; // Store a date only. From January 1, 0001 to December 31, 9999
      case 'time':            return 5; // Store a time only to an accuracy of 100 nanoseconds (3-5 bytes)
      case 'datetimeoffset':  return 10; // The same as datetime2 with the addition of a time zone offset (8-10 bytes)
    }
    return false;
  }

  fivePercentEstimatePad( value: number ) {
    return ( ( value * 0.05 ) + value );
  }
}
