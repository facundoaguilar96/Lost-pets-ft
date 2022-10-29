import { state } from "../../state";
import { Router } from "@vaadin/router";
const imgClose = require("url:../../pages/img/icono_cerrar.png");
export function initMyPets() {
  class Card extends HTMLElement {
    constructor() {
      super();
      this.petId = this.getAttribute("pet-id");
    }
    connectedCallback() {
      this.render();
    }
    listeners() {
      this.querySelector(".title")?.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("report", {
            detail: {
              petId: this.petId,
            },
            bubbles: true,
          })
        );
      });

      this.querySelector(".information")?.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("info", {
            detail: {
              petId: this.petId,
            },
            bubbles: true,
          })
        );
      });
    }

    render() {
      let cs = state.getState();
      let id = this.petId;
      let pet = cs.myPets.find((e) => {
        return e.id == id;
      });

      this.innerHTML = `
      <div class="card">
      <div class="description-container">
          <a class="description-close"><img class="close header__img" src=${imgClose} /></a>
          <h2 class="delete-h2"></h2>
          <button class="delete-button">Eliminar</button>
          <button class="cancelar">Cancelar</button>
      </div>
        <div class="img-container">
          <img src=${pet.pictureURL} style="width: 100%;"> 
        </div>
        <div class="info-container">
          
          <div>
            <h2 class="">Nombre: ${pet.name}</h2>
            
            <h2 class="information report-pet">Eliminar publicación</h2>
            <p class="info-description"></p>
          </div>
          <div class="report-container">
            <h2 class="title report-pet">Modificar</h2>
          </div>  
        </div>

        <div class="form-container">
        
        <a class="cerra"><img class="close header__img" src=${imgClose} /></a>
        

        <form class="formData">
        <h1 class="form-h1">Reportar información de ${pet.name}</h1>
        
        <div class="form__input-container">
        <label
        ><h2 class="h2">TU NOMBRE</h2>
        <div>
          <input
            class="input"
            maxlength="50"
            type="text"
            name="name"
            placeholder="Ingrese su nombre.."
          /></div
      ></label>
      <label
        ><h2 class="h2">TU TELEFONO</h2>
        <div>
          <input
            class="input"
            maxlength="10"
            type="number"
            name="phone-number"
            placeholder="Ingrese su numero de celular.."
          /></div
      ></label>
      <label
        ><h2 class="h2">DONDE LO VISTE?</h2>
        <div>
        <textarea 
        class="input input-info"
        maxlength="300"
        type="text"
        name="info"
        placeholder="Información.."
        ></textarea>
          </div
      ></label>
      <button class="button">Enviar</button>
      </div>
    </form>
    <button class="cerrar">cerrar formulario</button>
    </div>
        
       
      </div>
    `;
      const style = document.createElement("style");
      style.innerHTML = `
    *{
      box-sizing: border-box;
  }
  body{
      margin: 0;
     background-color: #99E175;
      text-aling:center;
  }
  
  .form__input-container{
    display:flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding:0 10%;
   
    
  }
  .p-description{
    text-align: center;
  }
  .description-container{
    word-wrap: break-word;
    display:none;
    flex-direction: column;
    position:fixed;
    top: 50%; 
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;

    background-color: #43A810;
    gap: 10px;
    border: solid 2px black;
    padding: 20px 20px;
  }
  .form-h1{
    text-align:center;
  }
  .button{
    width:100%;
    Height:50px;
    margin-top:5vh;
  }
  .input{
    width:100%;
    Height:50px;
  }
  .input-info{
    Height:150px;
  }
  .close{
    float:right ;
  }
  .img-container{
    width:100%;
  }
  .report-container{
    width:100%;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: end;
  }
  .report-pet{
    padding: 5px;
    background-color:white;
    color: black;
    text-align: end;
    font-size: 15px;
    border: solid 2px black;
    border-radius:20px;
    text-align: center;
  }
  .report-pet:hover{
    background-color:white;
    cursor:pointer;
  }
  .info-container{display: flex;
    justify-content: space-between;
    gap:15px;
    align-items: flex-end;}
  .card{
    display:flex;
    background-color:#58DB16;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap:10px;
    border:solid 2px black;
    margin-top: 20px;
    padding: 20px 20px;
  }

  .formData{
    
    display:flex;
    flex-direction: column;
    width:100%;
    align-items: center;
  }
  .form-container{
    display:none;
    flex-direction: column;
    position:fixed;
    top: 0; 

    background-color: red;
    width:100vw;
    height:100vh;
  }
    `;
      this.appendChild(style);
      this.listeners();
    }
  }

  class List extends HTMLElement {
    async connectedCallback() {
      await this.getMyPets();
      this.render();
    }
    perritos = new Array();
    async getMyPets() {
      return await state.getMyPets().then((data) => {
        let pets = state.getState().myPets;
        for (const i of pets) {
          this.perritos.push(i);
        }
      });
    }
    listeners() {
      this.querySelector(".list").addEventListener("report", (e) => {
        const cs = state.getState();
        let id = e.detail.petId;

        let pet = cs.myPets.find((e) => {
          return e.id == id;
        });

        cs.petEditId = pet.id;
        cs.remder = Math.random();
        state.setState(cs);
        Router.go("/petEdit");
      });

      this.querySelector(".list").addEventListener("info", (e) => {
        const cs = state.getState();
        let id = e.detail.petId;

        let pet = cs.myPets.find((e) => {
          return e.id == id;
        });

        const description = document.querySelector(".description-container");
        const cerrar = document.querySelector(".description-close");
        const eliminar = document.querySelector(".delete-button");
        const cancelar = document.querySelector(".cancelar");
        const deleteH2 = document.querySelector(".delete-h2");

        deleteH2.innerHTML = `Seguro que quiere eliminar la publicacion de: ${pet.name}?`;
        description.style.display = "flex";

        eliminar?.addEventListener("click", () => {
          window.alert("Publicación elminida con exito");
          state.deletePet(e.detail.petId);
          location.reload();
        });
        cancelar?.addEventListener("click", () => {
          description.style.display = "none";
        });
        cerrar?.addEventListener("click", () => {
          description.style.display = "none";
        });
      });
    }
    render() {
      var ids = new Array();
      for (const i of this.perritos) {
        ids.push(i.id);
      }

      this.innerHTML = `
      <div class="list"> ${ids
        .map((id) => `<my-lost-pet-card pet-id=${id}></my-lost-pet-card>`)
        .join("")}</div>
    `;
      this.listeners();
    }
  }

  customElements.define("my-lost-pet-card", Card);
  customElements.define("my-lost-pet", List);
}
