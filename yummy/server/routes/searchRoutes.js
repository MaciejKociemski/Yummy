import express from "express";
import asyncHandler from "express-async-handler";
import { authenticate } from "../middlewares";
import { findByTitle, findByIngredient } from "../controllers/searchCtrl"; // Import modułu searchCtrl oddzielnie

const searchRouter = express.Router();

// Szukaj po tytule
searchRouter.get("/search/by-title", authenticate, asyncHandler(findByTitle));

// Szukaj po składnikach
searchRouter.get(
  "/search/by-ingredient",
  authenticate,
  asyncHandler(findByIngredient)
);

export default searchRouter;
