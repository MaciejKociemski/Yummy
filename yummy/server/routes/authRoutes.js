import express from "express";
import { schemas } from "../models/user";
import { ctrlWrapper } from "../helpers";
import * as authCtrl from "../controllers/authCtrl"; // Import the authCtrl module separately

const {
  register,
  login,
  getCurrent,
  logout,
  getCurrentUser,
  updateUser,
  updateAvatar,
  subscription,
  googleAuth,
} = authCtrl;

const authRouter = express.Router();

import {
  validateBody,
  authenticate,
  passport,
  uploadCloud,
} from "../middlewares";

const cloudOptions = {
  fieldname: "avatar",
  destFolder: "avatars",
  transformation: {
    width: 100,
    height: 100,
    crop: "thumb",
    gravity: "auto",
    zoom: 0.75,
  },
};

// Route from front-end when pressing the button for Google registration
authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// When you choose your account, Google uses a callback on this route
authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  ctrlWrapper(googleAuth)
);

// Registration (signup)
authRouter.post(
  "/auth/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(register)
);

// LogIn (signin)
authRouter.post(
  "/auth/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(login)
);

// Get the current user
authRouter.get("/auth/current", authenticate, ctrlWrapper(getCurrent));

// Get info about the user
authRouter.get("/auth/user/info", authenticate, ctrlWrapper(getCurrentUser));

// Update user fields
authRouter.put(
  "/auth/user/update",
  authenticate,
  validateBody(schemas.updateUserSchema),
  ctrlWrapper(updateUser)
);

// LogOut
authRouter.post("/auth/logout", authenticate, ctrlWrapper(logout));

// Update the user's avatar
authRouter.patch(
  "/auth/user/avatar",
  authenticate,
  uploadCloud(cloudOptions),
  ctrlWrapper(updateAvatar)
);

// Subscription
authRouter.post(
  "/auth/subscription",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrlWrapper(subscription)
);

export default authRouter;
