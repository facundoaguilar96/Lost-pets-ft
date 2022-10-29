import { state } from "../../state";

const imgLogo = require("url:../img/logo.png");
const imgClose = require("url:../img/icono_cerrar.png");

export class Home extends HTMLElement {
  connectedCallback() {
    this.render();

    const cs = state.getState();
    const ubicacion = document.querySelector(".ubicacion");
    const p = document.querySelector(".text-mascotas");
    let ubi = ubicacion as any;

    if (cs.userPosition != "" && cs.userPosition != undefined) {
      ubi.style.visibility = "hidden";
      p?.classList.add("displayNone");
    }
    ubicacion?.addEventListener("click", (e) => {
      ubi.style.visibility = "hidden";
      p?.classList.add("displayNone");
      state.getUserPosition();
      const currentState = state.getState();
      if (currentState.userPosition != "") {
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    });
  }
  styles() {}
  render() {
    this.innerHTML = `
    <header-comp></header-comp>
    <div class="container">
      <h1 class="h1">Mascotas perdidas cerca tuyo</h1>
      <p class="text-mascotas">Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación.</p>
      <button class="ubicacion">dar mi ubicacion</button>
    </div>
    <div class="card-container"><lost-pet-list></lost-pet-list></div>
  
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
  .container{
    text-align: center;
  }
`;

    this.appendChild(style);
  }
}
customElements.define("home-page", Home);
