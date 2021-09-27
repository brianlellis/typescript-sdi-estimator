import CalculatorMySql from '@class/CalculatorMySql';

export default class PageMySql {
  private dom_info: string;
  private ref_class;

  constructor() {
    this.ref_class = new CalculatorMySql();
    this.dom_info  = '';
  }

  init( append_element: HTMLElement , acting_class: any ): void {
    const TOTAL_BYTE_ELE = Object.assign(document.createElement('div'), {id: 'total-byte-conversion'}),
      EDITOR = Object.assign(document.createElement('textarea'), {id: 'mysql-editor'});

    EDITOR.style.height       = '70vh';
    EDITOR.style.width        = '30vw';
    EDITOR.style.background   = '#2d2d2d';
    EDITOR.style.color        = '#FFFFFF';
    EDITOR.style.padding      = '10px';
    EDITOR.style.float        = 'left';
    EDITOR.style.marginRight  = '3vh';

    EDITOR.innerHTML = acting_class.dom_info;

    EDITOR.addEventListener('keyup', event => {
      const TARGET = event.target as HTMLTextAreaElement;
      acting_class.evalTextArea( TARGET.value , acting_class );
    });

    append_element.append(EDITOR, TOTAL_BYTE_ELE);
    this.evalTextArea( acting_class.dom_info , acting_class );
  }

  evalTextArea( target_text: string , acting_class: any ) {
    if ( acting_class ) acting_class.dom_info = target_text;
    const TEXT = target_text.split('\n');

    let total_size: number = 0,
      brace_check: string = '',
      db_data: any = {},
      fk_keys: string[] = [],
      db_table: string = '',
      db_row_ct: string = '',
      db_table_size: number = 0;

    for ( const ROW_VAL of TEXT ) {
      const LINE_VAL = ROW_VAL.replace(/\s+/, '');

      if (LINE_VAL.indexOf('{') > -1) {
        if ('{' === brace_check) {
          console.log('Brace Mismatch 2 {');
          break;
        }

        db_table_size = 0;
        brace_check = '{';

        const TABLE_ROW = LINE_VAL.replace('{', '').split(':');
        db_table = TABLE_ROW[0].trim();
        db_row_ct = TABLE_ROW[1].trim();

        if (db_table) {
          if (db_data[db_table]) {
            console.log('Duplicate table declaration');
            break;
          }

          db_data[db_table] = {
            row_count: parseInt(db_row_ct) > 0 ? parseInt(db_row_ct) : 1,
            byte_size: 0
          };
        }
      } else if (LINE_VAL.indexOf('}') > -1) {
        if ('{' !== brace_check) {
          console.log('Brace Mismatch due to prev value ' + brace_check);
          break;
        }

        db_data[db_table]['byte_size'] = db_table_size;
        brace_check = '}';
      } else if ( LINE_VAL.trim() ) {
        const DATA_TYPE = LINE_VAL.split(':')[1];
        const DB_COL    = LINE_VAL.split(':')[0];
        if (DATA_TYPE) {
          const DATA_VAL = this.ref_class.validType(DATA_TYPE);
          if (DATA_VAL > 0) db_table_size += DATA_VAL;

          if ( DB_COL.indexOf( '_id' ) > -1 ) {
            let fk_str = `${ db_table } > ${ DB_COL.replace( '_id' , '') }`;
            fk_keys.push( fk_str );
          }
        }
      }
    }

    let table_sizes = '';
    for (const TABLE_NAME in db_data) {
      const TABLE_TOTAL_SIZE = db_data[TABLE_NAME]['byte_size'] * db_data[TABLE_NAME]['row_count'];
      total_size += TABLE_TOTAL_SIZE;

      table_sizes += `
        <div class="mysql-table-info">
          <h4>${ TABLE_NAME }</h4>
          <p>
            Rows: ${db_data[TABLE_NAME]['row_count']}<br />
            Size: ${this.ref_class.formatBytes(TABLE_TOTAL_SIZE)}
          </p>
        </div>
      `;
    }
    table_sizes += '</div>';
    table_sizes = `
        <h3>Total Database: ${ this.ref_class.formatBytes(total_size) }</h3>
        <div id="mysql-table-wrap">${table_sizes}`;

    if ( fk_keys.length ) {
      table_sizes += '<div id="mysql-foreign-key-wrap"><h3>Foriegn Key Table Links</h3>';
      for (const VAL of fk_keys ) {
        table_sizes += `<h4>${ VAL }</h4>`;
      }
      table_sizes += '</div>';
    }

    const TOTAL_BYTE_ELE = document.getElementById('total-byte-conversion') as HTMLTextAreaElement;
    TOTAL_BYTE_ELE.innerHTML = table_sizes;
  }
}