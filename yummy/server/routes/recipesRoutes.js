import express from "express";
import asyncHandler from "express-async-handler";
import { authenticate, isValidId } from "../middlewares";
import {
  getCattegory,
  getForMain,
  getForCategory,
  getOne,
} from "../controllers/recipeCtrl"; // Import modułu recipeCtrl oddzielnie

const recipesRouter = express.Router();

// Pobierz listę kategorii
recipesRouter.get(
  "/recipes/category-list",
  authenticate,
  asyncHandler(getCattegory)
);

// Pobierz przepisy na stronę główną według kategorii
recipesRouter.get("/recipes/main-page", authenticate, asyncHandler(getForMain));

// Pobierz 8 przepisów według kategorii
recipesRouter.get(
  "/recipes/category/:category",
  authenticate,
  asyncHandler(getForCategory)
);

// Pobierz przepis po ID
recipesRouter.get(
  "/recipes/:id",
  authenticate,
  isValidId,
  asyncHandler(getOne)
);

export default recipesRouter;
