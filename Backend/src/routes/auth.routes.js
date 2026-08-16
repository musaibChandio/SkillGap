import { Router } from "express";
import { loginController, registerUserController , logoutUserController , getMeController } from "../controllers/auth.controller.js";
import authUser from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginController);
authRouter.get("/logout", logoutUserController);


authRouter.get("/get-me",authUser,getMeController)
  

export default authRouter;  
