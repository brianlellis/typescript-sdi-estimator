export default class PageBandwidth {
  init( append_element: HTMLElement ): void {
    const WRAP = Object.assign(document.createElement('div'));
    const ELE  = document.createElement('h1');
    ELE.innerText = 'This is my Homepage';
    WRAP.append( ELE );
    append_element.append( WRAP );
  }
}