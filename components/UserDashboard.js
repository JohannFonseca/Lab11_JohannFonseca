// Componente principal del Dashboard de Usuario
class UserDashboard extends HTMLElement {
  constructor() {
    super();
    // Creamos el Shadow DOM
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    
    // Escucha el evento 'saludar' para activar/desactivar la animación de warning-badge
    this.addEventListener('saludar', (e) => {
      console.log('Evento saludar capturado en user-dashboard:', e.detail);
      
      // Busca el elemento warning-badge en el slot o en el DOM
      const slot = this.shadowRoot.querySelector('slot');
      let badge = null;
      if (slot) {
        const nodes = slot.assignedNodes({flatten: true});
        badge = nodes.find(n => n.tagName && n.tagName.toLowerCase() === 'warning-badge');
      }
      
      if (!badge) {
        badge = this.querySelector('warning-badge');
      }
      
      // Activa o desactiva la animación intermitente (pulsing)
      if (badge) {
        if (badge.hasAttribute('pulsing')) {
          badge.removeAttribute('pulsing');
        } else {
          badge.setAttribute('pulsing', '');
        }
      }
    });
  }

  // Dibuja el HTML y define los estilos CSS
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #d1b4b4;
          border-radius: 20px;
          padding: 40px;
          width: 90vw;
          max-width: 600px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          box-sizing: border-box;
        }
        
        /* Contenedor Grid de 2 columnas */
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 30px;
          align-items: stretch;
          justify-items: stretch;
        }
        
        /* Posiciona user-card en la columna 1, fila 1 */
        ::slotted(user-card) {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
          min-height: 200px;
        }
        
        /* Posiciona weather-time en la columna 2, fila 1 */
        ::slotted(weather-time) {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
          min-height: 150px;
        }
        
        /* Posiciona warning-badge en la fila 2 ocupando ambas columnas */
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

// Registrar el web component
customElements.define("user-dashboard", UserDashboard);
