import { Router } from "@vaadin/router";
import { state } from "../../state";

export class MisDatos extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  async pullProfile() {
    let userData = await state.getUser();
    const formData = document.querySelector(".form");
    formData.name.value = userData;
  }

  async listener() {
    const cs = state.getState();
    const form = document.querySelector(".form");
    const boton = document.querySelector(".button");

    if (cs.token) {
      this.pullProfile();
    }

    form?.addEventListener("submit", (e: any) => {
      e.preventDefault();
      boton?.setAttribute("disabled", "true");
      const cs = state.getState();
      if (cs.token) {
        if (
          e.target.password1.value == "" &&
          e.target.password2.value == "" &&
          e.target.name.value == ""
        ) {
          window.alert("Error, los campos se encuentran vacios");
        } else if (
          e.target.password1.value == "" &&
          e.target.password2.value == "" &&
          e.target.name.value !== ""
        ) {
          state
            .updateUser({
              firstName: e.target.name.value,
            })
            .then(() => {
              window.alert("Usuario modificado con exito");
              if (cs.token == "tokenDeRespaldoParaCambioDeContraseña") {
                state.singOff();
              } else {
                Router.go("/");
              }
            });
        } else {
          if (e.target.password1.value == e.target.password2.value) {
            if (e.target.name.value == "") {
              state
                .updateUser({
                  password: e.target.password1.value,
                })
                .then(() => {
                  window.alert("Usuario modificado con exito");
                  if (cs.token == "tokenDeRespaldoParaCambioDeContraseña") {
                    state.singOff();
                  } else {
                    Router.go("/");
                  }
                });
            } else {
              state
                .updateUser({
                  password: e.target.password1.value,
                  firstName: e.target.name.value,
                })
                .then(() => {
                  window.alert("Usuario modificado con exito");
                  if (cs.token == "tokenDeRespaldoParaCambioDeContraseña") {
                    state.singOff();
                  } else {
                    Router.go("/");
                  }
                });
            }
          } else {
            window.alert("Las contraseñas no coinciden");
          }
        }
      } else {
        if (cs.token == "") {
          state.setName(e.target.name.value);
          if (e.target.password1.value == e.target.password2.value) {
            state.signin(e.target.password1.value).then((res) => {
              if (res.created) {
                window.alert("Usuario creado con éxito");
                Router.go("/");
              } else {
                window.alert("Error, intentelo mas tarde");
              }
            });
          } else {
            window.alert("Las contraseñas no coinciden");
          }
        }
      }
    });
  }

  render() {
    this.innerHTML = `
    <header-comp></header-comp>
      
    <div class="container">
    <h1 class="h1">MIS DATOS</h1>
    <h1 class="h1-mod">MODIFICAR DATOS</h1>

    <form class="form">
      <label
        ><h2 class="h2">NOMBRE</h2>
        <div>
          <input
            class="input"
            type="text"
            name="name"
            placeholder="Ingrese su nombre.."
          /></div>
          <h2 class="h2">CONTRASEÑA</h2>
          <div>
          <input
            minlength="1"
            class="input"
            type="password"
            name="password1"
            placeholder="******"
          /></div>
          <h2 class="h2">REPETIR CONTRASEÑA</h2>
          <div>
          <input
          minlength="1"
            class="input"
            type="password"
            name="password2"
            placeholder="******"
          /></div>
      </label>
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
  .h1-mod{
    display:none;
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
      width: 80vw;
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
      width: 80vw;
      max-width: 335px;
  }
  
}
   `;

    this.appendChild(style);
    this.listener();
  }
}
customElements.define("misdatos-page", MisDatos);
