const L = "liberia+guanacaste";
const URL = `https://goweather.xyz/v2/weather/${L}`;

class WeatherTime extends HTMLElement {
  data = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.init();
  }

  async init() {
    try {
      const response = await fetch(URL);
      setTimeout(async () => {
        this.data = await response.json();
        this.render();
      }, 2000);
    } catch (e) {
      console.error(e);
      this.data = { temperature: "Error", description: "No data" };
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.data?.temperature) {
      console.log("Cargando datos...");
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #d1e8d5;
            border-radius: 12px;
            padding: 20px;
            font-family: sans-serif;
            color: #333;
            box-sizing: border-box;
            height: 100%;
          }
          .loading {
            width: 50px;
            height: 10px;
            background: rgba(0,0,0,0.1);
            margin: 5px 0;
            border-radius: 5px;
            animation: pulse 1s infinite;
          }
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        </style>
        ${`<div class="loading"></div>`.repeat(3)}
      `;
    } else {
      console.log("Datos cargados.");
      const temp = this.data?.temperature || "N/A";
      const desc = this.data?.description || "Desconocido";
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #d1e8d5;
            border-radius: 12px;
            padding: 20px;
            font-family: sans-serif;
            color: #333;
            box-sizing: border-box;
            height: 100%;
          }
          main {
            text-align: center;
          }
          .location {
            font-weight: bold;
            font-size: 1.2rem;
            margin-bottom: 5px;
          }
          .temp {
            font-size: 1.8rem;
            margin: 5px 0;
          }
          .desc {
            font-size: 1rem;
            text-transform: capitalize;
          }
        </style>
        <main>
          <div class="location">Liberia</div>
          <div class="temp">${temp}</div>
          <div class="desc">${desc}</div>
        </main>
      `;
    }
  }
}

customElements.define("weather-time", WeatherTime);
