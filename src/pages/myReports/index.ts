import { state } from "../../state";

const imgLogo = require("url:../img/logo.png");
const imgClose = require("url:../img/icono_cerrar.png");

export class MyReports extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  styles() {}
  render() {
    this.innerHTML = `
    <header-comp></header-comp>
    <h1 class="h1">Mis mascotas reportadas</h1>
    <div class="card-container"><my-lost-pet></my-lost-pet></div>
  
        `;
    const style = document.createElement("style");

    style.innerHTML = `
    *{
      box-sizing: border-box;
  }
  body{
      margin: 0;
  }
  .ubicacion{
    color: blue;
  }
  .displayNone{
    display:none;
  }
  .card-container{
    padding:20px 20px;
  }
`;

    this.appendChild(style);
  }
}
customElements.define("myreports-page", MyReports);
