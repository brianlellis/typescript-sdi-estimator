import CalculatorMySql from '@class/CalculatorMySql';

export default class PageMySql {
  init( append_element: HTMLElement ): void {
    const CALC_MYSQL = new CalculatorMySql(),
      TOTAL_BYTE_ELE = Object.assign(document.createElement('p'), {id: 'total-byte-conversion'}),
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

      let total_size: number = 0,
        brace_check: string = '',
        db_data: any = {},
        db_table: string = '',
        db_row_ct: string = '',
        db_table_size: number = 0;

      for (const ROW_VAL of TEXT) {
        const LINE_VAL = ROW_VAL.replace(/\s+/, '');

        if (LINE_VAL.indexOf('{') > -1) {
          if ('{' === brace_check) {
            console.log('Brace Mismatch 2 {');
            break;
          }

          db_table_size = 0;
          brace_check = '{';

          const TABLE_ROW = LINE_VAL.replace('{', '').split(':');
          db_table = TABLE_ROW[0];
          db_row_ct = TABLE_ROW[1];

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
        } else {
          const DATA_TYPE = LINE_VAL.split(':')[1];
          if (DATA_TYPE) {
            const DATA_VAL = CALC_MYSQL.validType(DATA_TYPE);
            if (DATA_VAL > 0) db_table_size += DATA_VAL;
          }
        }
      }

      let table_sizes = '';
      for (const TABLE_NAME in db_data) {
        const TABLE_TOTAL_SIZE = db_data[TABLE_NAME]['byte_size'] * db_data[TABLE_NAME]['row_count'];
        total_size += TABLE_TOTAL_SIZE;
        table_sizes += `
              ${TABLE_NAME} 
              \tRows: ${db_data[TABLE_NAME]['row_count']} 
              \tSize: ${CALC_MYSQL.formatBytes(TABLE_TOTAL_SIZE)}`;
      }

      const TOTAL_BYTE_ELE = document.getElementById('total-byte-conversion') as HTMLTextAreaElement;
      TOTAL_BYTE_ELE.innerText = 'Total Database: ' + CALC_MYSQL.formatBytes(total_size) + table_sizes;
    });

    append_element.append(EDITOR, TOTAL_BYTE_ELE);
  }
}