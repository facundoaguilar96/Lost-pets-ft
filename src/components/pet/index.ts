import { state } from "../../state";
const imgClose = require("url:../../pages/img/icono_cerrar.png");
export function initCard() {
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
      let pet = cs.pet.find((e) => {
        return e.id == id;
      });

      this.innerHTML = `
      <div class="card">
      <div class="description-container">
          <a class="description-close"><img class="close header__img" src=${imgClose} /></a>
          <p class="p-description">${pet.name}</p>
      </div>
        <div class="img-container">
          <img src=${pet.pictureURL} style="width: 100%;"> 
        </div>
        <div class="info-container">
          
          <div>
            <h2 class="">Nombre: ${pet.name}</h2>
            
            <h2 class="information report-pet">mostrar informacion</h2>
            <p class="info-description"></p>
          </div>
          <div class="report-container">
            <h2 class="title report-pet">Reportar información</h2>
          </div>  
        </div>

        <div class="form-container">
        
        <a class="cerra"><img class="close header__img" src=${imgClose} /></a>
        

        <form class="formData">
        <div class="form-h2"></div>
        
        
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
      
  }
  .form__input-container{
    display:flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding:0 10%;
   
    
  }
  .information{
    color:white;
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
    background-color: #99E175;
    width: 80%;
    height: 80%;
    border:solid 2px black;
  }
  .form-h1{
    text-align:center;
  }
  .button{
    width:100%;
    Height:50px;
    margin-top:5vh;
    border:solid 2px black;
    background-color:#58DB16;
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
    background-color:#58DB16;
    color: black;
    text-align: end;
    font-size: 15px;
    border: solid 2px black;
  }
  .info-container{display: flex;
    justify-content: space-between;
    gap:15px;
    align-items: flex-end;}
  .card{
    display:flex;
    background-color: #43A810;
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
    text-align: center;
    display:none;
    flex-direction: column;
    position:fixed;
    top: 0; 

    background-color: #99E175;
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
      await this.getPets();
      this.render();
    }
    perritos = new Array();
    async getPets() {
      let cs = state.getState();

      if (cs.userPosition) {
        return await state.getPetsarround().then((data) => {
          let pets = state.getState().pet;
          for (const i of pets) {
            this.perritos.push(i);
          }
        });
      }
    }
    listeners() {
      let cs = state.getState();
      this.querySelector(".list").addEventListener("report", (e) => {
        let id = e.detail.petId;
        let pet = cs.pet.find((e) => {
          return e.id == id;
        });

        const formContainer = document.querySelector(".form-container");
        const cerrar = document.querySelector(".cerra");
        const form = document.querySelector(".formData");
        const reportH2 = document.querySelector(".form-h2");

        reportH2.innerHTML = `<h2>Reportar información de ${pet.name}</h2>`;
        cerrar?.addEventListener("click", () => {
          e.preventDefault();
          formContainer.style.display = "none";
        });

        form?.addEventListener("submit", (e) => {
          e.preventDefault();
          let name = form.name.value;
          let phone = form["phone-number"].value;
          let info = form.info.value;
          let petUserId = pet.UserId;
          if (name.length > 0 && phone.length > 8 && info.length > 0) {
            state.reportPet({ name, phone, info, petUserId });
            window.alert("Mascota reportada correctamente, gracias!");
            formContainer.style.display = "none";
          } else {
            window.alert("Faltan completar datos");
          }
        });

        formContainer.style.display = "flex";
      });

      this.querySelector(".list").addEventListener("info", (e) => {
        const cs = state.getState();
        let id = e.detail.petId;
        let pet = cs.pet.find((e) => {
          return e.id == id;
        });

        const description = document.querySelector(".description-container");
        const cerrar = document.querySelector(".description-close");
        let p = document.querySelector(".p-description");
        p.innerHTML = `<h2>${pet.description}</h2>`;

        description.style.display = "flex";

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
        .map((id) => `<lost-pet-card pet-id=${id}></lost-pet-card>`)
        .join("")}</div>
    `;
      this.listeners();
    }
  }

  customElements.define("lost-pet-card", Card);
  customElements.define("lost-pet-list", List);
}
