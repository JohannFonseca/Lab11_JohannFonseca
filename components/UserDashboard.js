class UserDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    
    // Listen for the custom event 'saludar' coming from the user-card component
    this.addEventListener('saludar', (e) => {
      console.log('Evento saludar capturado en user-dashboard:', e.detail);
      
      // Get the warning badge element
      // Check if it's slotted
      const slot = this.shadowRoot.querySelector('slot');
      let badge = null;
      if (slot) {
        const nodes = slot.assignedNodes({flatten: true});
        badge = nodes.find(n => n.tagName && n.tagName.toLowerCase() === 'warning-badge');
      }
      
      // Fallback: look in light DOM directly
      if (!badge) {
        badge = this.querySelector('warning-badge');
      }
      
      if (badge) {
        if (badge.hasAttribute('pulsing')) {
          badge.removeAttribute('pulsing');
        } else {
          badge.setAttribute('pulsing', '');
        }
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #d1b4b4; /* matches pinkish background */
          border-radius: 20px;
          padding: 40px;
          width: 90vw;
          max-width: 600px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          box-sizing: border-box;
        }
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 30px;
          align-items: stretch;
          justify-items: stretch;
        }
        
        ::slotted(user-card) {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
          min-height: 200px;
        }
        
        ::slotted(weather-time) {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
          min-height: 150px;
        }
        
        ::slotted(warning-badge) {
          grid-column: 1 / 3;
          grid-row: 2 / 3;
          margin: 0 auto;
          width: 80%;
          min-height: 80px;
        }
      </style>
      <div class="container">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("user-dashboard", UserDashboard);
