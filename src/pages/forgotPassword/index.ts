import { Router } from "@vaadin/router";
import { state } from "../../state";

export class ContraseñaOlvidada extends HTMLElement {
  connectedCallback() {
    this.render();

    const form = document.querySelector(".form");
    const form2 = document.querySelector(".form2");
    const h1Form = document.querySelector(".h1-form1");

    form?.addEventListener("submit", (e: any) => {
      e.preventDefault();
      form.setAttribute("style", "display:none");
      h1Form?.setAttribute("style", "display:none");
      form2?.classList.replace("displaynone", "displayOn");
      state.recover(e.target.email.value).then((res) => {});
    });
    form2?.addEventListener("submit", (event: any) => {
      event.preventDefault();

      if (state.getState().recover == event.target.code.value) {
        state.setTokenRecover();
        Router.go("/misDatos");
      } else {
        window.alert("El codigo es incorrecto");
        Router.go("/");
      }
    });
  }

  render() {
    this.innerHTML = `
    <header-comp></header-comp>
      
    <div class="container">
    <h1 class="h1-form1">INGRESAR SU EMAIL</h1>

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
      <button class="button">Enviar</button>
    </form>
    <form class="form2 displaynone">
    <h1 class="h1-form2">INGRESE CODIGO DE RECUPERACION</h1>
      <label
        >
        <div>
          <input
            class="input"
            type="text"
            name="code"
            placeholder="Ingrese codigo.."
          /></div
      ></label>
      <button class="button">Verificar</button>
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
  .form2{
    
  }
  .displaynone{display:none;}
  .displayOn{
    display: flex;
      flex-direction: column;
      align-items: center;
      align-content: center;
  }
  .h1-form1{
      margin: 0;
      font-size: 40px;
      width: 100%;
      text-align: center;
      font-weight: 700;
      font-family: 'Poppins', sans-serif;
      padding:44px 0;
  }
  .h1-form2{
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
  .form2{
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
  
}
   `;

    this.appendChild(style);
  }
}
customElements.define("forgotpassword-page", ContraseñaOlvidada);
