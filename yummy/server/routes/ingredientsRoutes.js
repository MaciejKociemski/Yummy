import express from "express";
import asyncHandler from "express-async-handler";
import { authenticate } from "../middlewares";
import {
  getIngredientsList,
  searchIngredient,
} from "../controllers/ingredientCtrl"; // Import modułu ingredientCtrl oddzielnie

const ingredientsRouter = express.Router();

// Pobierz listę składników
ingredientsRouter.get(
  "/ingredients/list",
  authenticate,
  asyncHandler(getIngredientsList)
);

// Szukaj składnika
ingredientsRouter.get(
  "/ingredients",
  authenticate,
  asyncHandler(searchIngredient)
);

export default ingredientsRouter;
