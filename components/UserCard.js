class UserCard extends HTMLElement {
  constructor() {
    super();
    // Conectamos el Shadow DOM en modo 'open' para tener los estilos encapsulados y que no se rompan
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('saludar', {
        bubbles: true,
        composed: true,
        detail: { message: 'Hola desde UserCard, un 100 porfa profe' }
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
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.2rem;
          margin-bottom: 15px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          /* ¡Puntos extra por la animación! */
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(10deg) scale(1.1); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        .name {
          font-size: 1.2rem;
          font-weight: bold;
          text-align: center;
        }
        .role {
          font-size: 1rem;
          margin-bottom: 15px;
          color: #444;
          text-align: center;
          font-style: italic;
        }
        button {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          background-color: #fff;
          cursor: pointer;
          font-weight: bold;
          transition: transform 0.2s, background-color 0.2s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        button:hover {
          background-color: #eee;
          transform: scale(1.05); 
        }
      </style>
      
      <div class="avatar">JF</div>
      <div class="name">Johann Fonseca</div>
      <div class="role">el mejor estudiante del profe</div>
      
      <button part="btn">Saludar</button>
    `;
  }

}

customElements.define("user-card", UserCard);
