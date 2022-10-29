// const API_BASE_URL = "http://localhost:3000";
const API_BASE_URL = "https://lost-pets-fa.herokuapp.com";
import { Router } from "@vaadin/router";

const state = {
  data: {
    remder: "",
    name: "",
    email: "",
    token: "",
    recover: "",
    userPosition: "",
    pet: [],
    myPets: [],
    petEditId: "",
  },
  listeners: [],
  init() {
    // localStorage.removeItem("saved-state");
    let localData = localStorage.getItem("saved-state");
    if (localData !== null) {
      this.setState(JSON.parse(localData));
    } else {
      this.setState({
        remder: "",
        name: "",
        email: "",
        token: "",
        recover: "",
        userPosition: "",
        pet: [],
        myPets: [],
        petEditId: "",
      });
    }
  },
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("saved-state", JSON.stringify(newState));
  },
  subscribe(callback) {
    this.listeners.push(callback);
  },
  async getToken() {
    const cs = this.getState();
    const token = await fetch(API_BASE_URL + "/signup", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: cs.email,
        password: cs.password,
      }),
    });
    const data = await token.json();
    return data;
  },
  setEmail(email: string) {
    const cs = this.getState();
    cs.email = email;
    this.setState(cs);
  },
  setName(name: string) {
    const cs = this.getState();
    cs.name = name;
    this.setState(cs);
  },
  async sendEmail() {
    const cs = this.getState();
    const sendeEmail = await fetch(API_BASE_URL + "/auth", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: cs.email,
      }),
    });
    const data = await sendeEmail.json();
    return data;
  },
  getUserPosition() {
    const cs = state.getState();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(todook);
    } else {
      window.alert("tu navegador no soporta la localizacion");
    }

    function todook(geolocationPosition) {
      let coords = {
        lat: geolocationPosition.coords.latitude,
        lng: geolocationPosition.coords.longitude,
      };
      cs.userPosition = coords;
      state.setState(cs);
    }
  },
  async getUser() {
    const cs = this.getState();
    const petData = await fetch(API_BASE_URL + "/user/me", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: cs.email,
      }),
    });
    const data = await petData.json();
    if (data.error) {
      return { error: true };
    } else {
      state.setName(data.userFinded.firstName);
      return data.userFinded.firstName;
    }
  },
  async getPetsarround() {
    const cs = state.getState();
    let position = cs.userPosition;
    const sendPosition = await fetch(API_BASE_URL + "/arroundPet", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        lat: position.lat,
        lng: position.lng,
      }),
    });
    const data = await sendPosition.json();
    cs.pet = data;
    state.setState(cs);
    return data;
  },
  async getMyPets() {
    const cs = state.getState();
    const pets = await fetch(API_BASE_URL + "/user/pets", {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: "bearer " + cs.token,
      },
    });
    const data = await pets.json();
    cs.myPets = data;
    state.setState(cs);
    return data;
  },
  async recover(email: string) {
    const cs = state.getState();
    const sendeEmail = await fetch(API_BASE_URL + "/user/recover", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await sendeEmail.json();
    cs.recover = data.code;
    this.setState(cs);
    return data;
  },
  setTokenRecover() {
    const cs = this.getState();
    cs.token = process.env.P_RECOVER;
    this.setState(cs);
  },
  async signup(password: string) {
    const cs = this.getState();
    const sendData = await fetch(API_BASE_URL + "/signup", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: cs.email,
        password,
      }),
    });
    const data = await sendData.json();
    if (data.error) {
      window.alert("La contraseña ingresa es incorrecta");
      return false;
    } else {
      cs.token = data;
      this.setState(cs);
      return true;
    }
  },
  singOff() {
    localStorage.removeItem("saved-state");
    this.setState({
      name: "",
      email: "",
      token: "",
    });
    Router.go("/");
  },
  async signin(password: string) {
    const cs = this.getState();
    const sendeEmail = await fetch(API_BASE_URL + "/signin", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: cs.email,
        firstName: cs.name,
        password,
      }),
    });
    const data = await sendeEmail.json();
    if (data.error) {
      return { error: true };
    } else {
      return data;
    }
  },
  async updateUser(body: { password?: string; firstName?: string }) {
    const cs = this.getState();
    const update = await fetch(API_BASE_URL + "/user", {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: cs.email,
        ...body,
      }),
    });
    const data = await update.json();
    if (data.error) {
      return { error: true };
    } else {
      return data;
    }
  },
  async newPet(petData) {
    const cs = this.getState();

    const update = await fetch(API_BASE_URL + "/pet", {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: "bearer " + cs.token,
      },
      body: JSON.stringify({
        name: petData.name,
        lat: petData.lngLat.lat,
        lng: petData.lngLat.lng,
        imgData: petData.imgData,
        description: petData.description,
      }),
    });
    const data = await update.json();
    if (data.error) {
      return { error: true };
    } else {
      return data;
    }
  },
  async updatePet(petData) {
    const cs = this.getState();
    const update = await fetch(API_BASE_URL + "/pet", {
      method: "put",
      headers: {
        "content-type": "application/json",
        authorization: "bearer " + cs.token,
      },
      body: JSON.stringify({
        name: petData.name,
        lat: petData.lngLat.lat,
        lng: petData.lngLat.lng,
        imgData: petData.imgData,
        description: petData.description,
        id: cs.petEditId,
      }),
    });
    const data = await update.json();
    if (data.error) {
      return { error: true };
    } else {
      return data;
    }
  },
  async getPetData(id) {
    const petData = await fetch(API_BASE_URL + "/pet/" + id, {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await petData.json();
    if (data.error) {
      return { error: true };
    } else {
      return data;
    }
  },
  async deletePet(id) {
    const report = await fetch(API_BASE_URL + "/user/pets", {
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const data = await report.json();
    if (data.deleted) {
      return window.alert("Publicación elminada con exito!");
    } else {
      return window.alert("Error, intentelo mas tarde");
    }
  },
  async reportPet(petData) {
    const report = await fetch(API_BASE_URL + "/pet/report", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: petData.name,
        phone: petData.phone,
        info: petData.info,
        userId: petData.petUserId,
      }),
    });
    const data = await report.json();
    if (data.error) {
      return { error: true };
    } else {
      return data;
    }
  },
};

export { state };
