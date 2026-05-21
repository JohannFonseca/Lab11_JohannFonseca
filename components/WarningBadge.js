class WarningBadge extends HTMLElement {
  static get observedAttributes() {
    return ['pulsing'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'pulsing') {
      this.render();
    }
  }

  render() {
    const isPulsing = this.hasAttribute('pulsing');
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #dbe2a1;
          border-radius: 12px;
          padding: 20px;
          font-family: sans-serif;
          color: #333;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: transform 0.2s, background-color 0.3s;
          box-sizing: border-box;
          height: 100%;
          text-align: center;
        }
        
        :host([pulsing]) {
          animation: pulse 1s infinite alternate;
          background-color: #ebd683;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }

        .text {
          font-weight: bold;
          font-size: 1.1rem;
        }
      </style>
      <div class="text"><slot></slot></div>
    `;
  }
}

customElements.define("warning-badge", WarningBadge);
