import express from "express";
import asyncHandler from "express-async-handler";
import { authenticate } from "../middlewares";
import { getPopular } from "../controllers/popularCtrl"; // Import modułu popularCtrl oddzielnie

const popularRecipeRouter = express.Router();

// Pobierz popularne przepisy
popularRecipeRouter.get(
  "/popular-recipes",
  authenticate,
  asyncHandler(getPopular)
);

export default popularRecipeRouter;
