import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Contraseña extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  listener() {
    const formData = document.querySelector(".formData");
    const forgotPassword = document.querySelector(".forgot-password");

    forgotPassword?.addEventListener("click", () => {
      Router.go("/forgotPassword");
    });
    formData?.addEventListener("submit", (e: any) => {
      e.preventDefault();
      state.signup(e.target.password.value).then((res) => {
        if (res) {
          Router.go("/");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          window.alert("La contraseña ingresada es incorrecta");
          state.singOff();
          Router.go("/");
        }
      });
    });
  }

  render() {
    this.innerHTML = `
    <header-comp></header-comp>
      
    <div class="container">
    <h1 class="h1">INGRESAR</h1>

    <form class="formData">
      <label
        ><h2 class="h2">CONTRASEÑA</h2>
        <div>
          <input
            class="input"
            type="password"
            name="password"
            placeholder="Ingrese su contraseña.."
          /></div
      ></label>
      <div class="a-container"><a class="forgot-password">OLVIDÉ MI CONTRASEÑA</a></div>
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
  .forgot-password{
    text-decoration-line: underline;
    color:#40AFFF;
  }
  .a-container{
    margin-top: 2vh;
  }
  .formData{
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
    this.listener();
  }
}
customElements.define("password-page", Contraseña);
