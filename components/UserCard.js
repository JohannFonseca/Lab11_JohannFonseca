class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('saludar', {
        bubbles: true,
        composed: true, // Needs to be true to cross the shadow DOM boundary
        detail: { message: '¡Hola desde UserCard!' }
      }));
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #b5c7e3;
          border-radius: 12px;
          padding: 20px;
          font-family: sans-serif;
          color: #333;
          box-sizing: border-box;
          height: 100%;
        }
        .avatar {
          width: 60px;
          height: 60px;
          background-color: #fff;
          border-radius: 12px; /* Slightly rounded square as in sketch */
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-bottom: 15px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .name {
          font-size: 1.2rem;
          font-weight: bold;
        }
        .role {
          font-size: 1rem;
          margin-bottom: 15px;
          color: #555;
        }
        button {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          background-color: #fff;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.2s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        button:hover {
          background-color: #eee;
        }
      </style>
      <div class="avatar">Avatar</div>
      <div class="name">Alonso</div>
      <div class="role">Profesor</div>
      <button part="btn">Saludar</button>
    `;
  }
}

customElements.define("user-card", UserCard);
