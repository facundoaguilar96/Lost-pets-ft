import "./router";
import { state } from "./state";
import { initHeader } from "./components/header";
import { initCard } from "./components/pet/index";
import { initMyPets } from "./components/myPets/index";

(function () {
  state.init();
  initHeader();
  initCard();
  initMyPets();
})();
