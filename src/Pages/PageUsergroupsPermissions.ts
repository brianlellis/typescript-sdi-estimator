export default class PageUsergroupsPermissions {
  private dom_info: string;

  constructor() {
    this.dom_info  = '';
  }

  init( append_element: HTMLElement , acting_class: any ): void {
    const EDITOR = Object.assign(document.createElement('textarea'), {id: 'mysql-editor'}),
      ROLES_WRAP = Object.assign(document.createElement('div'), {id: 'roles-perms-wrap'});

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

    append_element.append( EDITOR , ROLES_WRAP );
    this.evalTextArea( acting_class.dom_info , acting_class );
  }

  evalTextArea( target_text: string , acting_class: any ) {
    const ROLES_WRAP = document.getElementById('roles-perms-wrap') as HTMLElement;

    if ( acting_class ) acting_class.dom_info = target_text;
    const TEXT = target_text.split('\n');

    let roles: any      = { _global: [] }, // global roles and usergroups assigned here
      permissions: any  = { _global: [] };

    for (const ROW_VAL of TEXT) {
      const LINE_VAL = ROW_VAL.replace(/\s+/, '');

      if ( LINE_VAL.indexOf( 'role' ) > -1 ) {
        const ARR_LINE   = LINE_VAL.replace( 'role:' , '' ).split( ':' );
        const ROLE_INFO  = 2 === ARR_LINE.length ? ARR_LINE[1] : ARR_LINE[0];
        const GROUP_ROLE = 2 === ARR_LINE.length ? ARR_LINE[0] : '_global';
        if ( !roles[ GROUP_ROLE ] ) roles[ GROUP_ROLE ] = []; // assign usergroup or use global
        roles[ GROUP_ROLE ].push( ROLE_INFO );
      } else if ( LINE_VAL.indexOf( 'perm' ) > -1 ) {
        const ARR_LINE   = LINE_VAL.replace( 'perm:' , '' ).split( ':' );
        const PERM_INFO  = 2 === ARR_LINE.length ? ARR_LINE[1] : ARR_LINE[0];
        const GROUP_ROLE = 2 === ARR_LINE.length ? ARR_LINE[0] : '_global';
        if ( !permissions[ GROUP_ROLE ] ) permissions[ GROUP_ROLE ] = []; // assign usergroup or use global
        permissions[ GROUP_ROLE ].push( PERM_INFO );
      }
    }

    let roles_wrap_html = '';
    for ( const ROLE_KEY in roles ) {
      roles_wrap_html += '<div class="role-section">';
      if ( '_global' === ROLE_KEY ) roles_wrap_html += '<h3>GLOBAL ROLES</h3>';
      else roles_wrap_html += `<h3>USERGROUP ROLES FOR: ${ ROLE_KEY.toUpperCase() }</h3>`;

      if ( '_global' === ROLE_KEY && permissions[ '_global' ].length ) {
        roles_wrap_html += '<div class="roles-within-section"><h4>GLOBAL PERMS FOR ANY ROLE</h4>';
        roles_wrap_html += '<div class="perms-within-role"><ol>';
        for (const PERM of permissions['_global'] ) {
          roles_wrap_html += `<li>${ PERM }</li>`;
        }
        roles_wrap_html += '</ol></div></div>';
      }

      if ( roles[ ROLE_KEY ].length ) {
        roles_wrap_html += '<div class="roles-within-section">';
        for (const ROLE_NAME of roles[ROLE_KEY] ) {
          roles_wrap_html += `<h4>${ROLE_NAME}</h4>`;
          if ( permissions[ROLE_NAME] ) {
            roles_wrap_html += '<div class="perms-within-role"><h5>Role Permissions</h5><ol>';
            for (const PERM of permissions[ROLE_NAME]) {
              roles_wrap_html += `<li>${PERM}</li>`;
            }
            roles_wrap_html += '</ol></div>';
          }
        }
        roles_wrap_html += '</ol></div>';
      }
    }

    ROLES_WRAP.innerHTML = roles_wrap_html;
  }
}