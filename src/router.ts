import { Router } from "@vaadin/router";

import "./pages/index/index";
import "./pages/misDatos/index";
import "./pages/ingresar/index";
import "./pages/password/index";
import "./pages/misDatos/index";
import "./pages/forgotPassword/index";
import "./pages/reportPet/index";
import "./pages/myReports/index";
import "./pages/editPet/index";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/prueba", component: "fullroom-page" },
  { path: "/ingresar", component: "ingresar-page" },
  { path: "/password", component: "password-page" },
  { path: "/misDatos", component: "misdatos-page" },
  { path: "/forgotPassword", component: "forgotpassword-page" },
  { path: "/reportPet", component: "reportpet-page" },
  { path: "/myReports", component: "myreports-page" },
  { path: "/petEdit", component: "editpet-page" },
]);
