import userRoute from "./src/routes/user.js";
import busRoute from "./src/routes/bus.js";
const routesInit = (app) => {
  app.use("/api/v2", userRoute);
  app.use("/api/v2", busRoute);
};

export default routesInit;
