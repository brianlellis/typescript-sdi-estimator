export default class PageUsergroupsPermissions {
  private dom_info: string;

  constructor() {
    this.dom_info  = '';
  }

  init( append_element: HTMLElement , acting_class: any ): void {
    const EDITOR    = Object.assign(document.createElement('textarea'), {id: 'mysql-editor'}),
      DOMAIN_USAGE  = Object.assign(document.createElement('p'), {id: 'total-byte-conversion'}),
      ENDPOINT_WRAP = Object.assign(document.createElement('div'), {id: 'endpoint-wrap'});

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

    append_element.append( EDITOR , DOMAIN_USAGE , ENDPOINT_WRAP );
    this.evalTextArea( acting_class.dom_info , acting_class );
  }

  evalTextArea( target_text: string , acting_class: any ) {
    const DOMAIN_USAGE = document.getElementById('total-byte-conversion') as HTMLElement,
      ENDPOINT_WRAP = document.getElementById('endpoint-wrap') as HTMLElement;

    if ( acting_class ) acting_class.dom_info = target_text;
    const TEXT = target_text.split('\n');

    let brace_check: string   = '',
      api_data: any           = {},
      cur_endpoint: string    = '',
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
        brace_check = '{'; // error checking on brace balance

        const TABLE_ROW = LINE_VAL.replace('{', '').trim();
        if ( TABLE_ROW ) {
          if (api_data[ TABLE_ROW ]) {
            console.log('Duplicate table declaration');
            break;
          }

          api_data[ TABLE_ROW ] = { method: [] , param: [], allow_all_search: false };
          cur_endpoint = TABLE_ROW;
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
      } else if ( LINE_VAL.indexOf( 'version' ) > -1 ) {
        const SETTING = LINE_VAL.split(':');
        if ( SETTING[1] ) api_version = parseInt( SETTING[1] );
      } else if ( LINE_VAL.indexOf( 'allow_all_search' ) > -1 ) {
        const SETTING = LINE_VAL.split(':');
        if ( SETTING[1] ) api_data[ cur_endpoint ][ 'allow_all_search' ] = SETTING[1].toLowerCase().indexOf( 'y' ) > -1;
      } else if ( LINE_VAL ) {
        if ( LINE_VAL.indexOf( 'method' ) > -1 ) {
          const METHOD = LINE_VAL.replace( 'method:' , '').toUpperCase();
          if ( METHOD.match( /PUT|POST|GET|DELETE/g ) ) api_data[ cur_endpoint ][ 'method' ].push( METHOD );
        } else if ( LINE_VAL.indexOf( 'param' ) > -1 ) {
          const PARAM = LINE_VAL.replace( 'param:' , '').toLowerCase();
          api_data[ cur_endpoint ][ 'param' ].push( PARAM );
        }
      }
    }

    let domain_text = ( use_domain || use_subdomain ) ? 'No' : 'Yes';
    DOMAIN_USAGE.innerText = `Require /api/ in path? ${ domain_text }
        Version: ${ api_version }`;

    let endpoint_wrap_html  = '';
    let str_prefix          = ( use_domain || use_subdomain ) ? '/' : '/api/';
    str_prefix += `v${ api_version }/`;

    for (const KEY in api_data ) {
      if ( api_data[ KEY ][ 'method' ].length ) {
        let str_methods = '<strong>Methods: </strong>';
        for (const METHOD of api_data[ KEY ][ 'method' ] ) {
          str_methods += METHOD+' ';
        }
        endpoint_wrap_html += `${ str_methods }<br />`;
      }
      if ( api_data[ KEY ][ 'param' ].length ) {
        let str_params = '<strong>Params:</strong><br />';
        for (const PARAM of api_data[ KEY ][ 'param' ] ) {
          str_params += PARAM+'<br />';
        }
        endpoint_wrap_html += `${ str_params }<br />`;
      }

      let str_allow_all = api_data[ KEY ][ 'allow_all_search' ] ? '{id?}' : '{id}';
      endpoint_wrap_html += `${ str_prefix }${ KEY }/${ str_allow_all }`;
      endpoint_wrap_html += '<br /><br />';
    }
    ENDPOINT_WRAP.innerHTML = endpoint_wrap_html;
  }
}