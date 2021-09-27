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
    this.domEventListeners( this );
  }

  domCreate(): HTMLElement {
    const WRAP = Object.assign( document.createElement('div') , { id: 'chat-email-wrap' } );

    const DISPLAY = {
      realtime_chat: this.realtime_chat ? 'block' : 'none',
      message_inbox: this.message_inbox ? 'block' : 'none',
      email_server: this.email_server ? 'block' : 'none',
      ticketing_system: this.ticketing_system ? 'block' : 'none'
    };
    const REALTIME = `
      <div id="info-realtime" style="display: ${ DISPLAY.realtime_chat }">
        <table><tbody><tr>
          <td>
            <h4>Long Polling</h4>
            Pros<br />
            Long polling is implemented on the back of XMLHttpRequest, which is near-universally supported by devices 
            so there’s usually little need to support further fallback layers. In cases where exceptions must be 
            handled though, or where a server can be queried for new data but does not support long polling (let 
            alone other more modern technology standards), basic polling can sometimes still be of limited use, and 
            can be implemented using XMLHttpRequest, or via JSONP through simple HTML script tags.<br /><br />
            
            Cons<br />
            Long polling is a lot more intensive on the server.<br /><br />
            Reliable message ordering can be an issue with long polling because it is possible for multiple HTTP 
            requests from the same client to be in flight simultaneously. For example, if a client has two browser 
            tabs open consuming the same server resource, and the client-side application is persisting data to a 
            local store such as localStorage or IndexedDb, there is no in-built guarantee that duplicate data won’t 
            be written more than once.<br /><br />
            Depending on the server implementation, confirmation of message receipt by one client instance may also 
            cause another client instance to never receive an expected message at all, as the server could mistakenly 
            believe that the client has already received the data it is expecting.
          </td>
          <td>
            <h4>WebSockets</h4>
            Pros<br />
            WebSockets keeps a unique connection open while eliminating latency problems that arise with 
            Long Polling.<br /><br />
            WebSockets generally do not use XMLHttpRequest, and as such, headers are not sent every-time we need to 
            get more information from the server. This, in turn, reduces the expensive data loads being sent to the 
            server.<br /><br />
            
            Cons<br />
            WebSockets don’t automatically recover when connections are terminated – this is something you need to 
            implement yourself, and is part of the reason why there are many client-side libraries 
            in existence.<br /><br />
            Browsers older than 2011 aren’t able to support WebSocket connections - but this is increasingly 
            less relevant.
          </td>
          <td>
            Websocket Servers Handle ~50k concurrent connections<br /><br />
            Will require load balancers for multiple servers if required<br /><br />
            Will need to discuss persistence of messages (when to store, per message or block events)<br /><br />
            Loading of message from persistence for offline messages
          </td>
        </tr></tbody></table>
      </div>
    `;

    const MSG_INBOX = `
      <div id="info-message-inbox" style="display: ${ DISPLAY.message_inbox }">
        <table><tbody><tr>
          <td>
            <h4>New Message Notification</h4>
            Can we use notification upon page load or will we require real time notification?
            <h4>Will there be message status capabilities</h4>
            <h4>Is messaging limited by role? Begin determining new data needs</h4>
          </td>
        </tr></tbody></table>
      </div>
    `;

    const CHECKED = {
      realtime_chat: this.realtime_chat ? 'checked' : '',
      message_inbox: this.message_inbox ? 'checked' : '',
      email_server: this.email_server ? 'checked' : '',
      ticketing_system: this.ticketing_system ? 'checked' : ''
    };

    const HTML = `
      <p>Real-time Chat</p><input type="checkbox" id="realtime-chat" ${ CHECKED.realtime_chat }/>
      ${ REALTIME }
      <p>Message Inbox</p><input type="checkbox" id="message-inbox" ${ CHECKED.message_inbox }/>
      ${ MSG_INBOX }
      <p>Email Server</p><input type="checkbox" id="email-server" ${ CHECKED.email_server }/>
      <p>Ticketing System</p><input type="checkbox" id="ticketing-system" ${ CHECKED.ticketing_system }/>
    `;
    WRAP.innerHTML = HTML;
    return WRAP;
  }

  domEventListeners( class_self: any ): void {
    const REALTIME = document.getElementById( 'realtime-chat' ) as HTMLElement,
      MSG_INBOX       = document.getElementById( 'message-inbox' ) as HTMLElement,
      EMAIL           = document.getElementById( 'email-server' ) as HTMLElement,
      TICKETS         = document.getElementById( 'ticketing-system' ) as HTMLElement,
      INFO_REALTIME   = document.getElementById( 'info-realtime' ) as HTMLElement,
      INFO_MSG_INBOX  = document.getElementById( 'info-message-inbox' ) as HTMLElement,
      INFO_EMAIL      = document.getElementById( 'info-email-server' ) as HTMLElement,
      INFO_TICKETS    = document.getElementById( 'info-ticketing-system' ) as HTMLElement;
    REALTIME.addEventListener('click' , event => {
      const TARGET = event.target as HTMLInputElement;
      class_self.realtime_chat = TARGET.checked;
      if (TARGET.checked) INFO_REALTIME.style.display = 'block';
      else INFO_REALTIME.style.display = 'none';
    });
    MSG_INBOX.addEventListener('click' , event => {
      const TARGET = event.target as HTMLInputElement;
      class_self.message_inbox = TARGET.checked;
      if (TARGET.checked) INFO_MSG_INBOX.style.display = 'block';
      else INFO_MSG_INBOX.style.display = 'none';
    });
    EMAIL.addEventListener('click' , event => {
      const TARGET = event.target as HTMLInputElement;
      class_self.email_server = TARGET.checked;
      if (TARGET.checked) INFO_EMAIL.style.display = 'block';
      else INFO_EMAIL.style.display = 'none';
    });
    TICKETS.addEventListener('click' , event => {
      const TARGET = event.target as HTMLInputElement;
      class_self.ticketing_system = TARGET.checked;
      if (TARGET.checked) INFO_TICKETS.style.display = 'block';
      else INFO_TICKETS.style.display = 'none';
    });
  }
}