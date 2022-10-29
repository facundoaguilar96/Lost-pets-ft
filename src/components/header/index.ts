import { state } from "../../state";
import { Router } from "@vaadin/router";
const imgLogo = require("url:../../pages/img/logo.png");
const imgClose = require("url:../../pages/img/icono_cerrar.png");

export function initHeader() {
  class Header extends HTMLElement {
    connectedCallback() {
      const cs = state.getState();
      state.subscribe(() => {
        if (cs.token) {
          this.render();
        }
      });
      this.render();
    }
    styles() {
      const cs = state.getState();
      const button: any = document.querySelector(".header__options-container");
      const menu = document.querySelector("#menu");
      const cerrar = document.querySelector(".cerrar");
      const datos = document.querySelector(".misDatos");
      const mascotas = document.querySelector(".misMascotas");
      const reportar = document.querySelector(".reportar");
      const singOff = document.querySelector(".singOff");
      const index = document.querySelector(".index");

      index?.addEventListener("click", () => {
        if (!cs.token) {
          setTimeout(() => {
            this.render();
          }, 100);
        }
        Router.go("/");
      });
      datos?.addEventListener("click", () => {
        if (cs.token !== "") {
          menu?.classList.remove("cont-menu");
          Router.go("/misDatos");
        } else {
          setTimeout(() => {
            this.render();
          }, 100);
          Router.go("/ingresar");
        }
      });
      mascotas?.addEventListener("click", () => {
        if (cs.token !== "") {
          Router.go("/myReports");
        } else {
          setTimeout(() => {
            this.render();
          }, 100);
          Router.go("/ingresar");
        }
      });
      reportar?.addEventListener("click", () => {
        if (cs.token !== "") {
          setTimeout(() => {
            this.render();
          }, 100);
          Router.go("/reportPet");
        } else {
          setTimeout(() => {
            this.render();
          }, 100);
          Router.go("/ingresar");
        }
      });
      cerrar?.addEventListener("click", (e) => {
        cerrar?.setAttribute("style", "display: none");
        menu?.classList.toggle("active");
      });

      button.addEventListener("click", (e) => {
        cerrar?.setAttribute("style", "display: inherit");
        menu?.classList.toggle("active");
        document.body.classList.toggle("opacity");
      });

      singOff?.addEventListener("click", () => {
        if (cs.token) {
          state.singOff();
          window.alert("Hasta luego!");
          window.location.reload();
        } else {
          Router.go("/ingresar");
        }
      });
    }
    nameSesion() {
      const cs = state.getState();
      if (cs.token) {
        return "Cerrar sesión";
      } else {
        return "Iniciar sesión";
      }
    }
    render() {
      const email = state.getState().email || "";
      this.innerHTML = `
      
    
      <div class="header__container">
        <div class="header__img-container">
        <a class="index"><img class="header__img" src=${imgLogo} /></a>
        </div>
        <div class="header__options-container">
          <div class="header__burger"></div>
          <div class="header__burger"></div>
          <div class="header__burger"></div>
        </div>
  
        <div class="cont-menu active" id="menu">
          <ul class="ul">
            <li class="misDatos">Mis datos</li>
            <li class="misMascotas">Mis mascotas reportadas</li>
            <li class="reportar">Reportar mascota</li>
          </ul>
          <div class="center">
            <h3 class="h3-email">${email}</h3>
            <a class="singOff">${this.nameSesion()}</a>
          </div>
        </div>
        <div class="cerrar">
          <img class="header__img" src=${imgClose} />
        </div>
      </div>
      
    </html>
          `;
      const style = document.createElement("style");
      style.innerHTML = `
      *{
        box-sizing: border-box;
    }
    body{
        margin: 0;
    }
    .singOff{
      color:#C6558B;
      font-size: 16px;
      font-family: 'Poppins';
      text-decoration-line: underline;
      text-transform: uppercase;
    }
    .h3-email{
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 36px;
    }
    .header__container{
        background-color: #43A810;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }
    .header__options-container{
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 15vw;
    }
    
    @media (min-width: 769px) {
        .header__options-container{
            display: none;
        }   
    }
    
    .header__burger{
        width: 100%;
        background-color: black;
        height: 1.3vh;
        border-radius: 10px;
    }
    
    .header__img{
        width: 12vw;
        height: 5vh;
    }
    
    /* .header__img-container{} */
    
    .cont-menu{
        background-color: #5D635A;
        box-shadow: 2px 0px 5px 2px rgb(66,66,66);
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        transition: all .5s ease;
    }
    @media (min-width: 769px) {
        .cont-menu{
            width: 0px;
        }    
    }
    
    .active{
        transform: translate(-1000px);
    }
    
    .cont-menu{
        list-style: none;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        gap: 7vh;
    }
    
    .cont-menu ul li{
        color: white;
        display: block;
        font-size: 25px;
        text-decoration: none;
        padding: 10px 50px;
        cursor: pointer;
    }
    
    .ul{
        display: flex;
        flex-direction: column;
        gap: 5vh;
        text-align: center;
    }
    
    .cont-menu ul li:hover{
        background-color: rgb(228,228,228);
        color: rgb(100, 97, 97);
    }
    
    .cerrar{
        position: absolute;
        top: 3vh;
        right: 6vw;
        display: none;
        transition: all .5s ease;
        animation: Anim 1s ease 0s 1 normal forwards;
    }
    
    @keyframes Anim {
      0% {
        transform: scale(0);
      }
    
      100% {
        transform: scale(1);
      }
    }
    .center{text-align:center;}
  `;

      this.appendChild(style);
      this.styles();
    }
  }
  customElements.define("header-comp", Header);
}
