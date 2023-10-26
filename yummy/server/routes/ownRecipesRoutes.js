import express from "express";
import asyncHandler from "express-async-handler";
import { schemas } from "../models/recipe";
import {
  validateBody,
  authenticate,
  isValidId,
  uploadCloud,
} from "../middlewares";
import {
  addRecipe,
  removeRecipe,
  getAllOwnRecipes,
  addImage,
} from "../controllers/ownRecipeCtrl"; // Import modułu ownRecipeCtrl oddzielnie

const cloudOptions = {
  fieldname: "image",
  destFolder: "recipes",
  transformation: {
    width: 700,
    height: 700,
    crop: "fill",
    gravity: "auto",
    zoom: 0.75,
  },
};

const ownRecipesRouter = express.Router();

// Dodaj własny przepis
ownRecipesRouter.post(
  "/own-recipes",
  authenticate,
  uploadCloud(cloudOptions),
  validateBody(schemas.recipeJoiSchema),
  asyncHandler(addRecipe)
);

// Usuń własny przepis
ownRecipesRouter.delete(
  "/own-recipes/:id",
  authenticate,
  isValidId,
  asyncHandler(removeRecipe)
);

// Pobierz wszystkie przepisy utworzone przez użytkownika
ownRecipesRouter.get(
  "/own-recipes",
  authenticate,
  asyncHandler(getAllOwnRecipes)
);

export default ownRecipesRouter;
