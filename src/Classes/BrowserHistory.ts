export default class BrowserHistory {
  private class_list;
  private app_ele_target;

  constructor( classes: any , init_class: string , target_ele: HTMLElement ) {
    this.class_list     = classes;
    this.app_ele_target = target_ele;

    window.history.replaceState({ init_class: init_class } , '', '' );

    window.onpopstate = event => {
      this.render( this[ 'class_list' ][ event.state.init_class ][ 'init' ] );
    };

    this.render( this[ 'class_list' ][ init_class ][ 'init' ] );
  }

  forward( init_class: string ): void {
    init_class = init_class.toLowerCase();
    window.history.pushState( { init_class: init_class } , '', '' );
    this.render( this[ 'class_list' ][ init_class ][ 'init' ] );
  }

  render( class_init: any ): void {
    this.app_ele_target.innerHTML = '';
    class_init( this.app_ele_target );
  }
}