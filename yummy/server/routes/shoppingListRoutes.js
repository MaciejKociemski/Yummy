import express from "express";
import asyncHandler from "express-async-handler";
import { authenticate } from "../middlewares";
import {
  addToShoppingList,
  deleteShopping,
  getShopping,
} from "../controllers/shoppingCtrl"; // Import modułu shoppingCtrl oddzielnie

const shoppingListRouter = express.Router();

// Dodaj produkt do listy zakupów
shoppingListRouter.patch(
  "/shopping-list/add",
  authenticate,
  asyncHandler(addToShoppingList)
);

// Usuń produkt z listy zakupów
shoppingListRouter.patch(
  "/shopping-list/remove",
  authenticate,
  asyncHandler(deleteShopping)
);

// Pobierz listę produktów
shoppingListRouter.get(
  "/shopping-list",
  authenticate,
  asyncHandler(getShopping)
);

export default shoppingListRouter;
