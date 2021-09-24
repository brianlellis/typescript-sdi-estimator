export default class BrowserHistory {
  private class_list;

  constructor( classes: any , init_class: string , target_ele: HTMLElement ) {
    this.class_list = classes;

    window.history.replaceState({ init_class: init_class } , '', '' );
    window.onpopstate = event => { event.state.init_class( target_ele ); };
    this[ 'class_list' ][ init_class ]( target_ele );
  }

  forward( init_class: string , target_ele: HTMLElement ): void {
    init_class = init_class.toLowerCase();
    target_ele.innerHTML = '';
    window.history.pushState( { init_class: init_class } , '', '' );
    this[ 'class_list' ][ init_class ]( target_ele );
  }
}