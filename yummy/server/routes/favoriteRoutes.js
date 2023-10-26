import express from "express";
import asyncHandler from "express-async-handler";
import { authenticate } from "../middlewares";
import favoritesCtrl from "../controllers/favoritesCtrl"; // Import the favoritesCtrl module separately

const { addFavorites, getFavorites, deleteFavorites } = favoritesCtrl;

const favoritesRouter = express.Router();

// Add to favorite
favoritesRouter.post("/favorites", authenticate, asyncHandler(addFavorites));

// Get favorites
favoritesRouter.get("/favorites", authenticate, asyncHandler(getFavorites));

// Remove from favorites
favoritesRouter.delete(
  "/favorites/:id",
  authenticate,
  asyncHandler(deleteFavorites)
);

export default favoritesRouter;
