export default class PageApi {
  init( append_element: HTMLElement ): void {
    const DOMAIN_USAGE = Object.assign(document.createElement('p'), {id: 'total-byte-conversion'}),
      EDITOR = Object.assign(document.createElement('textarea'), {id: 'mysql-editor'});

    EDITOR.style.height       = '70vh';
    EDITOR.style.width        = '30vw';
    EDITOR.style.background   = '#2d2d2d';
    EDITOR.style.color        = '#FFFFFF';
    EDITOR.style.padding      = '10px';
    EDITOR.style.float        = 'left';
    EDITOR.style.marginRight  = '3vh';

    EDITOR.addEventListener('keyup', event => {
      const TARGET = event.target as HTMLTextAreaElement,
        TEXT = TARGET.value.split('\n');

      let brace_check: string   = '',
        db_data: any            = {},
        db_table: string        = '',
        use_subdomain: boolean  = false,
        use_domain: boolean     = false,
        api_version: number     = 1;

      for (const ROW_VAL of TEXT) {
        const LINE_VAL = ROW_VAL.replace(/\s+/, '');

        if (LINE_VAL.indexOf('{') > -1) {
          if ('{' === brace_check) {
            console.log('Brace Mismatch 2 {');
            break;
          }

          brace_check = '{';

          const TABLE_ROW = LINE_VAL.replace('{', '').split(':');
          db_table = TABLE_ROW[0];

          if (db_table) {
            if (db_data[db_table]) {
              console.log('Duplicate table declaration');
              break;
            }

            db_data[db_table] = {
              byte_size: 0
            };
          }
        } else if (LINE_VAL.indexOf('}') > -1) {
          if ('{' !== brace_check) {
            console.log('Brace Mismatch due to prev value ' + brace_check);
            break;
          }

          brace_check = '}';
        } else if ( LINE_VAL.indexOf( 'use_subdomain' ) > -1 ) {
          const SETTING = LINE_VAL.split(':');
          if ( SETTING[1] ) use_subdomain = SETTING[1].toLowerCase().indexOf( 'y' ) > -1;
        } else if ( LINE_VAL.indexOf( 'use_domain' ) > -1 ) {
          const SETTING = LINE_VAL.split(':');
          if ( SETTING[1] ) use_subdomain = SETTING[1].toLowerCase().indexOf( 'y' ) > -1;
        } else if ( LINE_VAL.indexOf( 'api_version' ) > -1 ) {
          const SETTING = LINE_VAL.split(':');
          if ( SETTING[1] ) api_version = parseInt( SETTING[1] );
        }
      }

      let domain_text = ( use_domain || use_subdomain ) ? 'No' : 'Yes';
      DOMAIN_USAGE.innerText = `Require /api/ in path? ${ domain_text }
        Version: ${ api_version }`;
    });

    // let table_sizes = '';
    // for (const TABLE_NAME in db_data) {
    //   const TABLE_TOTAL_SIZE = db_data[TABLE_NAME]['byte_size'] * db_data[TABLE_NAME]['row_count'];
    //   total_size += TABLE_TOTAL_SIZE;
    //   table_sizes += `
    //           ${TABLE_NAME}
    //           \tRows: ${db_data[TABLE_NAME]['row_count']}`;
    // }
    //
    // const TOTAL_BYTE_ELE = document.getElementById('total-byte-conversion') as HTMLTextAreaElement;
    append_element.append( EDITOR , DOMAIN_USAGE );
  }
}