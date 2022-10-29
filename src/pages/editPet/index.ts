import { Router } from "@vaadin/router";
import { state } from "../../state";
const { Dropzone } = require("dropzone");
import mapboxgl from "mapbox-gl";
import MapboxClient from "mapbox";

export class EditPet extends HTMLElement {
  connectedCallback() {
    this.render();

    const MAPBOX_TOKEN =
      "pk.eyJ1IjoiZmFjdW5kb2FndWlsYXI5NiIsImEiOiJjbDRhcnlmMnAwZzEwM2VxcGhreGdyYnFuIn0.bw22I9uA_jhCurtQm3ri1g";
    const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

    function initMap() {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      return new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
      });
    }

    let imgData;
    let lngLat;
    const myDropzone = new Dropzone(".profile-picture-container", {
      url: "/falsa",
      autoProcessQueue: false,
      uploadMultiple: false,
      maxFiles: 1,
      addRemoveLinks: true,
      parallelUploads: false,
    });

    myDropzone.on("thumbnail", function (file) {
      imgData = file.dataURL;
    });

    async function pullProfile() {
      const cs = state.getState();
      let data = await state.getPetData(cs.petEditId);
      const formPet = document.querySelector(".formPet");

      if (data as any) {
        formPet.name.value = data.name;
        formPet.description.value = data.description;
        let mockFile = { name: "Filename", size: 12345 };
        let callback = null;
        let resizeThumbnail = true;
        console.log(data.pictureURL);
        myDropzone.displayExistingFile(
          mockFile,
          `${data.pictureURL}`,
          callback,
          resizeThumbnail
        );
      }
    }

    (function () {
      pullProfile();
      console.log("goaskdoasm");
      window.map = initMap();
      const formPet = document.querySelector(".formPet");
      const q = document.querySelector(".q") as any;
      formPet?.addEventListener("submit", (e: any) => {
        e.preventDefault();
        const name = e.target.name.value;
        const description = e.target.description.value;
        initSearchForm(function (results) {
          const firstResult = results[0];
          const marker = new mapboxgl.Marker()
            .setLngLat(firstResult.geometry.coordinates)
            .addTo(map);
          const [lng, lat] = firstResult.geometry.coordinates;
          lngLat = { lat, lng };
          map.setCenter(firstResult.geometry.coordinates);
          map.setZoom(14);

          if (
            name.length > 0 &&
            imgData !== undefined &&
            description.length > 0
          ) {
            state
              .updatePet({ imgData, name, lngLat, description })
              .then((e) => {
                if (e.error) {
                  window.alert("Erorr");
                } else {
                  window.alert("Mascota modificada con exito!");
                  Router.go("/");
                }
              });
          }
        }, q.value);
      });
    })();

    async function initSearchForm(callback, value?) {
      mapboxClient.geocodeForward(
        value,
        {
          autocomplete: true,
          language: "es",
          country: "ar",
        },
        function (err, data, res) {
          if (!err) callback(data.features);
        }
      );
    }
  }

  render() {
    this.innerHTML = `
    <header-comp></header-comp>
    <div class="container">
      <h1 class="h1">REPORTAR MASCOTAS PERDIDAS</h1>
        <form class="formPet">
        <label class="label"
          ><h2 class="h2">nombre</h2>
          <input type="text" class="input" name="name" maxlength="20"
        /></label>

        <div class="profile-picture-container">
        <h3 class="h3">Arrastre y suelte aqui su imagen</h3>
       </div>

        <div>
        <h2 class="h2">
            Buscá un punto de referencia para reportar a tu mascota. Puede ser
            una dirección, un barrio o una ciudad.
          </h2>
          <div id="map" style="width: 100%; height: 300px"></div>
          <input class="q input" name="search" type="search" />
          
        </div>

        <label class="label"
          ><h2 class="h2">Descripcion de la mascota</h2>
          <textarea class="description" name="description"  maxlength="240"></textarea>
          </label>

        

        <button class="button">enviar</button>
      </form>
      <img class="profile-picture" width="5000px" />
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
  .h2{
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
    border-radius: 4px;
    margin-bottom: 3vh;
}
  .formPet{
      width: 100%;
      max-width: 335px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      align-content: center;
      gap:5vh;
  }
  .label{
    width: 100%;
    
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
  
  .description{
      height: 20vh;
      width: 100%;
      max-width: 335px;
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
  .profile-picture-container{
      width: 100%;
      min-height: 20vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: gray;
      border: solid 2px black;
      border-radius: 3px;
      margin-top: 2vh;
  }
  .profile-picture{
      width: 100%;
  }
  .h3{
      margin: 0;
  }
  
   `;

    this.appendChild(style);
  }
}
customElements.define("editpet-page", EditPet);
