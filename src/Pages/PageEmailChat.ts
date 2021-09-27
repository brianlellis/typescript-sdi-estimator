export default class PageEmailChat {
  private realtime_chat: boolean;
  private message_inbox: boolean;
  private email_server: boolean;
  private ticketing_system: boolean;

  constructor() {
    this.realtime_chat = false;
    this.message_inbox = false;
    this.email_server = false;
    this.ticketing_system = false;

    // this.domCreate();
    // this.domEventListeners();
  }

  init( append_element: HTMLElement ): void {
    append_element.append( this.domCreate() );
    this.domEventListeners();
  }

  domCreate(): HTMLElement {
    const WRAP = Object.assign( document.createElement('div') , { id: 'chat-email-wrap' } );
    const HTML = `
      <p>Real-time Chat</p><input type="checkbox" id="realtime-chat" />
      <p>Message Inbox</p><input type="checkbox" id="message-inbox" />
      <p>Email Server</p><input type="checkbox" id="email-server" />
      <p>Ticketing System</p><input type="checkbox" id="ticketing-system" />
    `;
    WRAP.innerHTML = HTML;
    return WRAP;
  }

  domEventListeners(): void {
    const REALTIME = document.getElementById( 'realtime-chat' ) as HTMLElement,
      MSG_INBOX = document.getElementById( 'message-inbox' ) as HTMLElement,
      EMAIL     = document.getElementById( 'email-server' ) as HTMLElement,
      TICKETS   = document.getElementById( 'ticketing-system' ) as HTMLElement;
    REALTIME.addEventListener('click' , event => {
      const TARGET = event.target as HTMLInputElement;
      if (TARGET.checked) console.log(true);
      else console.log(true);
    });
    MSG_INBOX.addEventListener('click' , event => {
      const TARGET = event.target as HTMLInputElement;
      if (TARGET.checked) console.log(true);
      else console.log(true);
    });
    EMAIL.addEventListener('click' , event => {
      const TARGET = event.target as HTMLInputElement;
      if (TARGET.checked) console.log(true);
      else console.log(true);
    });
    TICKETS.addEventListener('click' , event => {
      const TARGET = event.target as HTMLInputElement;
      if (TARGET.checked) console.log(true);
      else console.log(true);
    });
  }
}