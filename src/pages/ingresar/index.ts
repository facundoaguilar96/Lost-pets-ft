import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Ingresar extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  listener() {
    const form = document.querySelector(".form");

    form?.addEventListener("submit", (e: any) => {
      e.preventDefault();

      if (e.target.email.value == "") {
        window.alert("No se ha ingresado un email");
      } else {
        state.setEmail(e.target.email.value);
        state.sendEmail().then((resp) => {
          if (resp.found) {
            Router.go("/password");
          } else {
            Router.go("/misDatos");
          }
        });
      }
    });
  }

  render() {
    this.innerHTML = `
    
      <header-comp></header-comp>
      
      <div class="container">
      <h1 class="h1">INGRESAR</h1>

      <form class="form">
        <label
          ><h2 class="h2">EMAIL</h2>
          <div>
            <input
              class="input"
              type="email"
              name="email"
              placeholder="Ingrese su email.."
            /></div
        ></label>
        <button class="button">Siguiente</button>
      </form>
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
  .h1{
      margin: 0;
      font-size: 40px;
      width: 100%;
      text-align: center;
      font-weight: 700;
      font-family: 'Poppins', sans-serif;
      padding:44px 0;
  }
  .form{
      width: 100%;
      max-width: 335px;
      padding: 20px;
  }
  .container{
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      align-content: center;
  }
  .input{
      height: 50px;
      width: 100%;
      max-width: 335px;
  }
  
  .h2{
      margin: 0;
      font-size: 16px;
      font-weight: 400;
      font-family: 'Poppins', sans-serif;
      border-radius: 4px;
  }
  .button{
      font-size: 16px;
      font-weight: 700;
      font-family: 'Poppins', sans-serif;
      margin-top: 24px;
      border-radius: 4px;
      background-color: #FF9DF5;
      height: 50px;
      width: 100%;
      max-width: 335px;
  }
  
}`;
    this.appendChild(style);
    this.listener();
  }
}

customElements.define("ingresar-page", Ingresar);
