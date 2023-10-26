import express from "express";
import cors from "cors";
import connectDb from "./config/db";
import logger from "morgan";
import {
  authRouter,
  recipesRouter,
  ingredientsRouter,
  searchRouter,
  shoppingListRouter,
  popularRecipeRouter,
  ownRecipesRouter,
  favoritesRouter,
} from "./routes";

import "colors";
import "dotenv/config";

// Tworzenie serwera
const app = express();

// Middleware ______________________________
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Włączenie obsługi Cross-Origin Requests (CORS)
app.use(cors());

// Ustawienie tras ________________________________
app.use("/api/v1", authRouter);
app.use("/api/v1", recipesRouter);
app.use("/api/v1", ownRecipesRouter);
app.use("/api/v1", ingredientsRouter);
app.use("/api/v1", searchRouter);
app.use("/api/v1", shoppingListRouter);
app.use("/api/v1", favoritesRouter);
app.use("/api/v1", popularRecipeRouter);

// Obsługa błędów ______________________________
// Obsługa błędu 404
app.use("*", (req, res, next) => {
  res.status(404).json({
    code: 404,
    message: "Not found",
  });
});

// Obsługa ogólnych błędów
app.use((error, req, res, next) => {
  if (error.status) {
    const statusCode = error.status;
    res
      .status(statusCode)
      .json({ code: res.statusCode, message: error.message });
    return;
  }
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({ code: res.statusCode, message: error.message });
});

// Połączenie z bazą danych
connectDb();

// Pobranie portu i uruchomienie serwera
const { PORT = 5000 } = process.env;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie: ${process.env.PORT}`.white.bgCyan.bold);
});
